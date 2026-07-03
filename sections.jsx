// sections.jsx — clean sans-serif portfolio sections
// All sections receive `lang`. Content from window.PORTFOLIO_CONTENT.

const { useState, useEffect, useRef, useMemo } = React;
const PC = window.PORTFOLIO_CONTENT;

// pick localized string
const L = (val, lang) => (val && typeof val === "object" && "tr" in val) ? val[lang] : val;

// ────────────────────────────────────────────────────────────────
// Hero / About
// ────────────────────────────────────────────────────────────────
function Hero({ lang }) {
  const role = L(PC.meta.role, lang);
  const loc  = L(PC.meta.location, lang);

  return (
    <section id="about" className="sec hero" data-screen-label="01 about">
      <p className="kicker">{role.toUpperCase()}</p>
      <h1 className="name">{PC.meta.name}</h1>

      <div className="meta-row">
        <span className="meta-item">{loc}</span>
      </div>

      <div className="bio">
        {L(PC.about.body, lang).map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="tools">
        <span className="tools-label">{lang === "tr" ? "araçlar" : "tools"}</span>
        <div className="tools-list">
          {PC.about.tools.map((tool) => (
            <span key={tool} className="tool-tag">{tool}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Games — itch.io embeds (or stylized placeholders)
// ────────────────────────────────────────────────────────────────
function Games({ lang }) {
  const [active, setActive] = useState(null);
  return (
    <section id="games" className="sec" data-screen-label="02 games">
      <SectionHeader title={lang === "tr" ? "Oyunlar" : "Games"}>
        <a className="sec-link" href={`https://${PC.meta.itchUser}.itch.io`} target="_blank" rel="noreferrer" lang="en">
          {PC.meta.itchUser}.itch.io ↗
        </a>
      </SectionHeader>

      <div className="games-grid">
        {PC.games.map((g) => (
          <GameCard
            key={g.slug}
            game={g}
            lang={lang}
            active={active === g.slug}
            onToggle={() => setActive(active === g.slug ? null : g.slug)}
          />
        ))}
      </div>
    </section>
  );
}

function GameCard({ game, lang, active, onToggle }) {
  return (
    <article className={"game-card" + (active ? " is-active" : "")}>
      <div className="game-head">
        <div className="game-thumb">
          {game.cover
            ? <img className="cover-img" src={game.cover} alt={game.title} loading="lazy" />
            : <ThumbArt slug={game.slug} />}
        </div>
        <div className="game-meta">
          <h3 className="game-title" lang="en">{game.title}</h3>
          <div className="game-sub" lang="en">
            <span>{L(game.tag, lang)}</span>
            <span className="sep">·</span>
            <span>{game.engine}</span>
            <span className="sep">·</span>
            <span>{game.year}</span>
          </div>
          <p className="game-desc">{L(game.desc, lang)}</p>
        </div>
      </div>

      <div className="game-actions">
        {game.embedId && (
          <button className="btn-line" onClick={onToggle}>
            {active ? L(PC.ui.close, lang) : (lang === "tr" ? "burada oyna" : "play here")}
          </button>
        )}
        <a className="btn-line ghost" href={game.url} target="_blank" rel="noreferrer">
          {game.linkLabel
            ? L(game.linkLabel, lang)
            : (lang === "tr"
                ? (<><span lang="en">itch.io</span>'da incele</>)
                : (<>view on <span lang="en">itch.io</span></>)
              )
          } ↗
        </a>
      </div>

      {active && (
        <div className="game-embed">
          {game.embedId ? (
            <iframe
              title={game.title}
              src={`https://itch.io/embed-upload/${game.embedId}?color=1a1820`}
              frameBorder="0"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <EmbedFallback game={game} lang={lang} />
          )}
        </div>
      )}
    </article>
  );
}

function EmbedFallback({ game, lang }) {
  return (
    <div className="embed-fb">
      {game.cover
        ? <img className="cover-img big" src={game.cover} alt={game.title} loading="lazy" />
        : <ThumbArt slug={game.slug} big />}
      <div className="embed-fb-cap">
        {lang === "tr"
          ? "itch.io embed kodunu content.js → games[].embedId alanına ekleyince oyun burada açılır."
          : "Add an itch.io embedId in content.js → games[] to load the real game here."}
      </div>
    </div>
  );
}

// Deterministic procedural "cover art" for each game
function ThumbArt({ slug, big = false }) {
  const seed = useMemo(() => {
    let h = 0;
    for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
    return h;
  }, [slug]);

  const cells = 8;
  const rng = (i) => {
    let x = Math.sin(seed * 9301 + i * 49297) * 233280;
    return x - Math.floor(x);
  };

  return (
    <div className={"thumb-art" + (big ? " big" : "")}>
      <div className="thumb-grid" style={{ gridTemplateColumns: `repeat(${cells}, 1fr)` }}>
        {Array.from({ length: cells * cells }).map((_, i) => {
          const r = rng(i);
          let cls = "c0";
          if (r > 0.78) cls = "c3";
          else if (r > 0.58) cls = "c2";
          else if (r > 0.35) cls = "c1";
          return <span key={i} className={"cell " + cls} />;
        })}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Certificates
// ────────────────────────────────────────────────────────────────
function Certs({ lang }) {
  return (
    <section id="certs" className="sec" data-screen-label="03 certs">
      <SectionHeader title={lang === "tr" ? "Sertifikalar" : "Certificates"} />
      <ul className="cert-list">
        {PC.certs.map((c, i) => {
          const Tag = c.url ? "a" : "div";
          const linkProps = c.url ? { href: c.url, target: "_blank", rel: "noreferrer" } : {};
          return (
            <li key={i}>
              <Tag className={"cert-row" + (c.url ? " is-link" : "")} {...linkProps}>
                <span className="cert-year">{c.year}</span>
                <span className="cert-title">
                  {L(c.title, lang)}
                  {c.url && <span className="row-arrow" aria-hidden="true"> ↗</span>}
                </span>
                <span className="cert-issuer" lang="en">{L(c.issuer, lang)}</span>
              </Tag>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Jams (attended + organized)
// ────────────────────────────────────────────────────────────────
function Jams({ lang }) {
  return (
    <section id="jams" className="sec" data-screen-label="04 jams">
      <SectionHeader title={lang === "tr" ? "Jam'ler" : "Jams"} />

      <div className="jam-cols">
        <div className="jam-col">
          <h3 className="jam-col-title">
            {lang === "tr" ? "Katıldıklarım" : "Attended"}
          </h3>
          <ul className="jam-list">
            {PC.jamsAttended.map((j, i) => (
              <JamRow
                key={i}
                jam={j}
                bottom={
                  <>
                    <span className="jam-role">{L(j.role, lang)}</span>
                    {j.place && <span className="jam-place"> · {L(j.place, lang)}</span>}
                  </>
                }
              />
            ))}
          </ul>
        </div>

        <div className="jam-col">
          <h3 className="jam-col-title">
            {lang === "tr" ? "Düzenlediklerim" : "Organized"}
          </h3>
          <ul className="jam-list">
            {PC.jamsOrganized.map((j, i) => (
              <JamRow
                key={i}
                jam={j}
                bottom={
                  <>
                    <span className="jam-role">{L(j.theme, lang)}</span>
                    {j.participants ? (
                      <span className="jam-place">  {j.participants} {lang === "tr" ? "yüklenen oyun" : "uploaded game"}</span>
                    ) : null}
                  </>
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function JamRow({ jam, bottom }) {
  const Tag = jam.url ? "a" : "div";
  const linkProps = jam.url ? { href: jam.url, target: "_blank", rel: "noreferrer" } : {};
  return (
    <li>
      <Tag className={"jam-row" + (jam.url ? " is-link" : "")} {...linkProps}>
        <div className="jam-row-top">
          <span className="jam-name" lang="en">
            {jam.name}
            {jam.url && <span className="row-arrow" aria-hidden="true"> ↗</span>}
          </span>
          <span className="jam-year">{jam.year}</span>
        </div>
        <div className="jam-row-bot">{bottom}</div>
      </Tag>
    </li>
  );
}

// ────────────────────────────────────────────────────────────────
// Blog / Devblog — timeline
// ────────────────────────────────────────────────────────────────
function Blog({ lang }) {
  const [open, setOpen] = useState(0);
  // İçi boşaltılmış (örn. tüm alanlar yorum satırına alınmış {}) girdileri ele.
  const posts = (PC.blog || []).filter((p) => p && (p.title || p.date || p.body));
  if (posts.length === 0) {
    return (
      <section id="blog" className="sec" data-screen-label="05 blog">
        <SectionHeader title="Devblog" />
        <div className="empty-state">
          <div className="empty-title">{L(PC.ui.comingSoon, lang)}</div>
          <p className="empty-desc">{L(PC.ui.comingSoonDesc, lang)}</p>
        </div>
      </section>
    );
  }
  return (
    <section id="blog" className="sec" data-screen-label="05 blog">
      <SectionHeader title="Devblog" />
      <ol className="timeline">
        {posts.map((post, i) => {
          const isOpen = open === i;
          const d = new Date(post.date);
          return (
            <li key={i} className={"tl-item" + (isOpen ? " open" : "")}>
              <button className="tl-head" onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="tl-dot" />
                <span className="tl-date">{formatDate(d, lang)}</span>
                <span className="tl-title" lang="en">{L(post.title, lang)}</span>
                <span className="tl-chev">{isOpen ? "−" : "+"}</span>
              </button>
              <div className="tl-tags">
                {post.tags.map((tag) => <span key={tag} className="tag" lang="en">{tag}</span>)}
              </div>
              {isOpen && (
                <div className="tl-body">
                  <p>{L(post.body, lang)}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function formatDate(d, lang) {
  const m = d.toLocaleString(lang === "tr" ? "tr-TR" : "en-US", { month: "short" });
  return `${String(d.getDate()).padStart(2, "0")} ${m} ${d.getFullYear()}`;
}

// ────────────────────────────────────────────────────────────────
// Contact
// ────────────────────────────────────────────────────────────────
function Contact({ lang }) {
  return (
    <section id="contact" className="sec" data-screen-label="06 contact">
      <SectionHeader title={lang === "tr" ? "İletişim" : "Contact"} />
      <p className="contact-body">{L(PC.contact.body, lang)}</p>
      <ul className="contact-list">
        {PC.contact.links.map((c, i) => (
          <li key={i}>
            <a className="contact-row" href={c.href} target="_blank" rel="noreferrer">
              <span className="contact-label" lang="en">{c.label}</span>
              <span className="contact-line" aria-hidden="true" />
              <span className="contact-handle" lang="en">{c.handle} ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Shared bits
// ────────────────────────────────────────────────────────────────
function SectionHeader({ title, children }) {
  return (
    <header className="sec-head">
      <div className="sec-titlerow">
        <h2 className="sec-title">{title}</h2>
        <div className="sec-rule" />
        {children}
      </div>
    </header>
  );
}

// expose to window so app.jsx can use them
Object.assign(window, {
  Hero, Games, Certs, Jams, Blog, Contact, SectionHeader, L,
});
