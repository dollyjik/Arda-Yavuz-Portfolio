// app.jsx — root app: nav, layout

const { useEffect } = React;

const ACCENT = "#a78bfa";
const FONT_STACK = `"Bahnschrift", "Bahnschrift Light SemiCondensed", "Segoe UI Variable Display", "Segoe UI", system-ui, -apple-system, sans-serif`;

// Site language is fixed in code — change this to switch the whole site
// between the translations already defined in content.js (e.g. "tr" or "en").
const SITE_LANG = "tr";

function App() {
  const lang = SITE_LANG;
  useEffect(() => {
    // Update html[lang] so CSS text-transform: uppercase uses the right locale.
    document.documentElement.lang = lang;
  }, [lang]);

  const themeStyle = {
    "--accent": ACCENT,
    "--font-mono": FONT_STACK,
  };

  return (
    <div
      className="root style-brutalist theme-dark anim-subtle layout-stacked"
      style={themeStyle}
    >
      <main className="main">
        <Hero lang={lang} />
        <Games lang={lang} />
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
