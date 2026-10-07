/* ===== EDIT THIS PART: everything on the site comes from here ===== */
const ME = {
  name: "Asjad Ejaz",
  fullName: "Asjad Ejaz",                          // <-- your full name
  photo: "profile.jpg",                                  // <-- your photo (leave "" to show your initial)
  title: "Software Engineering student",
  year: "2026",                               // big outlined year in the intro
  email: "asjade511@gmail.com",            // <-- put your real email here
  headline: "Every program is a loop",
  intro: "I'm a Software Engineering student at FAST-NUCES, turning ideas into working programs, starting with C++ and object-oriented design.",
  about: [
    "I study Software Engineering at FAST-NUCES in Multan. My coursework covers object-oriented programming in C++, and I enjoy breaking a problem into small classes that each do one job.",
    "I'm looking for internships and small projects where I can learn from real teams and ship things people use."
  ],
  info: [   // ["Label", "Value"]. Empty values are hidden.
    ["Education", "BS Software Engineering, FAST-NUCES Multan"],
    ["Batch", "2025"],
    ["Location", "Multan, Pakistan"],
    ["Email", "auto"],
    ["Phone", ""],
    ["Languages", "English, Urdu"],
    ["Interests", "Coding, Problem Solving, Teamwork, Learning new technologies"]
  ],
  skills: ["C++", "Object-Oriented Programming", "Problem Solving", "Data Structures", "Teamwork", "Communication"],
  timeline: [   // [when, what]
    ["2025", "Began BS Software Engineering at FAST-NUCES, Multan."],
    ["Now", "Learning C++ and Data Structures Concepts."],
    ["Next", "Internships and real projects with real teams."]
  ],
  projects: [
    { title: "Library Management System", tags: "C++ / OOP", text: "Created LMS while learning Object-Oriented Programming course.", link: "" },
    { title: "Transport Management System", tags: "C++ / Classes", text: "This was developed for an assignment in OOP course in Second Semester", link: "" },
    { title: "Community Service Project", tags: "Teamwork", text: "Worked as a team lead and advisor in a community service Project titled Youth Leadership Development Program", link: "" }
  ],
  links: [{ label: "GitHub", url: "https://github.com/Asjad-Ejaz" }, { label: "LinkedIn", url: "https://linkedin.com/in/asjad-ejaz" }]
};
/* ================================================================== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

document.title = ME.name + " | " + ME.title;
$("ld").textContent = ME.name; $("logo").textContent = ME.name; $("year").textContent = ME.year;
$("role").textContent = ME.title; $("h1").textContent = ME.headline; $("lead").textContent = ME.intro;
$("photo").innerHTML = ME.photo ? '<img src="' + esc(ME.photo) + '" alt="Photo of ' + esc(ME.name) + '">' : '<div class="mono" aria-hidden="true">' + esc(ME.name.charAt(0)) + "</div>";
$("pname").textContent = ME.fullName || ME.name; $("psub").textContent = ME.title;
$("info").innerHTML = ME.info.map(r => r[0] === "Email" ? ["Email", ME.email] : r).filter(r => r[1]).map(r =>
  "<dt>" + esc(r[0]) + "</dt><dd>" + (r[0] === "Email" ? '<a href="mailto:' + esc(r[1]) + '">' + esc(r[1]) + "</a>" : esc(r[1])) + "</dd>").join("");
$("aboutText").innerHTML = ME.about.map(p => "<p>" + esc(p) + "</p>").join("");
$("skills").innerHTML = ME.skills.map(s => "<li>" + esc(s) + "</li>").join("");
$("tl").innerHTML = ME.timeline.map(t => '<div class="ev"><b>' + esc(t[0]) + "</b><p>" + esc(t[1]) + "</p></div>").join("");
$("projList").innerHTML = ME.projects.map(p => '<article class="proj"><h3>' + esc(p.title) + '</h3><span class="tags">' + esc(p.tags) + "</span><p>" + esc(p.text) + "</p>" +
  (p.link ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">View project</a>' : "") + "</article>").join("");
$("social").innerHTML = ME.links.map(l => '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>").join("");
$("foot").textContent = "© " + new Date().getFullYear() + " " + ME.name;
$("form").onsubmit = e => {
  e.preventDefault();
  const body = $("m").value + "\n\nFrom: " + $("n").value + " (" + $("e").value + ")";
  location.href = "mailto:" + ME.email + "?subject=" + encodeURIComponent("Portfolio message from " + $("n").value) + "&body=" + encodeURIComponent(body);
  $("msg").textContent = "Opening your email app. If nothing opens, write to " + ME.email + ".";
};

/* reveal on scroll */
const rvs = [...document.querySelectorAll("section > h2, section > div, .proj, .ev")];
rvs.forEach(el => { el.classList.add("rv"); const sib = [...el.parentNode.children]; if (el.matches(".proj,.ev")) el.style.setProperty("--d", sib.indexOf(el) * 0.12 + "s"); });
if ("IntersectionObserver" in window && !reduce) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.15 });
  rvs.forEach(el => io.observe(el));
} else rvs.forEach(el => el.classList.add("in"));

