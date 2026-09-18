# Handoff

## Stack

Vite + React + TypeScript + plain CSS (custom properties for tokens). No backend, no wallet integration, no UI framework. Only runtime dependencies: `react`, `react-dom`, `@fontsource/space-grotesk` (self-hosted font, no external font requests).

Run it:

```
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## 1. Fill in real content — `src/config/site.ts`

This is the single source of truth. Every string and link on the page reads from here — nothing is hardcoded elsewhere. Currently every field is set to an explicit development placeholder (visible on the page as literal placeholder text, e.g. "PROJECT NAME PLACEHOLDER") or `null`.

Set each field to the real value:

| Field | Currently | What happens when set |
|---|---|---|
| `projectName` | placeholder text | Shown in header wordmark, footer, and browser tab title |
| `tokenTicker` | `null` | `null` hides the ticker badge next to the wordmark; a string shows it |
| `headline` | placeholder | Hero H1. Use `\n` inside the string for a manual line break |
| `description` | placeholder sentence | Supporting sentence under the CTA |
| `telegramUrl` | `null` | `null` renders a disabled "Telegram link not provided" state instead of the CTA — **set this first**, it's the entire point of the page |
| `twitterUrl` | `null` | `null` renders a dimmed, non-clickable "X" icon in the header |
| `chartUrl` | `null` | `null` renders a dimmed, non-clickable "Chart" icon in the header |
| `contractAddress` | `null` | `null` shows "Contract address not provided" and disables the copy button |
| `network` | `null` | `null` hides the network badge next to the "Contract address" label |

No other file needs editing for content changes. `index.html`'s `<title>` and `<meta description>` are static fallbacks for pre-JS crawlers/previews — update those two lines to match once the real project name and description are set (the in-page `<title>` is already set dynamically from `site.ts` at runtime).

## 2. Add the real mascot artwork

**No screenshot or reference image was ever received in this conversation** — the build could not use it as a pose/personality reference. What's shipped instead is an explicit, labeled placeholder (`src/components/MascotPlaceholder.tsx`): a dashed-border box reserving the correct aspect ratio and pointing direction, with visible text identifying it as missing artwork. This is intentional — the instructions were explicit that a substitute mascot must not be drawn from CSS/emoji/SVG, so no fake character was invented.

To integrate the real artwork:

1. Export two transparent PNGs or WebP/AVIF files from the source art:
   - **Desktop**: portrait orientation, roughly 4:5 aspect ratio, character pointing right, face/leaf/hand/fingertip fully preserved, safe margin so nothing critical is cropped.
   - **Mobile**: landscape orientation, roughly 5:4 aspect ratio, character pointing down or diagonally down, same preservation rules.
2. Drop them in `src/assets/mascot/` (e.g. `mascot-desktop.webp`, `mascot-mobile.webp`).
3. In `src/components/Hero.tsx`, replace the two `<MascotPlaceholder variant="..." />` usages with `<img>` tags pointing at the real files, e.g.:
   ```tsx
   <img
     src={mascotDesktop}
     width={960}
     height={1200}
     alt=""
     className="hero__mascot-img"
   />
   ```
   Set explicit `width`/`height` matching the real asset's intrinsic aspect ratio to prevent layout shift — swap the placeholder's `aspect-ratio` CSS for the image's natural ratio if it differs from 4:5 / 5:4.
   Use `alt=""` since the mascot is decorative next to a text headline that already carries the meaning — if the mascot ever needs to convey standalone meaning, give it a real `alt`.
4. Delete `src/components/MascotPlaceholder.tsx` and its CSS block (`.mascot-placeholder*` in `src/App.css`) once both images are wired in.
5. Replace `public/favicon.svg` (currently a plain two-tone circle) with a simplified mark derived from the real brand/mascot if desired.

## 3. What was verified

- Production build (`npm run build`) completes cleanly, no TypeScript errors.
- Rendered and screenshotted at 320, 375, 390, 768, 1024, 1440px, plus a 844×390 mobile-landscape check — no horizontal overflow at any width, CTA never clipped, no element collisions.
- Content height stays compact: ~1065px at 1440×900 and ~892px at 1024×768 (a little over one screen, no forced full-viewport stretch, no dead space forced above the footer).
- Tested with sample values temporarily filled into every config field (then reverted to placeholders): header links resolve to the configured URLs with `target="_blank" rel="noopener noreferrer"`, the CTA becomes a real enabled link, the copy button copies the complete address to the clipboard (verified via clipboard read-back, not just the success UI), and the mobile view abbreviates the address visually while still copying the full string.
- Keyboard: tab order is header links → CTA → copy button; the CTA shows a visible offset focus ring on `:focus-visible`.
- `prefers-reduced-motion: reduce` collapses all animation/transition durations to effectively zero — verified via computed style, not just the CSS rule's presence.
- 200% root font-size (approximates 200% browser zoom) introduces no horizontal overflow.
- No console errors at any tested viewport.

## 4. What was not verified (no tooling available)

- No real screen-reader pass (NVDA/VoiceOver) — the accessible names, `aria-label`s, and `aria-live` copy-feedback region are implemented and reasoned through, but not listened to.
- No Lighthouse/axe audit run.
- Real mascot artwork's effect on the composition (spacing, glow position, actual pointing alignment) can't be judged until the real images replace the placeholders — re-check the gesture-to-CTA alignment once they're in, per the placeholder's implied pose.

## Known placeholder → real-value checklist

- [ ] `projectName`
- [ ] `tokenTicker` (or leave `null` if the project has none)
- [ ] `headline`
- [ ] `description`
- [ ] `telegramUrl` (required — this is the page's entire purpose)
- [ ] `twitterUrl`
- [ ] `chartUrl`
- [ ] `contractAddress`
- [ ] `network`
- [ ] `index.html` `<title>` / `<meta description>`
- [ ] Desktop mascot artwork (pointing right)
- [ ] Mobile mascot artwork (pointing down)
- [ ] Favicon (optional — current one is a neutral placeholder mark)
