# ARCHIVE_LOG

Running log of every item **hidden, archived, or added** during the
`website-rework-2026-06` branch. **Nothing is ever deleted** — every "removal"
below is a reversible *hide* (an HTML comment wrapper with `ARCHIVED-BEGIN` /
`ARCHIVED-END` markers). To restore an item, delete the wrapping comment
markers around its block; the original markup is intact inside.

All data records, images, videos, decks, and detail pages remain in the repo.

---

## Hidden / archived items

### 1. DetectaChem — hidden everywhere
- **What:** DetectaChem project card.
- **Where:**
  - `index.html` — High-Value Partnerships section (`#track-record`), marker `ARCHIVED-BEGIN: detectachem`.
  - `portfolio.html` — Active projects grid, marker `ARCHIVED-BEGIN: detectachem`.
- **When:** 2026-06
- **Why:** Client request — remove from view in both the spotlight/partnerships section and the full-portfolio page.
- **Retained:** `projects/detectachem.html`, `assets/portfolio/DetectaChem.jpg`. All copy preserved inside the comment.
- **Restore:** In each file, delete the `<!-- ARCHIVED 2026-06 ... -->`, `<!-- ARCHIVED-BEGIN: detectachem` and `ARCHIVED-END: detectachem -->` lines surrounding the card.

### 2. Park Plaza Hospital — hidden everywhere
- **What:** Park Plaza Hospital project card.
- **Where:**
  - `index.html` — High-Value Partnerships section (`#track-record`), marker `ARCHIVED-BEGIN: park-plaza`.
  - `portfolio.html` — Active projects grid, marker `ARCHIVED-BEGIN: park-plaza`.
- **When:** 2026-06
- **Why:** Client request — remove from view in both sections.
- **Retained:** `projects/park-plaza.html`, `assets/portfolio/Park_Plaza_Hospital.jpg`. Leo Womack's biography on `index.html` still references Park Plaza Hospital (biographical, intentionally kept).
- **Note:** The Park Plaza card on `portfolio.html` contained an inner `<!-- TODO -->` comment; it was converted to a bracketed `[ARCHIVED-NOTE: ...]` so the outer comment wrapper stays valid. Restore that to an HTML comment if desired when un-archiving.
- **Restore:** In each file, delete the surrounding `ARCHIVED-BEGIN: park-plaza` / `ARCHIVED-END: park-plaza` comment markers.

### 3. "The Legacy of Ramsey Financial Group" video placeholder — hidden
- **What:** Media card `m-1` (placeholder play button, not a real video).
- **Where:** `index.html` — Media section (`#media`), marker `ARCHIVED-BEGIN: media-legacy-video`.
- **When:** 2026-06
- **Why:** Client request — it is not a real video; hide the placeholder until a real speech URL exists.
- **Retained:** The two real video embeds (`m-2`, `m-3`) remain live.
- **Restore:** Delete the surrounding `ARCHIVED-BEGIN: media-legacy-video` / `ARCHIVED-END: media-legacy-video` comment markers.

### 4. RSE (data centers) — scaffolded but kept OFF
- **What:** Placeholder card for RSE (data centers), inside High-Value Partnerships.
- **Where:** `index.html` — `#track-record` grid, marker `ARCHIVED-BEGIN: rse-data-centers`, `data-archived="true"`.
- **When:** 2026-06
- **Why:** Pending Megan's yes/no. Created hidden so it can be flipped on instantly if approved.
- **Copy:** All fields are `{{PENDING — MEGAN}}` placeholders awaiting real content.
- **Restore (enable):** Delete the surrounding `ARCHIVED-BEGIN: rse-data-centers` / `ARCHIVED-END: rse-data-centers` markers, set `data-archived="false"`, and fill the `{{PENDING}}` copy. Do NOT enable without Megan's approval.

---

## Added items

### A. Yo-Yo Dyne — moved into High-Value Partnerships + dedicated detail page
- **What:** Yo-Yo Dyne entry (AeroShade + Escape Pod).
- **Added files:** `projects/yoyodyne.html` (expanded detail page, built from the
  `karman-line.html` template; relative paths `../assets/...`, `../index.html`,
  `../portfolio.html` already correct).
- **Cards added / updated (additive — nothing deleted):**
  - `index.html` — new `track-card` in High-Value Partnerships (`#track-record`),
    after the Gulf Equities / Deep Space cards, linking to `projects/yoyodyne.html`.
    (Replaced an interim inline placeholder panel built earlier the same day; the
    full AeroShade + Escape Pod write-up now lives on the detail page.)
  - `portfolio.html` — existing Yo-Yo Dyne card re-pointed from `href="#"` to
    `projects/yoyodyne.html` and copy aligned to the two-product framing.
- **When:** 2026-06
- **Pattern note:** Yo-Yo Dyne intentionally appears in BOTH the homepage
  High-Value Partnerships section and `portfolio.html`, mirroring Gulf Equities.
- **Logos added (2026-06):** real brand assets now in `assets/portfolio/` —
  `yoyodyne-logo.jpg`, `aeroshade-logo.jpg`, `escape-pod-logo.png`. Wired into the
  Yo-Yo Dyne page header (`.page-logo`), both product sections (`.product-logo`),
  the homepage High-Value Partnerships card, and the portfolio card (replacing the
  `Spacefund.jpg` / "Image pending" placeholders).
  - **Note:** the supplied Escape Pod file was a portrait doc-page (logo + document
    text + white margins); it was cropped to a centered 640×640 square to isolate the
    logo mark. The uncropped original remains in the user's `~/Downloads`.
