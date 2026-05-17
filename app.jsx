// app.jsx — root app: nav, layout, tweaks, language toggle, theming

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": true,
  "accent": "#a78bfa",
  "font": "bahnschrift",
  "anim": "subtle",
  "layout": "stacked",
  "style": "brutalist"
}/*EDITMODE-END*/;

const ACCENTS = [
  "#a78bfa", // lila (default)
  "#c084fc", // bright magenta-violet
  "#7c3aed", // deep violet
  "#22d3ee", // cyan
  "#34d399", // terminal green
  "#fb923c", // amber
];

const FONT_STACKS = {
  bahnschrift: `"Bahnschrift", "Bahnschrift Light SemiCondensed", "Segoe UI Variable Display", "Segoe UI", system-ui, -apple-system, "Manrope", sans-serif`,
  manrope:     `"Manrope", system-ui, -apple-system, "Segoe UI", sans-serif`,
  jakarta:     `"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif`,
  outfit:      `"Outfit", system-ui, -apple-system, "Segoe UI", sans-serif`,
};
const FONT_OPTIONS = ["bahnschrift", "manrope", "jakarta", "outfit"];
const FONT_LABELS = {
  bahnschrift: "Bahnschrift",
  manrope: "Manrope",
  jakarta: "Jakarta",
  outfit: "Outfit",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("ay-lang") || "tr"; } catch (e) { return "tr"; }
  });
  useEffect(() => {
    try { localStorage.setItem("ay-lang", lang); } catch (e) {}
    // Update html[lang] so CSS text-transform: uppercase uses the right
    // locale casing (Turkish locale turns 'i' into 'İ', which is wrong for English).
    document.documentElement.lang = lang;
  }, [lang]);

  const [activeSec, setActiveSec] = useState("about");

  // scroll-spy — find the last section whose top has crossed a trigger line.
  // (IntersectionObserver with a narrow band would skip sections you blow past quickly.)
  useEffect(() => {
    const ids = ["about", "games", "jams", "certs", "blog", "contact"];
    const onScroll = () => {
      const trigger = window.innerHeight * 0.28; // ~28% from top
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - trigger <= 0) {
          current = id;
        }
      }
      // bottom-of-page fallback: snap to last section
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

  // expose theme + accent on root
  const themeStyle = {
    "--accent": t.accent,
    "--font-mono": FONT_STACKS[t.font] || FONT_STACKS.bahnschrift,
  };

  return (
    <div
      className={`root style-${t.style} ${t.dark ? "theme-dark" : "theme-light"} anim-${t.anim} layout-${t.layout}`}
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

      <TweaksPanel>
        <TweakSection label={lang === "tr" ? "Stil" : "Style"} />
        <TweakSelect
          label={lang === "tr" ? "Tasarım yönü" : "Direction"}
          value={t.style}
          options={["minimal", "brutalist", "editorial", "arcade"]}
          format={(k) => ({
            minimal: lang === "tr" ? "Sade" : "Minimal",
            brutalist: lang === "tr" ? "Brutalist" : "Brutalist",
            editorial: lang === "tr" ? "Editoryal" : "Editorial",
            arcade: lang === "tr" ? "Arcade" : "Arcade",
          }[k])}
          onChange={(v) => setTweak("style", v)}
        />

        <TweakSection label={lang === "tr" ? "Tema" : "Theme"} />
        <TweakToggle
          label={lang === "tr" ? "Karanlık mod" : "Dark mode"}
          value={t.dark}
          onChange={(v) => setTweak("dark", v)}
        />
        <TweakColor
          label={lang === "tr" ? "Ana renk" : "Accent"}
          value={t.accent}
          options={ACCENTS}
          onChange={(v) => setTweak("accent", v)}
        />

        <TweakSection label={lang === "tr" ? "Tipografi" : "Typography"} />
        <TweakSelect
          label={lang === "tr" ? "Font" : "Font"}
          value={t.font}
          options={FONT_OPTIONS}
          format={(k) => FONT_LABELS[k]}
          onChange={(v) => setTweak("font", v)}
        />

        <TweakSection label={lang === "tr" ? "Hareket" : "Motion"} />
        <TweakRadio
          label={lang === "tr" ? "Animasyon" : "Animation"}
          value={t.anim}
          options={["off", "subtle", "alive"]}
          onChange={(v) => setTweak("anim", v)}
        />

        <TweakSection label={lang === "tr" ? "Düzen" : "Layout"} />
        <TweakRadio
          label={lang === "tr" ? "Oyunlar" : "Games"}
          value={t.layout}
          options={["stacked", "compact"]}
          onChange={(v) => setTweak("layout", v)}
        />
      </TweaksPanel>
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
