# Band Website Template

A fast, single-page band site: hero, about, streaming links, shows, photo gallery, featured video,
social links and a contact form — plus a built-in **Admin panel** the band uses to update shows,
text and photos themselves (no code, no GitHub).

Everything band-specific lives in **one file: `band.config.mjs`**.

---

## Part 1 — Setting up a new band (≈ 1–2 hours)

**The band owns the accounts. You get collaborator access.**

1. **Band creates accounts** (you can screen-share): a GitHub account, then a Vercel account using
   *Continue with GitHub*.
2. **Create their repo from this template.** On the template repo click *Use this template →
   Create a new repository*, with the band's GitHub account as owner (or create it in yours and
   transfer it). Then *Settings → Collaborators* → add yourself.
3. **Fill in `band.config.mjs`** and drop their photos into `/images` (names must match the config).
   Replace `images/og-preview.png` (1280×720) and `favicon.svg`. Commit and push.
4. **Deploy:** in Vercel → *Add New → Project* → import the repo → *Deploy*.
   (Framework preset: **Other**. `vercel.json` already sets the build command and output folder.)
5. **Turn on storage** (this is what lets the Admin panel save): Vercel project → *Storage* tab →
   add a **KV / Redis** store (via the Upstash Redis marketplace option) and a **Blob** store, and
   connect both to the project. Vercel adds the environment variables automatically.
   *Already have a Redis database elsewhere (e.g. Redis Cloud)?* Skip the KV store and instead add an
   environment variable `REDIS_URL` = `redis://default:PASSWORD@HOST:PORT` (Settings → Environment
   Variables). Keep that URL out of the repo. Still add the Blob store for photos.
6. **Set the admin password:** Project → *Settings → Environment Variables* → add `ADMIN_PASS`
   with a password for the band (all environments). **Redeploy** afterwards.
   The admin refuses to work until this is set — there is no default password.
7. **Contact form:** the band creates a free form at formspree.io, then pastes the Form ID into
   Admin → Content (or `contact.formspreeId` in the config).
8. **Domain:** the band buys or connects one under Project → *Settings → Domains*; set `site.url`
   in the config to match and push.

### Using the Admin panel
Go to `https://their-site.com/#admin` and enter `ADMIN_PASS`. Tabs: **Shows**, **Content** (top-banner text, bio,
social links, Spotify / Apple Music / YouTube links, form ID, contact email), **Photos** (upload and
crop, plus the hero video), **All Text** (every other word on the page: menu labels, headings, buttons,
paragraphs, footer — edit and Save), **Sections** (switch whole sections on/off). Changes go live immediately.
**Easiest way to edit text:** log in, press **✎ Edit on the page**, then click any text on the real page and type.
Press **Save changes** (menu labels, headings, buttons, bios, footer — everything). The shortcut pills on the page
jump to the photo, show-date and link editors, and each section has an on/off pill.

> Admin saves override the defaults in `band.config.mjs`. If you later edit the config text and
> nothing changes on the live site, that's why — use the Admin panel (Content → *Reset to
> Defaults* clears their saved text) or clear the stored value in the Vercel KV browser.

---

## Part 2 — Local preview

```bash
npm install
npm run preview      # builds into /public and serves it
```
The Admin panel only works on the deployed site (or with `npx vercel dev`), because it talks to
`/api/*`.

## How it works
- `index.template.html` — the page, with `{{tokens}}` for everything band-specific.
- `band.config.mjs` — the values. `scripts/build.mjs` fills the template and writes `public/`.
  Doing it at build time means link-preview tags (iMessage, Facebook) are correct.
- `api/` — tiny serverless functions: `auth` (password check), `data` (read/write shows, text,
  photos in KV), `upload` (photo upload to Blob).
- Empty values hide things: no `youtubeId` removes the Videos section, empty social URLs hide
  those icons, no Spotify ID hides the player.

## Changing the look
- **Colors:** `theme` in the config.
- **Hero video:** set `hero.video` in the config (a path in `/images` or a https link), or upload / paste a link in
  Admin → Photos → Hero Video. Muted, looping; the hero photo is the fallback. The admin can upload a video file
  directly (up to 200 MB) to your Blob store; keep it short and compressed (ideally under ~10 MB).
- **Fonts:** Afacad (Google Font), loaded in `index.template.html`. Swap the `<link>` and search the
  file for `Afacad` to change it.
- **Layout/sections:** edit `index.template.html` directly.

## Before you hand it off — checklist
- [ ] `band.config.mjs` has no leftover placeholder text ("Band Name", "example.com", "Your State")
- [ ] All `images/` replaced, `og-preview.png` + `favicon.svg` replaced
- [ ] `site.url` matches the real domain
- [ ] KV + Blob connected, `ADMIN_PASS` set, redeployed, `/#admin` login works
- [ ] Upload a test photo and add a test show in Admin, then delete them
- [ ] Contact form sends a real test message to the band's inbox
- [ ] Band is the *owner* of the GitHub repo and Vercel project; you're a collaborator
- [ ] Heads-up given about Vercel's Hobby plan (non-commercial use only; Pro is required if the
      site sells anything or earns money)