- **Still pending:** `[TBC]` glance values (Vehicle, Lead Principal) and `Request Deck`
  mailto links on `projects/yoyodyne.html` are left as-is.

---

## Renamed (recoverable via comments + git history)

### Section 2 heading: "Proven Track Record / The bets that worked." → "High-Value Partnerships."
- **Where:** `index.html` `#track-record` section head.
- **When:** 2026-06 (Task 2). Old eyebrow + heading preserved in adjacent comments.
- **Note:** The section `id="track-record"` was intentionally **kept** — it is an
  invisible anchor slug referenced by the nav and by every project-page breadcrumb
  / back-link (~40 references). Only the visible labels changed.

---

## Greppable placeholders awaiting content

Search the repo for these tokens to find everything that still needs filling:

| Token | Meaning | Locations |
|---|---|---|
| `{{PENDING — MEGAN}}` | awaiting Megan | Celestial/Eden/Ahura/Deep-Space glance Vehicles; RSE scaffold copy; NovaSpark + Iran status notes; Yo-Yo Dyne homepage card pending image note |
| `{{PENDING — RAMSEY}}` | awaiting Ramsey | Gulf Equities glance (Vehicle + Lead Principal, + write-up) |
| `{{CONFIRM}}` | value present, verify it | Eden Grow Lead Principal (Space Fund); Ahura AI Lead Principal (Bryan Tallebi) |
| `{{PENDING}}` | generic pending | RSE scaffold stage |
| `[TBC]` | legacy "to be confirmed" | remaining glance rows on other project pages (pre-existing) |
| `TODO (Holiday)` | deferred to Holiday | featured cap-6 logic (`portfolio.html`); mailto optimization (`index.html`) |

**Featured six (Task 11):** not locked in — every visible portfolio card carries
inert `data-featured="pending"`. Holiday implements the cap-6 selection once Megan
confirms; flip the chosen six to `data-featured="true"`. Do not hard-code.

**Active-raise status (Tasks 7/8):** every card carries inert
`data-active-raise="pending"`; designation awaits Megan. NovaSpark is the flagged
candidate (`data-raise-candidate="true"`) for the front-page 6th raise slot.

---

## How to restore any hidden item in one step

Each hidden block is wrapped like:

```
<!-- ARCHIVED 2026-06 (reason) -->
<!-- ARCHIVED-BEGIN: <slug>
   ...original markup...
ARCHIVED-END: <slug> -->
```

To restore: delete the three marker lines (`ARCHIVED 2026-06 ...`,
`ARCHIVED-BEGIN: <slug>`, and `ARCHIVED-END: <slug> -->`). The markup between them
becomes live again. Slugs: `park-plaza`, `detectachem`, `media-legacy-video`,
`rse-data-centers`.

**Nothing was deleted.** All changes live on branch `website-rework-2026-06` and
are recoverable via `git` history regardless of the comment markers.

---

## 2026-06 — NovaSpark Energy promoted to the 6th active raise

- **What:** NovaSpark Energy moved from "candidate" to a live active raise.
- **Homepage (`index.html`, active-raises grid):**
  - The "Sixth raise — to be confirmed" `raise-tbd` placeholder card was **commented
    out** (not deleted), wrapped in `ARCHIVED-BEGIN: raise-tbd` / `ARCHIVED-END: raise-tbd`
    markers for easy restore.
  - A real **NovaSpark Energy** raise card was inserted in that slot, linking to
    `projects/novaspark-energy.html` (tag "Energy · Hydrogen", stage "Seed").
- **Portfolio (`portfolio.html`):** the `port-novaspark` card now carries
  `data-active-raise="true"`; `data-featured="pending"` (front-page featured selection
  is a separate Megan call). Card stays in the portfolio.
- **NovaSpark page (`projects/novaspark-energy.html`):** finalized for go-live —
  removed the "Page in development" pill; Stage `Active` → `Seed`; Sector
  `Energy · Atmospheric` → `Energy · Hydrogen`; At-a-Glance Vehicle `[TBC]` →
  `Convertible Note`, Lead Principal `[TBC]` → `Meagan Crawford`. Request Deck mailto
  left as-is.

- **Restore the TBD placeholder:** delete the `ARCHIVED 2026-06 ...`,
  `ARCHIVED-BEGIN: raise-tbd`, and `ARCHIVED-END: raise-tbd -->` marker lines in
  `index.html`, and remove/relocate the NovaSpark raise card.

---

## 2026-06 — Presentation cleanup pass

### Placeholder marker convention (normalized)

Visitor-facing pages must never render raw template tokens (`{{…}}`, `[TBC]`).
Instead, "At a glance" rows that are still awaiting a value use a friendly display
plus **one machine-readable marker**: a `data-pending` attribute on the `.row` div.

| `data-pending` value | Meaning | Replaces the old token | Displayed text |
|---|---|---|---|
| `megan` | awaiting Megan | `{{PENDING — MEGAN}}`, `[TBC]` | "To be confirmed" |
| `confirm-megan` | real value shown, Megan to confirm | `… {{CONFIRM}}` suffix | the bare value (e.g. "Space Fund", "Bryan Tallebi") |
| `ramsey-writeup` | awaiting Ramsey's write-up | `{{PENDING — RAMSEY}}` | "To be confirmed" |

**To fill a pending value:** replace the displayed text with the real value and
**remove the `data-pending` attribute** from that row. To find everything still
outstanding, grep the repo for `data-pending`.

### "Page in development" pill
- The `pill-status` "Page in development" badge was commented out on the 9 populated
  project pages (restore by uncommenting). It was **left in place** on the two genuine
  stubs whose body copy still says content is coming later: `tbd.html`, `space-fund.html`.
