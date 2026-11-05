/* Shared behaviour for every page. Content comes from data.js. */
function boot(SCH) {
  const S = window.SITE;
  applyScholar(S, SCH);
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const TYPES = { journal: "Journal article", conference: "Conference paper", chapter: "Book chapter", other: "Other" };
  const fullName = (S.title ? S.title + " " : "") + S.name;
  const page = document.body.dataset.page;
  const set = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

  /* ---------- Header with Research drop-down ---------- */
  const initials = S.name.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const researchMenu = [
    ["research.html#research-overview", "Overview", "Focus, figures and areas"],
    ...S.research.areas.map(a => [`research.html#${a.id}`, a.title, a.status]),
    null,
    ["publications.html", "All publications", "Search, filter and cite"]
  ];
  const inResearch = page === "research" || page === "publications";
  const navLink = (h, l, k) => `<a href="${h}"${k === page ? ' aria-current="page"' : ""}>${l}</a>`;
  const header = document.createElement("header");
  header.className = "top";
  header.innerHTML = `<div class="wrap">
    <a class="brand" href="index.html"><span class="mark" aria-hidden="true">${esc(initials)}</span>${esc(fullName)}</a>
    <nav class="links" id="nav" aria-label="Main">
      ${navLink("index.html", "Home", "home")}
      ${navLink("bio.html", "Bio", "bio")}
      <div class="dd${inResearch ? " current" : ""}" id="dd">
        <button type="button" aria-expanded="false" aria-controls="ddMenu">Research <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg></button>
        <ul class="dd-menu" id="ddMenu">${researchMenu.map(m => m ? `<li><a href="${m[0]}">${esc(m[1])}<small>${esc(m[2])}</small></a></li>` : '<li class="sep" role="separator"></li>').join("")}</ul>
      </div>
      ${navLink("teaching.html", "Teaching", "teaching")}
    </nav>
    <button class="icon-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div>`;
  document.body.prepend(header);
  const dd = $("#dd"), ddBtn = dd.querySelector("button");
  ddBtn.addEventListener("click", () => { const o = dd.classList.toggle("open"); ddBtn.setAttribute("aria-expanded", o); });
  document.addEventListener("click", e => { if (!dd.contains(e.target)) { dd.classList.remove("open"); ddBtn.setAttribute("aria-expanded", "false"); } });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { dd.classList.remove("open"); ddBtn.setAttribute("aria-expanded", "false"); } });
  dd.querySelectorAll(".dd-menu a").forEach(a => a.addEventListener("click", () => { dd.classList.remove("open"); $("#nav").classList.remove("open"); }));
  $("#menuBtn").addEventListener("click", e => {
    const open = $("#nav").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });

  /* ---------- Shared bits ---------- */
  const contactLinks = () => [
    S.email ? `<li><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></li>` : "",
    ...S.profiles.map(p => `<li><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.label)}</a></li>`),
    S.cvPdf ? `<li><a href="${esc(S.cvPdf)}" download>CV (PDF)</a></li>` : ""
  ].join("");
  const row = x => `<li><span class="when">${esc(x.when || "")}</span><span><strong>${esc(x.what)}</strong>${x.where ? `<span class="where">, ${esc(x.where)}</span>` : ""}${x.detail ? `<span class="detail">${esc(x.detail)}</span>` : ""}</span></li>`;
  const list = arr => arr.map(row).join("");
  const paras = arr => arr.map(p => `<p>${esc(p)}</p>`).join("");

  /* ---------- Footer ---------- */
  const footer = document.createElement("footer");
  footer.innerHTML = `<div class="wrap">
    <div class="foot">
      <h3>Contact</h3>
      <div><p>${esc(S.contactNote)}</p><ul class="text-links">${contactLinks()}</ul>
      <div class="copy">© ${new Date().getFullYear()} ${esc(fullName)} · ${esc(S.location)}</div></div>
    </div>
  </div>`;
  document.body.append(footer);
  const toastEl = document.createElement("div");
  toastEl.className = "toast"; toastEl.setAttribute("role", "status"); toastEl.setAttribute("aria-live", "polite");
  document.body.append(toastEl);
  function toast(m) { toastEl.textContent = m; toastEl.classList.add("show"); clearTimeout(toastEl._h); toastEl._h = setTimeout(() => toastEl.classList.remove("show"), 1800); }
  async function copy(text, ok) { try { await navigator.clipboard.writeText(text); toast(ok); } catch { toast("Couldn't copy. Select the text and copy it manually."); } }

  /* ---------- Publications ---------- */
  const pubs = S.publications.map((p, i) => ({ ...p, i, tags: p.tags || [], first: S.authorMatch.some(n => p.authors.startsWith(n)) }));
  const firstCount = pubs.filter(p => p.first).length;
  function highlightMe(a) { let o = esc(a); S.authorMatch.forEach(n => { o = o.split(esc(n)).join(`<span class="me">${esc(n)}</span>`); }); return o; }
  function bibtex(p) {
    const key = (p.authors.split(",")[0].trim().split(/\s+/).pop() + p.year + (p.title.split(/\W+/)[0] || "x")).toLowerCase();
    const kind = { journal: "article", conference: "inproceedings", chapter: "incollection" }[p.type] || "misc";
    const field = p.type === "journal" ? "journal" : "booktitle";
    return `@${kind}{${key},\n  title = {${p.title}},\n  author = {${p.authors.split(/,\s*/).join(" and ")}},\n  ${field} = {${p.venue}},\n  year = {${p.year}}${p.doi ? `,\n  doi = {${p.doi}}` : ""}\n}`;
  }
  function pubItem(p, opts = {}) {
    const doi = p.doi ? `https://doi.org/${encodeURI(p.doi)}` : "";
    const kind = [esc(TYPES[p.type] || "Other"), opts.showYear ? p.year : "", p.first ? '<span class="hl">First author</span>' : "", p.cites ? `${esc(p.cites)} citations` : ""].filter(Boolean).join(" · ");
    return `<article class="pub">
      <div class="pub-kind">${kind}</div>
      <div class="pub-title">${esc(p.title)}</div>
      <div class="pub-meta">${highlightMe(p.authors)}</div>
      <div class="pub-meta"><em>${esc(p.venue)}</em></div>
      <div class="pub-actions">
        ${doi ? `<a href="${doi}" target="_blank" rel="noopener">DOI</a>` : `<a href="https://scholar.google.com/scholar?q=${encodeURIComponent('"' + p.title + '"')}" target="_blank" rel="noopener">Find on Google Scholar</a>`}
        <button data-bib="${p.i}">Cite</button>
      </div>
      <div class="drawer" id="bib-${p.i}"><pre>${esc(bibtex(p))}</pre><div class="pub-actions" style="margin:0"><button data-copybib="${p.i}">Copy BibTeX</button></div></div>
    </article>`;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-bib]"); if (b) { document.getElementById("bib-" + b.dataset.bib)?.classList.toggle("open"); return; }
    const c = e.target.closest("[data-copybib]"); if (c) copy(bibtex(pubs[+c.dataset.copybib]), "BibTeX copied");
  });
  const photo = () => S.photo ? `<img class="photo" src="${esc(S.photo)}" alt="Portrait of ${esc(fullName)}">` : "";
  const figures = arr => arr.map(s => `<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span>${s.note ? `<small>${esc(s.note)}</small>` : ""}</li>`).join("");

  /* ---------- HOME ---------- */
  if (page === "home") {
    set("#photo", photo());
    set("#kicker", "Lecturer in Computer Science · " + esc(S.location));
    set("#name", esc(fullName));
    set("#summary", esc(S.summary));
    set("#heroBtns", `<a class="btn" href="research.html">Explore my research</a>`);
    set("#heroLinks", `<li><a href="bio.html">Bio</a></li>${contactLinks()}`);
    set("#facts", (S.heroFacts || []).map(f => `<div><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join(""));
    set("#intro", `<p>${esc(S.intro)}</p><a class="more" href="bio.html">Read my bio</a>`);
    set("#researchBrief", `<p>${esc(S.home.research)}</p><a class="more" href="research.html">Research</a>`);
    set("#teachingBrief", `<p>${esc(S.home.teaching)}</p><a class="more" href="teaching.html">Teaching</a>`);
    set("#engagementBrief", `<p>${esc(S.home.engagement)}</p><ul class="cv-list">${list(S.engagement)}</ul>`);
  }

  /* ---------- BIO ---------- */
  if (page === "bio") {
    set("#photo", photo());
    set("#bioText", paras(S.bio) + `<p><a class="more" href="research.html">Read about my research</a></p>`);
    set("#employmentL", list(S.employment));
    set("#educationL", list(S.education));
    set("#membershipsL", list(S.memberships));
  }

  /* ---------- RESEARCH ---------- */
  if (page === "research") {
    const R = S.research;
    set("#overview", paras(R.overview));
    set("#figures", figures([{ label: "Peer-reviewed publications", note: `${firstCount} as first author`, value: pubs.length }, ...S.stats]));
    set("#tiles", R.areas.map((a, i) => `<a class="tile" href="#${a.id}"><span class="n">0${i + 1}</span><h3>${esc(a.title)}</h3><p>${esc(a.short || "")}</p><span class="status">${esc(a.status)}</span></a>`).join(""));
    set("#areas", R.areas.map(a => {
      const rel = a.tag ? pubs.filter(p => p.tags.includes(a.tag)).sort((x, y) => y.year - x.year) : [];
      return `<section class="block" id="${a.id}"><div class="wrap sec">
        <div class="sec-label"><h2>${esc(a.title)}</h2><span class="status">${esc(a.status)}</span></div>
        <div class="sec-body">
          <h3 class="sub-h">Overview</h3>
          ${paras(a.overview)}
          <h3 class="sub-h">Related publications${rel.length ? ` (${rel.length})` : ""}</h3>
          ${rel.length ? rel.map(p => pubItem(p, { showYear: true })).join("") : `<p class="muted">${esc(a.noPubs || "None yet.")}</p>`}
        </div>
      </div></section>`;
    }).join(""));
  }

  /* ---------- PUBLICATIONS ---------- */
  if (page === "publications") {
    const params = new URLSearchParams(location.search);
    const state = { q: "", year: "all", type: "all", first: false, tag: params.get("tag") || "" };
    set("#pubSummary", `${pubs.length} peer-reviewed publications, ${firstCount} as first author. Citation figures from <a href="${esc(S.profiles[0].url)}" target="_blank" rel="noopener">Google Scholar</a>.`);
    const years = [...new Set(pubs.map(p => p.year))].sort((a, b) => b - a);
    set("#yearSel", `<option value="all">All years</option>` + years.map(y => `<option>${y}</option>`).join(""));
    const types = Object.keys(TYPES).filter(t => pubs.some(p => p.type === t));
    const TAGS = { bio: "Biometric authentication", edu: "Computing education" };
    function segHtml() {
      return `<button data-t="all" class="${state.type === "all" && !state.first && !state.tag ? "on" : ""}">All</button>` +
        types.map(t => `<button data-t="${t}" class="${state.type === t ? "on" : ""}">${TYPES[t]}s</button>`).join("") +
        `<button data-first class="${state.first ? "on" : ""}">First author</button>` +
        Object.entries(TAGS).map(([k, l]) => `<button data-tag="${k}" class="${state.tag === k ? "on" : ""}">${l}</button>`).join("");
    }
    function render() {
      set("#typeSeg", segHtml());
      const q = state.q.trim().toLowerCase();
      const items = pubs
        .filter(p => state.year === "all" || String(p.year) === state.year)
        .filter(p => state.type === "all" || p.type === state.type)
        .filter(p => !state.first || p.first)
        .filter(p => !state.tag || p.tags.includes(state.tag))
        .filter(p => !q || [p.title, p.authors, p.venue].join(" ").toLowerCase().includes(q))
        .sort((a, b) => b.year - a.year);
      set("#pubCount", `Showing ${items.length} of ${pubs.length}`);
      if (!items.length) { set("#pubList", `<div class="empty">No publications match. Try clearing a filter.</div>`); return; }
      let html = "", last = null;
      items.forEach(p => { if (p.year !== last) { html += `<div class="year-h">${p.year}</div>`; last = p.year; } html += pubItem(p); });
      set("#pubList", html);
    }
    $("#q").addEventListener("input", e => { state.q = e.target.value; render(); });
    $("#yearSel").addEventListener("change", e => { state.year = e.target.value; render(); });
    $("#typeSeg").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.t) { state.type = b.dataset.t; if (b.dataset.t === "all") { state.first = false; state.tag = ""; } }
      if ("first" in b.dataset) state.first = !state.first;
      if (b.dataset.tag) state.tag = state.tag === b.dataset.tag ? "" : b.dataset.tag;
      render();
    });
    $("#allBib").addEventListener("click", () => copy(pubs.map(bibtex).join("\n\n"), "All BibTeX copied"));
    set("#review", S.research.underReview.map(x => `<li>${esc(x)}</li>`).join(""));
    render();
  }

  /* ---------- TEACHING ---------- */
  if (page === "teaching") {
    const T = S.teaching;
    set("#intro", esc(T.intro));
    set("#approach", T.approach.map(p => `<div><dt>${esc(p.head)}</dt><dd>${esc(p.text)}</dd></div>`).join(""));
    set("#roles", T.roles.map(r => `<div class="role"><div class="role-head"><h3>${esc(r.org)}</h3><span class="when">${esc(r.years)}</span></div>
      <div class="muted small">${esc(r.role)}</div><div class="units">${r.units.map(esc).join(" · ")}</div></div>`).join(""));
    set("#guest", list(T.guest));
    set("#recognition", figures(T.recognition));
    set("#supervision", T.supervision.map(x => `<li>${esc(x)}</li>`).join(""));
  }
}

/* ---------- Google Scholar metrics ----------
   assets/scholar.json is refreshed weekly by .github/workflows/update-scholar.yml.
   If it can't be loaded (e.g. opening the file locally), data.js values are used. */
function applyScholar(S, SCH) {
  if (!SCH || !SCH.citations) return;
  const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const when = /^\d{4}-\d{2}/.test(SCH.updated || "") ? `${M[+SCH.updated.slice(5, 7) - 1]} ${SCH.updated.slice(0, 4)}` : "";
  const note = `Google Scholar${when ? ", " + when : ""}`;
  S.stats.forEach(s => {
    if (s.key === "citations") { s.value = String(SCH.citations); s.note = note; }
    if (s.key === "hindex" && SCH.hindex != null) {
      s.value = String(SCH.hindex);
      s.note = (SCH.i10index != null ? `i10-index ${SCH.i10index} · ` : "") + note;
    }
  });
  const norm = t => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const papers = SCH.papers || {};
  const keys = Object.keys(papers);
  S.publications.forEach(p => {
    const n = norm(p.title);
    let c = papers[n];
    if (c == null) { const k = keys.find(k => k.startsWith(n.slice(0, 40)) || n.startsWith(k.slice(0, 40))); if (k) c = papers[k]; }
    if (c != null) p.cites = c;
  });
}

Promise.race([
  location.protocol === "file:" ? Promise.resolve(null) : fetch("assets/scholar.json", { cache: "no-cache" }).then(r => (r.ok ? r.json() : null)),
  new Promise(res => setTimeout(() => res(null), 2500))
]).catch(() => null).then(boot);
