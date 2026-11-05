"""Fetch citation metrics from a public Google Scholar profile and save them
to assets/scholar.json for the website to read.

Google Scholar has no official API and sometimes blocks automated requests.
If the page can't be read, this script leaves the existing JSON untouched,
so the site keeps showing the last good numbers.

Run locally:  python scripts/update_scholar.py
"""
import datetime as dt
import json
import os
import re
import sys
import time

import requests
from bs4 import BeautifulSoup

SCHOLAR_ID = os.environ.get("SCHOLAR_ID", "TtP6d3QAAAAJ")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "scholar.json")
URL = "https://scholar.google.com/citations"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    "Accept-Language": "en-AU,en;q=0.9",
}


def norm(title: str) -> str:
    """Lower-case and strip punctuation so titles can be matched."""
    return re.sub(r"[^a-z0-9]+", " ", title.lower()).strip()


def to_int(text: str):
    text = (text or "").strip().replace(",", "")
    return int(text) if text.isdigit() else None


def parse(html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    table = soup.find("table", id="gsc_rsb_st")
    if table is None:
        raise ValueError("Metrics table not found (Google may have shown a CAPTCHA or consent page).")

    metrics = {}
    for row in table.find_all("tr"):
        label = row.find("td", class_="gsc_rsb_sc1")
        vals = row.find_all("td", class_="gsc_rsb_std")
        if not label or len(vals) < 2:
            continue
        key = label.get_text(strip=True).lower()
        metrics[key] = (to_int(vals[0].get_text()), to_int(vals[1].get_text()))

    since = None
    for th in table.find_all("th"):
        m = re.search(r"(\d{4})", th.get_text())
        if m:
            since = int(m.group(1))
            break

    papers = {}
    for tr in soup.find_all("tr", class_="gsc_a_tr"):
        a = tr.find("a", class_="gsc_a_at")
        c = tr.find("a", class_="gsc_a_ac")
        if a:
            papers[norm(a.get_text())] = to_int(c.get_text()) if c else 0

    def get(name):
        return metrics.get(name, (None, None))

    data = {
        "citations": get("citations")[0],
        "hindex": get("h-index")[0],
        "i10index": get("i10-index")[0],
        "citations_recent": get("citations")[1],
        "hindex_recent": get("h-index")[1],
        "recent_since": since,
        "papers": papers,
    }
    if not data["citations"] or data["hindex"] is None:
        raise ValueError("Could not read citations or h-index from the page.")
    return data


def fetch() -> str:
    params = {"user": SCHOLAR_ID, "hl": "en", "cstart": 0, "pagesize": 100}
    last = None
    for attempt in range(3):
        try:
            r = requests.get(URL, params=params, headers=HEADERS, timeout=30)
            if r.status_code == 200:
                return r.text
            last = f"HTTP {r.status_code}"
        except requests.RequestException as e:
            last = str(e)
        time.sleep(10 * (attempt + 1))
    raise RuntimeError(f"Could not fetch the Scholar profile: {last}")


def main() -> int:
    try:
        data = parse(fetch())
    except Exception as e:  # keep the previous file
        print(f"::warning::Scholar update skipped: {e}")
        return 0

    data["updated"] = dt.date.today().isoformat()
    data["source"] = f"{URL}?user={SCHOLAR_ID}"

    old = {}
    if os.path.exists(OUT):
        with open(OUT, encoding="utf-8") as f:
            old = json.load(f)
    same = {k: v for k, v in old.items() if k != "updated"} == {k: v for k, v in data.items() if k != "updated"}
    if same:
        print("No change in Scholar metrics.")
        return 0

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"Updated: {data['citations']} citations, h-index {data['hindex']}, i10-index {data['i10index']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
