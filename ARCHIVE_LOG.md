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
- **Pending placeholders preserved:** logo `<img>` line is commented out in
  `projects/yoyodyne.html` (`../assets/portfolio/yoyodyne-logo.png`); card images
  use `assets/portfolio/Spacefund.jpg` as a temporary placeholder; `[TBC]` glance
  values and `Request Deck` mailto links left as-is.
