// app.jsx — root app: nav, layout, language toggle

const { useState, useEffect } = React;

const ACCENT = "#a78bfa";
const FONT_STACK = `"Bahnschrift", "Bahnschrift Light SemiCondensed", "Segoe UI Variable Display", "Segoe UI", system-ui, -apple-system, sans-serif`;

function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("ay-lang") || "tr"; } catch (e) { return "tr"; }
  });
  useEffect(() => {
    try { localStorage.setItem("ay-lang", lang); } catch (e) {}
    // Update html[lang] so CSS text-transform: uppercase uses the right locale.
    document.documentElement.lang = lang;
  }, [lang]);

  const [activeSec, setActiveSec] = useState("about");

  // scroll-spy — find the last section whose top has crossed a trigger line.
  useEffect(() => {
    const ids = ["about", "games", "jams", "certs", "blog", "contact"];
    const onScroll = () => {
      const trigger = window.innerHeight * 0.28;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - trigger <= 0) {
          current = id;
        }
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = ids[ids.length - 1];
      }
      setActiveSec(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const themeStyle = {
    "--accent": ACCENT,
    "--font-mono": FONT_STACK,
  };

  return (
    <div
      className="root style-brutalist theme-dark anim-subtle layout-stacked"
      style={themeStyle}
    >
      <Nav lang={lang} setLang={setLang} active={activeSec} />

      <main className="main">
        <Hero lang={lang} />
        <Games lang={lang} />
        <Jams lang={lang} />
        <Certs lang={lang} />
        <Blog lang={lang} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}

function Nav({ lang, setLang, active }) {
  const items = [
    { id: "about",   label: PC.nav.about },
    { id: "games",   label: PC.nav.games },
    { id: "jams",    label: PC.nav.jams },
    { id: "certs",   label: PC.nav.certs },
    { id: "blog",    label: PC.nav.blog },
    { id: "contact", label: PC.nav.contact },
  ];
  const [open, setOpen] = useState(false); // mobile menu

  const goTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className="nav-wrap">
      <nav className="nav">
        <a className="nav-brand" href="#about" onClick={goTo("about")}>
          <span className="brand-name">{PC.meta.name}</span>
        </a>

        <button
          className="nav-burger"
          aria-label="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <ul className={"nav-list" + (open ? " is-open" : "")}>
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={"#" + it.id}
                className={"nav-link" + (active === it.id ? " is-active" : "")}
                onClick={goTo(it.id)}
              >
                {L(it.label, lang)}
              </a>
            </li>
          ))}
          <li className="nav-lang-wrap">
            <button
              className="nav-lang"
              onClick={() => setLang(lang === "tr" ? "en" : "tr")}
              aria-label="toggle language"
            >
              <span className={lang === "tr" ? "on" : ""}>tr</span>
              <span className="slash">/</span>
              <span className={lang === "en" ? "on" : ""}>en</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Footer({ lang }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} {PC.meta.name}</span>
        <span className="dim">{L(PC.ui.footer, lang)}</span>
        <a href="#about" className="back-top" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>↑ top</a>
      </div>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
