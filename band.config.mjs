// ─────────────────────────────────────────────────────────────────────────────
//  BAND CONFIG — this is the ONE file you edit for a new band.
//
//  After editing, run `npm run build` to preview locally (output goes to /public),
//  or just commit + push: Vercel runs the build automatically on every push.
//
//  Tips
//  • Leave a value as '' (empty) to hide that button/link/section.
//  • Image paths are relative to the project root (put files in /images).
//  • Once the band starts using the Admin panel (yoursite.com/#admin), the text,
//    shows and photos they save there are stored in the cloud and take priority
//    over what is written below. This file is the *starting point*.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  // ── Site / SEO ────────────────────────────────────────────────────────────
  site: {
    slug: 'band-name',                        // lowercase letters, numbers, dashes only
    url: 'https://jamesfullermusic.com',      // final domain, no trailing slash
                                              // (link previews build their image address from it)
    title: 'James Fuller — Singer · Songwriter',        // browser tab + link previews
    siteName: 'James Fuller Music',
    description: 'James Fuller — singer-songwriter. Original songs, live shows, and music to stream.',
    shareDescription: 'Original songs · Live music · Stream now.',   // shown in iMessage/Facebook previews
    favicon: '/favicon.svg',
    ogImage: 'images/og-preview.jpg',         // 1200×630 PNG/JPG for link previews ('' to skip). Source: scripts/og-image.html
    footerNote: 'Thanks for listening.',  // small line in footer ('' to hide)
  },

  // ── Artist / band name ────────────────────────────────────────────────────
  artist: {
    name: 'James Fuller',     // full name (footer, alt text, admin header)
    firstName: 'James',       // big hero text, line 1 (white/cream)
    lastName: 'Fuller',       // big hero text, line 2 (gold) — '' for one-line names
    shortName: 'James',       // used in sentences: "About ___", "Catch ___ Live"
    initials: 'JF',           // small logo in the top nav
  },

  // ── Sections on/off ───────────────────────────────────────────────────────
  // Starting point only — the Admin panel's "Sections" tab overrides these.
  // false = hidden from the site and the menu. (The top banner is always shown;
  // Videos also needs a YouTube link — set below or in Admin → Content.)
  sections: {
    about: true,
    music: true,
    shows: true,
    gallery: true,
    videos: true,
    connect: true,
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Singer · Songwriter · Guitar',
    tagline: '"Songs for the long drive home"',
    genre: 'Original Music · Live Shows',
    background: 'images/hero-bg.jpg',
    video: '',                // optional looping hero video: 'images/hero.mp4' or a https:// link ('' = photo only).
                              // Keep it short, muted, under ~8 MB. The photo above is the fallback.
    videoMobile: '',          // optional smaller video for phones (720p, ~3-6 MB). '' = phones use the main video.
  },

  // ── About ─────────────────────────────────────────────────────────────────
  about: {
    portrait: 'images/portrait.jpg',
    portraitAlt: 'James Fuller performing live',
    pullQuote: '"Write it honest. Play it like you mean it."',
    headingTop: 'Honest Songs,',
    headingEm: 'Played From the Heart',
    bios: [
      'James Fuller writes songs about the people, places, and small moments that make a life — the kind of songs that sound better the second time you hear them.',
      'Whether it is a quiet room with an acoustic guitar or a full stage with the band behind him, a James Fuller show is about connection: a good story, a good melody, and a crowd singing along by the last chorus.',
      'New music is on the way. Follow along for show announcements, behind-the-scenes clips, and first listens.',
    ],
    stats: [                  // three little badges under the bio
      { value: 'Original',  label: 'Songwriter' },
      { value: 'Live',      label: 'Performer' },
      { value: 'New Music', label: 'Coming Soon' },
    ],
  },

  // ── Music / streaming ─────────────────────────────────────────────────────
  music: {
    spotifyArtistId: '',      // the ID at the end of the artist's Spotify URL ('' hides the player)
    appleMusicUrl: '',
    blurb: 'Stream James Fuller on your favorite platform and press play.',
  },

  // ── Shows ─────────────────────────────────────────────────────────────────
  shows: {
    note: 'Follow along on social media for the latest show announcements.',
    poster: 'images/tour-poster.jpg',
    posterAlt: 'Live music calendar',
    // month: 'Jul' (or 'TBA'), day: '04' (or '—'). Past dates hide themselves.
    list: [],                 // no placeholder dates — add real shows in Admin → Shows
  },

  // ── Photo gallery ─────────────────────────────────────────────────────────
  gallery: [
    { src: 'images/gallery-1.jpg', label: 'Stage Shot' },
    { src: 'images/gallery-2.jpg', label: 'On Stage' },
    { src: 'images/gallery-3.jpg', label: 'Crowd' },
    { src: 'images/gallery-4.jpg', label: 'Studio' },
    { src: 'images/gallery-5.jpg', label: 'Close-Up' },
    { src: 'images/gallery-6.jpg', label: 'Outdoor Show' },
  ],

  // ── Featured video ('' youtubeId removes the whole Videos section) ────────
  video: {
    youtubeId: '',            // e.g. the "ghy_0dAmHb4" in youtube.com/watch?v=ghy_0dAmHb4
    title: 'Live From the Stage',
    paragraphs: [
      'A live moment, a new song, or a look behind the scenes — straight from James.',
      '',                      // optional second paragraph
    ],
  },

  // ── Social links ('' hides the icon everywhere) ───────────────────────────
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    spotify: '',
    tiktok: '',
  },

  // ── Contact form ──────────────────────────────────────────────────────────
  contact: {
    email: 'band@example.com',   // fallback mailto + error message
    formspreeId: '',             // formspree.io form ID so inquiries land in the band's inbox
  },

  // ── Colors (near-black with olive blocks and pale lime-cream text). Hex only. ─────────────────────
  theme: {
    bg:     '#151515',   // page background
    bg2:    '#050505',   // alternate section background
    bg3:    '#212713',   // cards / inputs (dark olive)
    gold:   '#edffc6',   // main accent (pale lime-cream)
    goldLt: '#f7ffe0',   // accent hover / highlights
    amber:  '#843fbd',   // secondary accent (purple)
    cream:  '#edffc6',   // headings / bright text
    text:   '#cedfa9',   // body text
    dim:    '#a1ae84',   // muted text
  },
};
