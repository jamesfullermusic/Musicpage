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
    url: 'https://www.example.com',           // final domain, no trailing slash
    title: 'James Fuller — Genre · City',        // browser tab + link previews
    siteName: 'James Fuller Music',
    description: 'James Fuller — a short one-sentence description for Google.',
    shareDescription: 'Genre · Genre · Original Music.',   // shown in iMessage/Facebook previews
    favicon: '/favicon.svg',
    ogImage: 'images/og-preview.png',         // 1280×720 PNG/JPG for link previews ('' to skip)
    footerNote: 'Built with heart in Your State',  // small line in footer ('' to hide)
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
  // Videos also needs video.youtubeId below.)
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
    tagline: '"Your tagline goes here"',
    genre: 'Genre · Genre · Original Music',
    background: 'images/hero-bg.jpg',
  },

  // ── About ─────────────────────────────────────────────────────────────────
  about: {
    portrait: 'images/portrait.jpg',
    portraitAlt: 'James Fuller performing live',
    pullQuote: '"A short quote or motto."',
    headingTop: 'A Sound Built',
    headingEm: 'From the Ground Up',
    bios: [
      'First bio paragraph. Where they are from, how they started, what they sound like.',
      'Second paragraph. What a live show feels like and who they play for.',
      '',                      // optional third paragraph ('' to hide)
    ],
    stats: [                  // three little badges under the bio
      { value: 'Your State',  label: 'Home State' },
      { value: 'Self-Taught', label: 'Guitar & Voice' },
      { value: 'Original',    label: 'Songwriter' },
    ],
  },

  // ── Music / streaming ─────────────────────────────────────────────────────
  music: {
    spotifyArtistId: '',      // the ID at the end of the artist's Spotify URL ('' hides the player)
    appleMusicUrl: '',
    blurb: 'Our music is streaming everywhere. Pick your platform and press play.',
  },

  // ── Shows ─────────────────────────────────────────────────────────────────
  shows: {
    note: 'Follow us on Facebook and Instagram for the latest show announcements.',
    poster: 'images/tour-poster.jpg',
    posterAlt: 'Live music calendar',
    // month: 'Jul' (or 'TBA'), day: '04' (or '—'). Past dates hide themselves.
    list: [
      { month: 'Jul', day: '04', venue: 'Example Festival', location: 'City, State · Outdoor Stage', tag: 'Festival', url: '' },
      { month: 'TBA', day: '—',  venue: 'Example Venue',    location: 'City, State · Live Venue',    tag: 'Venue',    url: '' },
    ],
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
    title: 'Song Title',
    paragraphs: [
      'A couple of sentences about the video.',
      '',                      // optional second paragraph
    ],
  },

  // ── Social links ('' hides the icon everywhere) ───────────────────────────
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    spotify: '',
  },

  // ── Contact form ──────────────────────────────────────────────────────────
  contact: {
    email: 'band@example.com',   // fallback mailto + error message
    formspreeId: '',             // formspree.io form ID so inquiries land in the band's inbox
  },

  // ── Colors (dark near-black with pale lime-cream text). Hex only. ─────────────────────
  theme: {
    bg:     '#151515',   // page background
    bg2:    '#050505',   // alternate section background
    bg3:    '#212713',   // cards / inputs
    gold:   '#edffc6',   // main accent (pale lime-cream)
    goldLt: '#f7ffe0',   // accent hover / highlights
    amber:  '#843fbd',   // secondary accent (purple)
    cream:  '#edffc6',   // headings / bright text
    text:   '#cedfa9',   // body text
    dim:    '#a1ae84',   // muted text
  },
};
