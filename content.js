
window.PORTFOLIO_CONTENT = {
  meta: {
    itchUser: "dollyjik",
    name: "Arda Yavuz",
    role: { tr: "oyun geliştirici", en: "game developer" },
    location: { tr: "İstanbul, TR", en: "Istanbul, TR" },
  },

  nav: {
    about:   { tr: "hakkında",     en: "about" },
    games:   { tr: "projeler",     en: "games" },
    certs:   { tr: "sertifikalar", en: "certs" },
    jams:    { tr: "jam'ler",      en: "jams" },
    blog:    { tr: "devblog",      en: "devblog" },
    contact: { tr: "iletişim",     en: "contact" },
  },

  about: {
    title: { tr: "// hakkımda", en: "// about" },
    body: {
      tr: [
        "Merhaba — ben Arda. Game Developer'ım. Genel olarak Unity 3D ortamlarda çalışıyorum.",
        "İlgi alanlarım: oyun mekaniği tasarımı, prosedürel sistemler. Aynı zamanda jam organizasyonu ve topluluk işleri ile de ilgileniyorum.",
        "Bu sitede bitirdiğim oyunları, devam eden geliştirme blog'larımı, sertifikalarımı ve yer aldığım jam'leri topluyorum."
      ],
      en: [
        "Hi — I'm Arda. I'm a Game Developer. I usually work in Unity 3D environments.",
        "My interests include game mechanic design and procedural systems. I'm also involved in jam organization and community work.",
        "On this site, I'm collecting the games I've finished, my ongoing development blogs, my certificates, and the jams I've participated in."
      ],
    },
    tools: ["Unity", "C#", "Aseprite", "VR"],
  },
  
  games: [
    {
      slug: "vr-exhibition",
      title: "Ali İhtiyar's VR Exhibition",
      tag:   { tr: "VR Sanat Sergisi", en: "VR Art Exhibition" },
      desc:  { tr: "Ali İhtiyar'ın fotoğraflarının ve kısa filmlerinin sergilendiği bir VR Sanat Sergisi.",
        en: "A VR Art Exhibition that exhibit Turkish Photographer Ali Ihtiyar's photographs and short films." },
      year: 2026, engine: "Unity", embedId: null,
      cover: "https://pub-faedaa1ed23048f9a9aac33bd90b8328.r2.dev/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC%202026-07-03%20162257.png",
      url: "https://ifsanalsergi.arel.edu.tr/sergi/",
      linkLabel: { tr: "web sitesini ziyaret et", en: "visit website" },
    },
      
    {
      slug: "mind-visitor",
      title: "Mind Visitor",
      tag:   { tr: "Deck Builder",  en: "Deck Builder" },
      desc:  { tr: "Oyuncuların kendi kart destelerini kurup taktiksel tahta savaşlarında rakiplerine karşı yarıştığı bir deck builder kart oyunu.",
        en: "A deck-building card game where players craft their own decks and face off against opponents in tactical board combat." },
      year: 2026, engine: "Unity", embedId: null,
      cover: "https://img.itch.zone/aW1hZ2UvNDY5NzAyMi8yODI3MTY3MS5wbmc=/347x500/7SI2UQ.png",
      url: "https://dollyjik.itch.io/mind-visitors",
    },
      
    {
      slug: "fishwash",
      title: "FishWash",
      tag:   { tr: "simülator / cel shading",  en: "simulator / cel shading" },
      desc:  { tr: "Okyanusun derinliklerinde devasa balıklar hüküm sürer. Bu devlerin saltanatının devamı sana bağlı.",
               en: "In the depths of the ocean, gigantic fish reign supreme. The survival of these giants’ rule depends on you." },
      year: 2025, engine: "Unity", embedId: null,
      cover: "https://img.itch.zone/aW1nLzIzMzQyNzQ3LnBuZw==/315x250%23c/SrXsQn.png",
      url: "https://dollyjik.itch.io/fishwash",
    },
    {
      slug: "potion-merchant",
      title: "Potion Merchant",
      tag:   { tr: "Dükkan İşletme", en: "Shop Management" },
      desc:  { tr: "Potion Merchant, fantastik bir orta çağ kasabasında geçen bir FPS Store Management oyunudur.",
               en: "Potion Merchant is an FPS Store Management game set in a fantasy medieval town." },
      year: 2024, engine: "Unity", embedId: null,
      cover: "https://img.itch.zone/aW1hZ2UvMzg1MjQyMi8yODI3MTY1OS5wbmc=/original/jKPg55.png",
      url: "https://dollyjik.itch.io/potion-merchant",
    },

  ],
  
  certs: [
    { title: { tr: "Mezuniyet Sertifikası", en: "Graduation Certificate" }, issuer: { tr: "Google Oyun ve Uygulama Akademisi", en: "Google Game and Application Academy" }, year: 2024, url: "https://drive.google.com/file/d/1AzJkF7AuDjATO_-vGqlbg42IHtlP5XUY/view" },
    { title: { tr: "Bitirme Projesi: Proje Yönetimini Gerçek Dünyada Uygulamak", en: "Capstone: Applying Project Management in the Real World" }, issuer: "Google", year: 2024, url: "https://drive.google.com/file/d/18LwjlW6gKyBitP-jGb-6CyCHWOL_NXGY/view" },
    { title: { tr: "Google Proje Yönetimi", en: "Google Project Management" }, issuer: "Google", year: 2024, url: "https://drive.google.com/file/d/1ZRmIV25GfnMZmw6i-p5GVBDK1wgoqcJX/view" },
    { title: { tr: "Çevik Proje Yönetimi", en: "Agile Project Management" }, issuer: "Google", year: 2024, url: "https://drive.google.com/file/d/1vX3WOw7HC8Te-FRRvjUUK0eEBQMilZ-5/view" },
    { title: { tr: "Projeyi Yürütme: Projeyi Hayata Geçirme", en: "Project Execution: Running the Project" }, issuer: "Google", year: 2024, url: "https://drive.google.com/file/d/1Srk-KI6ev0hRI62XOGYpvoaQ70XCrwHI/view" },
    { title: { tr: "Proje Planlaması: Her Şeyi Bir Araya Getirmek", en: "Project Planning: Putting It All Together" }, issuer: "Google", year: 2024, url: "https://drive.google.com/file/d/1uhUDio3oOEkdcwFzFMXGv6aQ8Fuz2RRY/view" },
    { title: { tr: "Projeyi Başlatma: Projeye Başarıyla Adım Atma", en: "Project Initiation: Starting a Successful Project" }, issuer: "Google", year: 2024, url: "https://drive.google.com/file/d/1cdX5ffAjw8ZX-LyVI54J1FGMolQY2W6P/view" },
    { title: { tr: "Proje Yönetiminin Temelleri", en: "Foundations of Project Management" }, issuer: "Google", year: 2024, url: "https://drive.google.com/file/d/1a0Dkx46naPr-2mU3xMtPnPslZL5IIuFA/view" },
    { title: "Pixel Art for Video Games", issuer: "Michigan State University", year: 2020, url: "https://drive.google.com/file/d/1jLy3c9pTE5c4RIUvAjXxETImA-hYMVRQ/view" },
  ],

  jamsAttended: [
    { name: "Magara Jam 2025",   role: { tr: "Game Developer", en: "Game Developer" }, year: 2025, place: null, url: "https://dollyjik.itch.io/fishwash" },
    { name: "SANDBOX Göbeklitepe Jam",   role: { tr: "Game Developer", en: "Game Developer" }, year: 2023, place: null, url: null },
    { name: "Global Game Jam 2023",         role: { tr: "Pixel Artist", en: "Pixel Artist" }, year: 2023, place: null, url: null },
    { name: "GOAT Game Jam",     role: { tr: "Pixel Artist", en: "Pixel Artist" }, year: 2022, place: null, url: null },
    { name: "Magara Jam #3",       role: { tr: "Pixel Artist", en: "Pixel Artist" }, year: 2021, place: { tr: "Top 50", en: "Top 50" }, url: "https://mertbozkurtlar.itch.io/plokho" },
    { name: "Boğaziçi Game Jam",       role: { tr: "Pixel Artist", en: "Pixel Artist" }, year: 2021, place: { tr: "Top 10", en: "Top 10" }, url: "https://dollyjik.itch.io/a-kind-ronin" },
  ],

  jamsOrganized: [
      { name: "GOAT Jam III",    year: 2026, theme: null,           participants: null , url: null },
    { name: "Liseler Arası Game Jam II",    year: 2026, theme: null,           participants: 29, url: "https://itch.io/jam/liseler-arasi-game-jam-ii" },
    { name: "Staff Jam",     year: 2025, theme: null,              participants: null  , url: null },    
    { name: "Sandwich Jam 2",     year: 2025, theme: null,              participants: 11, url: "https://itch.io/jam/sandvich-jam-2" },
    { name: "GOAT JAM II",     year: 2025, theme: null, participants: 38, url: "https://itch.io/jam/goat-jam" },
    { name: "Liseler Arası Game Jam ",    year: 2025, theme: null,           participants: null, url: null },
    { name: "Sandwich Jam",     year: 2024, theme: null,         participants: 30, url: "https://itch.io/jam/sandwichjam" },
    { name: "There is No Jam",    year: 2024, theme: null,          participants: 7, url: "https://itch.io/jam/there-is-no-jam" },
    { name: "Divan-ı Jam",    year: 2024, theme: null,          participants: 9, url: "https://itch.io/jam/divani-jam" }
  ],

  blog: [
    {
      //date: "2026-05-10",
      //title: { tr: "Wraithlight: ışıklandırma denemeleri", en: "Wraithlight: lighting experiments" },
      //tags: ["unreal", "lighting", "devlog"],
      //body: {
      //  tr: "Bu hafta Lumen yerine bake'li aydınlatma denedim. Sebebi performans değil; bake'in verdiği o ölü, sabit havayı istiyordum. Sonuçları, sorunları ve fener shader'ının nasıl geri yazıldığını paylaşıyorum.",
      //  en: "This week I swapped Lumen for baked lighting. Not for perf — I wanted the dead, fixed mood that baking gives you. Notes on the results, the snags, and how I rewrote the lantern shader.",
      //},
    }
  ],

  contact: {
    title: { tr: "// iletişim", en: "// contact" },
    body: {
      tr: "İletişim kurmak için aşağıdaki kanalları kullanabilirsiniz.",
      en: "You can use the following channels to get in touch.",
    },
    links: [
      { label: "linkedin",   href: "https://www.linkedin.com/in/arda-yavuz/",                  handle: "Arda Yavuz" },
      { label: "itch.io",  href: "https://dollyjik.itch.io",            handle: "@dollyjik" },
      { label: "github",   href: "https://github.com/dollyjik",                  handle: "@dollyjik" },
      { label: "mail",     href: "mailto:iletisim@dollyjik.dev",             handle: "iletisim@dollyjik.dev" },
    ],
  },

  ui: {
    close:  { tr: "kapat",       en: "close" },
    footer: { tr: "2026", en: "2026" },
    comingSoon:     { tr: "Yakında", en: "Coming soon" },
    comingSoonDesc: { tr: "Yakında ilk devblog yazıları burada olacak.",
                      en: "First devblog entries will land here soon." },
  },
};