/* current section in menu */
const links = [...document.querySelectorAll("nav ul a")];
if ("IntersectionObserver" in window) {
  const so = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("section[id]").forEach(s => so.observe(s));
}

/* scroll progress, header, journey line */
const bar = $("bar"), head = document.querySelector("header"), tl = $("tl");
let tick = false;
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
  head.classList.toggle("s", scrollY > 20);
  const r = tl.getBoundingClientRect();
  tl.style.setProperty("--p", Math.max(0, Math.min(1, (innerHeight * 0.65 - r.top) / r.height)));
  tick = false;
}
addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

/* drifting "dark matter" particles that scatter away from the pointer */
const cv = $("fx"), cx = cv.getContext("2d");
let W, H, P = [], mx = -999, my = -999;
function size() {
  const d = Math.min(devicePixelRatio || 1, 2);
  W = cv.width = innerWidth * d; H = cv.height = innerHeight * d; cx.setTransform(d, 0, 0, d, 0, 0);
  const n = innerWidth < 700 ? 45 : 95;
  P = Array.from({ length: n }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.4 + .4 }));
}
function frame() {
  cx.clearRect(0, 0, innerWidth, innerHeight);
  for (const p of P) {
    const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
    if (d2 < 22500) { const f = (1 - d2 / 22500) * .6; p.vx += dx / Math.sqrt(d2 + 1) * f * .08; p.vy += dy / Math.sqrt(d2 + 1) * f * .08; }
    p.vx *= .985; p.vy *= .985;
    p.x += p.vx + .05; p.y += p.vy - .03;
    if (p.x > innerWidth + 10) p.x = -10; if (p.x < -10) p.x = innerWidth + 10;
    if (p.y > innerHeight + 10) p.y = -10; if (p.y < -10) p.y = innerHeight + 10;
    cx.fillStyle = "rgba(169,203,220,.55)"; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fill();
  }
  for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
    const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y, d = dx * dx + dy * dy;
    if (d < 11000) { cx.strokeStyle = "rgba(169,203,220," + (.13 * (1 - d / 11000)) + ")"; cx.beginPath(); cx.moveTo(P[i].x, P[i].y); cx.lineTo(P[j].x, P[j].y); cx.stroke(); }
  }
  if (!document.hidden && !reduce) requestAnimationFrame(frame);
}
size(); addEventListener("resize", size);
document.addEventListener("visibilitychange", () => { if (!document.hidden && !reduce) requestAnimationFrame(frame); });
addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; }, { passive: true });
if (reduce) { for (let i = 0; i < 3; i++) frame(); } else requestAnimationFrame(frame);
