# Ramsey Financial Group — Website Remediation Task List

**Source:** RFG Website Review meeting, Tue May 19, 2026
**Participants:** Logan Carpenter, Meagan Crawford, Bart Womack, Leo Womack
**Repo:** https://github.com/carpenterlogan3-hub/ramseyfg-website
**Goal:** Get website to near-publishable state (target release: early next week per Meagan)

---

## How to use this document

Each task below is self-contained and copy-paste ready for Claude Code. The format is:

- **Task ID & Title** — what to do
- **Source** — timestamp/quote from the transcript so you can verify intent
- **Claude Code prompt** — exact text to paste into Claude Code
- **PR title suggestion** — for GitHub

I've grouped tasks by section of the site so you can batch related PRs. Tackle them in roughly the order shown (top-down through the site), but each one is independent so feel free to reorder.

Items marked **[BLOCKED]** require an asset/info you don't have yet — skip and circle back.

---

## Phase 0 — Orientation (do this first in Claude Code)

### Task 0.1 — Have Claude Code map the repo

**Prompt:**
```
Please give me a tree view of this repo (excluding node_modules, .git, dist, build).
Then identify:
1. The main entry point (index.html or framework root)
2. The location of the home/landing page content
3. Where the portfolio/projects section lives
4. Where team/bio content lives
5. Where the footer / contact info lives
6. Any data files (JSON, YAML, MD) that drive portfolio content
7. The asset/image directory

Output a short summary I can reference as we work through edits. Don't change anything yet.
```

---

## Phase 1 — Home Page: Top-of-page fixes

### Task 1.1 — Fix reversed video captions

**Source:** *3:10 Logan: "on the videos, you have the captions reversed."* — confirmed at 28:08 Meagan: *"that was the event that the videos that are on the front of the web page are from that event."*

**Prompt:**
```
On the home page there are two videos near the top with captions/labels underneath them.
The captions are currently swapped — they're attached to the wrong videos.
Please locate the video block on the home page, identify the two captions,
and swap them so each caption matches the correct video.
Show me the diff before committing.
```

**PR title:** `fix(home): swap reversed video captions on hero videos`

---

### Task 1.2 — Remove red text / replace with theme color

**Source:** *3:56 Meagan: "That red is a little hard to read."* *4:00 Logan: "I'm going to fix it, get rid of the red."*

**Prompt:**
```
In the "Beyond Venture Capital" / Space Capital Stack section near the top of the
home page, there is red text that's hard to read. Find any element styled red
(check inline styles, CSS classes containing "red", color: red, #ff0000, #cc0000,
text-red-*, etc.) in that section.

Replace the red with the site's primary brand color (likely a dark navy or the
heritage gold — check the existing palette and pick the one already used for
emphasis elsewhere on the page). Make the link still visually distinct but
accessible (WCAG AA contrast).

Show me the before/after and what color you chose.
```

**PR title:** `fix(home): replace hard-to-read red text with brand color`

---

### Task 1.3 — Consolidate Space Capital Stack section (don't duplicate on home)

**Source:** *4:17–5:11 Meagan/Logan:* The Space Capital Stack is on its own dedicated portfolio page and is also shown twice on the home page. Decision: keep ONE snapshot on home with a "Read the paper" link, drop the duplicate.

**Prompt:**
```
On the home page, the Space Capital Stack content currently appears twice
(it scrolls back up to the capital stack info, then later there's another
section about Beyond Venture Capital).

Please:
1. Identify both occurrences of Space Capital Stack content on the home page.
2. Remove the duplicate / second instance.
3. Keep one consolidated snapshot block that includes:
   - A brief teaser headline + 1-2 sentence summary
   - A "Read the paper" call-to-action button/link that points to the
     Beyond Venture Capital white paper (already hosted — check /docs, /assets,
     or /pdfs directory for it, or it links to the dedicated capital stack page)
4. The full detailed capital stack page should remain unchanged — only the
   home page is being de-duplicated.

Show me the diff before committing.
```

**PR title:** `refactor(home): consolidate Space Capital Stack into single snapshot with paper link`

---

## Phase 2 — Team / Bios section

### Task 2.1 — Shorten bios on home page, link out to full bios

**Source:** *5:31 Meagan: "Is there a way to shorten those and then have the link to the full bio?"* *5:45 Logan: "Paragraph, snapshot, then expansion option to full bio."*

**Prompt:**
```
In the team / bios section on the home page, each team member currently has
a full multi-paragraph bio displayed inline.

Please refactor so that:
1. The home page shows only the first paragraph of each bio (or first 3-4
   sentences if the first paragraph is very short).
2. Add a "Read full bio" link at the end of each shortened bio.
3. The link should either:
   (a) expand the full bio inline (collapse/expand toggle), OR
   (b) navigate to a dedicated /team/[name] page
   Pick whichever pattern already exists in the codebase. If neither exists,
   use the inline expand/collapse approach (simpler, no routing changes).

Headshots stay as-is. Keep all existing bio content — just hide most of it
behind the expansion.

Show me which approach you're taking and the diff before committing.
```

**PR title:** `feat(team): shorten home-page bios with expandable full bio links`

---

### Task 2.2 — Style "Read full bio" links in green / underlined

**Source:** *5:50 Meagan: "if we could do the links in green or underlined or something so it's more obvious that that's what those are."*

**Prompt:**
```
Style the "Read full bio" links (and any similar inline expansion links across
the home page) so they're clearly recognizable as links:

- Color: green (use the site's existing green if there is one — check the
  Texas / heritage palette. Otherwise use a dark, accessible green like #2E7D32
  or #1B5E20 that passes WCAG AA against the page background)
- Underline: yes, either always or on hover (match whatever the site already
  does for hyperlinks)

Apply consistently to all "Read full bio" / "Read the paper" / similar
inline action links so users can easily spot them.

Show me the CSS change and a screenshot description before committing.
```

**PR title:** `style(links): make inline action links green and underlined for visibility`

---

### Task 2.3 — Link team members' LinkedIn profiles **[PARTIALLY BLOCKED]**

**Source:** *6:01 Logan: "the LinkedIn thing was getting everyone's LinkedIn's linked was the only like really hard thing that I might need to leverage Holiday's help for."*

**Prompt:**
```
In the team section, each team member should have a clickable LinkedIn icon
that opens their LinkedIn profile in a new tab.

For Meagan Crawford, the LinkedIn URL is:
https://www.linkedin.com/in/meagan/

For the other team members (Leo Womack, Bart Womack, etc.), add a LinkedIn
icon placeholder with href="#" and a data-todo="add-linkedin-url" attribute
so they're easy to find and update later.

All LinkedIn links should:
- Open in a new tab (target="_blank" rel="noopener noreferrer")
- Use the site's existing LinkedIn icon if one exists, otherwise use a
  standard SVG/font-awesome LinkedIn icon
- Be visually consistent (same size, same hover treatment)

Show me what icons/styling you found and the diff before committing.
```

**PR title:** `feat(team): add LinkedIn profile links with Meagan's live, others as placeholders`

> **Follow-up needed:** Get LinkedIn URLs for Leo, Bart, and any other team members from Meagan/Bart. Possibly leverage "Holiday" for assistance.

---

## Phase 3 — Portfolio / Projects section

### Task 3.1 — Move Gulf Equities into the "Proven Track Record" section, use Houston skyline image

**Source:** *7:44–8:34 Meagan: "if we want to put some at work and then we can highlight the Gulf equities... Yeah, and so if we could just move Gulf equities up to that things that worked section."* Bart had suggested the Houston skyline image for Gulf Equities.

**Prompt:**
```
Gulf Equities is currently in the full portfolio page. Please move it INTO the
"Proven Track Record" / "Things That Worked" section that's shown on the home
page (alongside the other proven track record items).

For the Gulf Equities entry:
- Use the Houston skyline image as the project image (check assets for
  "houston-skyline" or similar; if multiple, use the most prominent/wide one
  Bart had previously selected)
- Include a brief description (1-2 sentences). Use the existing Gulf Equities
  description from the full portfolio page if available, or use this:
  "Ramsey Financial Group manages a $100M portfolio of properties in and
  around Houston, with the majority located off the freeway in Baytown."
- Keep the Gulf Equities entry on the full portfolio page too — it should
  appear in BOTH places (proven track record AND full portfolio), unless
  the codebase has a shared data source — in which case just toggle a
  "featuredInTrackRecord: true" flag.

Show me the structure / data file approach before committing.
```

**PR title:** `feat(portfolio): feature Gulf Equities in Proven Track Record with Houston skyline`

---

### Task 3.2 — Add Deep Space Industries to Proven Track Record

**Source:** *14:02–14:17 Logan/Bart/Meagan: "Does Deep Space Industries fall into that proven track record section?" "I think so." "Deep Space Industries, proven track record."*

**Prompt:**
```
Add Deep Space Industries as an entry in the "Proven Track Record" section.

Description: Deep Space Industries was one of Meagan Crawford's exits. It was
an early space-resources / asteroid mining company that was acquired.

For now, add a placeholder entry with:
- Title: "Deep Space Industries"
- Tagline: "Exit — Space Resources / Asteroid Mining"
- Description: "An early-stage space resources company and a successful exit
  in Meagan Crawford's portfolio, acquired as the space economy matured."
- Image: use a generic space/asteroid image from existing assets, or add a
  TODO comment to swap in a proper logo/image once provided.

Mark image as TODO so it's findable later.

Show me the diff before committing.
```

**PR title:** `feat(portfolio): add Deep Space Industries to Proven Track Record`

---

### Task 3.3 — Move Ambrose Cell Therapy from Proven Track Record to CURRENT deals

**Source:** *7:24 Leo: "Ambrose is the current deal. It's not one that worked."* *7:35 Logan: "OK, I'll move that."*

**Prompt:**
```
Ambrose Cell Therapy is currently shown in the "Proven Track Record" section,
but it's actually a CURRENT deal, not a past success.

Please:
1. Remove Ambrose Cell Therapy from the Proven Track Record section.
2. Add it to the Current Deals / Active Portfolio section.
3. Keep the description and image as-is — just move the entry.
4. If you can find Logan's earlier write-up for Ambrose in the codebase
   (search for "Ambrose"), use that. Otherwise leave a TODO for the
   description.

Show me where it currently lives and where it's going before committing.
```

**PR title:** `fix(portfolio): move Ambrose Cell Therapy from Proven Track Record to Current Deals`

---

### Task 3.4 — Add Off-Earth Data to current portfolio

**Source:** *14:24 Meagan: "let's go ahead and add Off Earth Data because I just signed my contract with them. I have my equity fully vested now. So that is definitely a portfolio company."*

**Prompt:**
```
Add a new portfolio entry for "Off-Earth Data" in the current portfolio /
active investments section.

Placeholder content (mark all as TODO for refinement):
- Title: "Off-Earth Data"
- Status: Current portfolio company (Meagan Crawford holds vested equity)
- Description: TODO — request from Meagan, or extract from any deck if
  available in the repo's /docs or /pdfs directory
- Image: TODO — placeholder for now, add data-todo="off-earth-data-logo"
  on the image tag

Use the same card/template structure as other current portfolio companies
so it slots in cleanly.

Show me the diff before committing.
```

**PR title:** `feat(portfolio): add Off-Earth Data as current portfolio company (placeholder)`

> **Follow-up needed:** Get Off-Earth Data logo and description from Meagan.

---

### Task 3.5 — Remove "Successful Exits" duplicate section

**Source:** *13:32 Logan: "Successful exits. Do we want to have this section?"* *13:48 Meagan: "No, I think we kill that because we've got the section above about the successes."*

**Prompt:**
```
On the home page there's a section called "Successful Exits" that duplicates
the content already covered in the "Proven Track Record" / successes section.

Please remove the "Successful Exits" section entirely from the home page.
Don't lose any exit-specific content — verify each item is already
represented in the Proven Track Record section first. If anything would be
lost, surface it to me so I can decide.

Show me what items are in Successful Exits and confirm they all exist in
Proven Track Record before deleting.
```

**PR title:** `refactor(home): remove duplicate Successful Exits section`

---

### Task 3.6 — Remove "Previous Projects" section

**Source:** *14:39–15:14 Logan: "We've got this section of previous projects. I don't know where we landed on this and I don't know if we really need it."* *Meagan: "Yeah, I think we take that one off as well because again, we have that successes."* *Logan: "Do we want to take out all the information... we don't need to include any of this stuff for previous projects?"* *Meagan: "No."*

**Prompt:**
```
Remove the entire "Previous Projects" section from the home page, including
all of its content (project entries, images, descriptions). This is
intentional — Meagan confirmed it's redundant with the Proven Track Record
section.

Don't archive into a separate page — just delete. If there's a route or nav
item for "previous projects", remove that too.

Show me what's being removed before committing.
```

**PR title:** `refactor(home): remove redundant Previous Projects section`

---

### Task 3.7 — Update Yo-Yodyne entry: place in main portfolio, frame as aerospace & defense (Escape Pod focus)

**Source:** *11:19 Bart: "I want Yo-Yo Dine at the very bottom in its own thing because it's different..."* *11:27 Meagan: "No, let's not confuse it. It is a portfolio project. We can talk about the differences within the actual project itself."* *15:38 Meagan: "pop it up here."* *15:48 Meagan: "Yo-Yo Dine is... an aerospace and defense company whose first product is the escape pod. And then later we can add Aero Shade once that's ready for prime time."*

**Prompt:**
```
Yo-Yodyne (or "Yo-Yo Dine" — verify spelling used in the codebase) is
currently positioned at the bottom of the portfolio page as a separate /
distinct entry.

Please:
1. Move Yo-Yodyne UP into the main portfolio grid alongside the other current
   portfolio companies (Ahura AI, NovaSpark Energy, Iran Reconstruction Fund,
   Celestial Cellars, etc.). It should be a peer entry, not a special-cased
   section.
2. Update the description to:
   "Yo-Yodyne is an aerospace and defense company whose first product is the
   Escape Pod."
3. Do NOT include Aero Shade or other future products yet — those will be
   added once they're ready for prime time.
4. Keep the existing Yo-Yodyne image/logo.
5. Use the same card layout as other portfolio entries.

Show me the diff and where it now sits in the grid before committing.
```

**PR title:** `refactor(portfolio): integrate Yo-Yodyne into main portfolio grid, focus on Escape Pod`

---

### Task 3.8 — Remove "Ramsey REG A" from the platform

**Source:** *37:14 Meagan: "Oh, and remove Ramsey Reg A from the platform. Sorry, I just saw that."* *37:19 Logan: "And I think that I was supposed to do that."*

**Prompt:**
```
There is content on the website referencing "Ramsey Reg A" (likely a
Regulation A offering). Please:

1. Search the entire codebase (case-insensitive) for "Reg A", "RegA",
   "Regulation A", and "Ramsey Reg" to find all references.
2. Remove all mentions from the live pages (home, portfolio, capital stack,
   anywhere visible to users).
3. If it's a standalone page or route, remove the page and any nav links
   pointing to it.
4. If it's referenced in any data files (JSON/YAML/MD), remove those entries.

Surface every match you find before deleting so I can confirm nothing
important gets nuked.
```

**PR title:** `chore: remove Ramsey Reg A references from website`

---

### Task 3.9 — Fix distorted/sized images in portfolio (esp. Karman Line)

**Source:** *7:06–9:34 Logan: "this image kept getting distorted because of the panel sizing... it was just giving me a hard time with this image being sized right to fit in this space."* Plus the Karman Line / Spaceport Fund logo Meagan was sending separately.

**Prompt:**
```
Several portfolio card images are rendering distorted because the image
aspect ratio doesn't match the card's panel sizing.

Please:
1. Audit all portfolio card images. For each, check whether the CSS uses
   object-fit (should be `cover` or `contain` depending on whether it's a
   logo vs photo).
2. For LOGOS (transparent backgrounds, simple marks): use
   `object-fit: contain` with appropriate padding and a neutral background.
3. For PHOTOS / scenic images (Houston skyline, etc.): use
   `object-fit: cover` so they fill the card without distortion.
4. Add `aspect-ratio` rules to the card image container so the panels are
   consistently sized regardless of source image dimensions.
5. Pay specific attention to: Karman Line / Spaceport Fund (logo, needs
   contain), Houston Skyline / Gulf Equities (photo, needs cover),
   and any JFIF-format images that may need converting to JPG.

Show me which images you identified as problematic and the CSS change
before committing.
```

**PR title:** `fix(portfolio): normalize image rendering with object-fit and aspect-ratio`

---

### Task 3.10 — Convert any JFIF images to JPG

**Source:** *7:06 Logan: "It was giving me a hard time because some of them were JFIF files and it just jammed up on me."*

**Prompt:**
```
Some image assets are in .jfif format which doesn't render reliably across
browsers. Please:

1. Find all .jfif files in the repo (typically in /public, /assets, /static,
   or /images).
2. List them. For each, give me the bash/imagemagick command needed to
   convert to .jpg (e.g., `mogrify -format jpg *.jfif`).
3. Update all references in code/HTML/CSS/MD/JSON from .jfif to .jpg.
4. Delete the .jfif originals once .jpg versions exist and are referenced.

If you can run the conversion yourself, do it. Otherwise output the
commands and the list of references that need updating.
```

**PR title:** `chore(assets): convert JFIF images to JPG for broader compatibility`

---

### Task 3.11 — Add 6th active deal once confirmed **[BLOCKED]**

**Source:** *2:50 Logan: "I'm waiting on the sixth active race to be confirmed."* (likely "race" = transcription artifact for "deal")

> **Follow-up needed:** Confirm the 6th active deal with Bart. Don't action this task until that's confirmed. Likely candidate based on the project knowledge: CoreMedica or Manevo (see Task 7.4).

---

## Phase 4 — Portfolio details: descriptions

### Task 4.1 — Populate descriptions for all portfolio companies using existing decks

**Source:** *12:19 Logan: "we got Ahura AI, NovaSpark Energy, the Iran Reconstruction Fund, Celestial Sellers, and then incoming is Yo-Yo Don. I know that the previews are populated for all these, but what I'm going to do between now and tomorrow is make sure that they all have descriptions."* *12:54 Meagan: "hey, we send you a deck and you pop it into your AI and have the AI write a quick description for us."*

The project knowledge contains canonical descriptions for most of these. Below are the descriptions you can use directly (copy-paste these into the appropriate portfolio entry).

**Prompt to Claude Code:**
```
For each portfolio company listed below, find its detail page / data entry
in the codebase and ensure it has the following description (one-paragraph
preview shown on the card, plus the full description on the detail page).
If a description already exists, leave it unless mine is significantly
better.

Show me each before/after.

---
AHURA AI
---
Preview: Ahura AI transforms education by supporting learners exactly when
and how they need it. Adaptive intelligent systems deliver 3-5X faster
learning and up to 90% better retention.

Full: Ahura AI transforms education by supporting learners exactly when and
how they need it. Ahura makes intelligent systems that adapt to each
individual, resulting in unprecedented engagement, 3-5X faster learning,
and up to 90% better retention rates. This technology is being deployed for
workforce redevelopment and across the government for everything from
prisoner rehabilitation to training FBI agents on drone interception
protocols. The company is raising a $20M Series A round at a $100M
valuation, with $15M already committed. Funds will be used to fulfill
existing contracts (over $40M in revenue, year one) and execute on its
>$250M sales pipeline.

---
NOVASPARK ENERGY
---
Preview: NovaSpark delivers energy independence where it matters most —
mobile, atmospheric hydrogen systems providing hydrogen, power, and water
on demand.

Full: NovaSpark delivers energy independence where it matters most.
NovaSpark engineers mobile, atmospheric hydrogen systems that provide
hydrogen, power, and water on demand — eliminating supply chain
vulnerabilities and ensuring mission-ready performance in the most extreme
environments. First military contracts have been secured, and the first
commercial order has been secured. The company will open a Series A
funding round over the summer, with details to be determined.

---
IRAN RECONSTRUCTION FUND
---
Preview: A 92-million-person economy coming online for the first time in
half a century. A $1B fund targeting 5-7X returns over ten years through
banking, technology, and consumer-economy infrastructure.

Full: A 92-million-person economy is coming online for the first time in
half a century. Our Iranian-American founder — who immigrated at age 6,
was working at NASA by age 16, and has created over $3B in value for
investors across four technology startups — has been tapped to create a
technology, banking, and consumer packaged goods investment fund. By
focusing on creating a circular economy (digital-native banking powered by
local Airbnb, Uber, and Fiverr-type apps), as soon as the war ends we can
build a thriving economic engine targeting 5-7X returns for investors in
ten years. We are raising a $1B fund, with a $50M ticket size.

---
CELESTIAL CELLARS
---
Preview: Space-age technology has perfected wine. Using NASA-developed
plant-growing technology in partnership with Texas A&M, Celestial Cellars
enables continuous year-round wine production.

Full: Celestial Cellars developed a new way to grow grape plants by
utilizing the most advanced plant-growing technology in the universe —
technology created by NASA to grow food aboard the ISS and developed in
partnership with the world-leading horticulture department at Texas A&M
University. This allows complete control over all inputs and environmental
conditions, enabling continuous year-round production and effectively
bypassing the current climate change crisis affecting wine growing around
the world. The company is raising $500,000 on a $10M valuation to perfect
the growing methodology and begin commercialization.

---
AXE H2O
---
Preview: Solving the South Texas water crisis with 150 million gallons/day
of desalinated water. Texans helping Texans secure our water future.

Full: AXE H2O has been tasked by the President and the Governor of Texas
to address the South Texas water crisis. The aquifer serving Corpus
Christi and surrounding areas has been severely depleted (to less than 9%
capacity in critical segments) and is failing rapidly. This poses both a
national security threat — over 80% of the nation's aviation fuel is
refined in Corpus Christi — and a humanitarian crisis as nearly a million
people in South Texas approach Stage 4 water restrictions. AXE H2O delivers
150 million gallons per day of fresh, clean water from Gulf seawater
through desalination, paired with its own dedicated 95 MW natural-gas
microgrid for always-available power. First water in 12 months; full
capacity in 24 months. The 30-year payback period includes
inflation-adjusted quarterly dividends for early equity investors. Long-term
equity value exceeds $1B; currently raising $15M for 15% of the company.

---
KARMAN LINE / SPACEPORT FUND
---
Preview: Real estate at the intersection of space and infrastructure.
Workforce housing and shared facilities at Cape Canaveral and other US
spaceports — Fund I is $50M with a $30M anchor committed.

Full: Spaceports are necessarily in remote areas. As launch cadence
increases and spaceports are built worldwide, real estate in these remote
areas becomes extremely valuable when developed to meet the needs of the
growing space industry. Karman Line lives at the intersection of real
estate and space. Fund I is a $50M workforce housing fund focused on Cape
Canaveral and several other US spaceports, with a $30M anchor commitment
already in place. Fund II will follow, focused on raw land development for
infrastructure such as shared office space and co-working spacecraft labs.
Spaceport Fund: https://spaceportfund.com

---
EDEN FARMS COMMERCIAL REDEVELOPMENT
---
Preview: Up to 70% of commercial real estate sits empty. We redevelop
defunct controlled-environment space into year-round agricultural production
yielding >$15/sq ft for building owners.

Full: Up to 70% of commercial real estate currently sits empty. This
defunct controlled environment is ripe for redevelopment into controlled
environment agriculture. Basil is a year-round cash crop in high demand in
most US markets. Using only basil as the baseline, 20,000 sq ft of space
yields 16,000 lbs of basil per week at a market price of $14/lb — producing
up to $220,000 in weekly revenue. After expenses and profit share to Eden
Grow Systems, this results in >$15/sq ft in profit for building owners, for
space that is currently earning nothing. Seeking commercial real estate
partners who can commit $500,000 in capitalization and 20,000 sq ft of
vacant space in exchange for 60% of the profit.

---
WIMBERLEY CBD CULTIVATION VENTURES
---
Preview: NASA-spinoff farming technology applied to high-quality CBD hemp
cultivation in Wimberley, Texas. Year-2 net profit of $696,500. Raising
$50K for 10%.

Full: Using NASA spinoff farming technology, Wimberley CBD Cultivation
Ventures cultivates high-quality CBD hemp (industrial hemp containing no
more than 0.3% delta-9 THC) in a warehouse located on private land owned
by partners in Wimberley, Texas (Hays County). Net profit in year 2 is
$696,500. Seeking a $50,000 investment for 10% of the company.

---
GULF EQUITIES (in Proven Track Record — see Task 3.1)
---
Preview: A $100M portfolio of Houston-area properties, with the majority
located off the freeway in Baytown.

Full: Ramsey Financial Group manages a $100M portfolio of properties in
and around Houston, with the majority located off the freeway in Baytown.
Currently seeking partners that can help develop or liquidate these
properties.

---

If any entry already has a description, ask me before overwriting.
For any portfolio company NOT listed above that exists in the codebase,
flag it for me — I'll provide a description.

Show me which entries you updated and which had pre-existing content.
```

**PR title:** `content(portfolio): populate canonical descriptions for all portfolio companies`

---

### Task 4.2 — Add pitch decks as downloadable PDFs where available

**Source:** *13:20 Meagan: "we can even put the decks up there as downloadable PDFs in most cases."*

**Prompt:**
```
For portfolio companies that have a pitch deck PDF in the repo (check
/public, /docs, /assets, /pdfs), add a "Download Deck" or
"Download Pitch Deck" button/link on each portfolio company's detail page.

Pitch decks likely available based on the project's source materials:
- Axe H2O (Investment Opportunity Outline)
- Ahura AI
- NovaSpark Energy
- Iran Reconstruction Fund
- Celestial Cellars
- Karman Line / Spaceport Fund
- Wimberley CBD Cultivation
- Eden Farms / Basil business model
- Beyond Venture Capital (white paper — already linked elsewhere)

For each PDF found in the repo, link it from the matching portfolio entry.
For entries without a PDF on hand, add a "Request Deck" button that opens
an email to bart@ramseyrfg.com with subject:
"Ramsey RFG — Request Deck: [Company Name]"

(see Task 5.1 for the email subject-line convention.)

Show me the list of PDFs you found and which entries they map to before
committing.
```

**PR title:** `feat(portfolio): add downloadable pitch decks and request-deck mailto fallback`

---

### Task 4.3 — Add detailed write-ups for Park Plaza Hospital and Detecti-Chem **[PARTIALLY BLOCKED]**

**Source:** *6:18 Logan: "the original plan was that Leo was going to provide me a write-up on the Park Plaza Hospital."* *36:18 Logan: "I have the detective Kim [Detecti-Chem]."* *36:26 Bart: "It was a paragraph. Well, it was three sentences. It just gave an overview of the company."* *39:50 Logan: "for Detecti-Chem, Vehicle, Read Principal, Materials. I know I got the image in a three sentence description."* *40:10 Meagan: "we'll have to get Leo to fill these out really quickly. We can do that on the next call."*

**Prompt:**
```
Two Proven Track Record entries need write-up content:

1. PARK PLAZA HOSPITAL
   - Status: Park Plaza Hospital still exists, but RFG no longer owns it
     (per Bart: "Park Plaza is still there. We just don't own it.")
   - Description: TODO — Leo to provide
   - Vehicle, Read Principal, Materials: TODO — Leo to provide on next call
   - For now, add a placeholder entry in the Proven Track Record section
     with the title "Park Plaza Hospital", a TODO description, and
     data-todo="park-plaza-content" attribute so it's findable.

2. DETECTI-CHEM
   - Three-sentence overview already exists (Bart sent it to Logan)
   - Image already attached
   - Search the repo for "Detecti", "Detective Chem", "DetectiChem", and
     any associated image/description. If found, use it.
   - Vehicle / Read Principal / Materials fields: TODO
   - Add data-todo="detectichem-vehicle-readprincipal-materials" to make
     it findable later.

Both entries should appear in the Proven Track Record section. Don't
publish-block on these — placeholders with TODOs are fine for now.

Show me what existing content you found for each before committing.
```

**PR title:** `feat(track-record): scaffold Park Plaza Hospital and Detecti-Chem entries`

> **Follow-up needed:** Leo to provide Park Plaza Hospital description on next call. Vehicle/Read Principal/Materials fields for both.

---

### Task 4.4 — Add Space Capital Stack metrics

**Source:** *38:00 Logan: "what I will need from you Meagan is the metrics for the space projects for the stack. There was one section, space right here. There was metrics that I didn't need."* *38:29 Meagan: "Boom, that's on its way to you now."*

> **Follow-up needed:** Meagan emailed the space capital stack metrics. Check email for the metrics and then run the prompt below.

**Prompt (run after metrics arrive):**
```
On the Space Capital Stack page (and its home-page snapshot if applicable),
there is a metrics section that needs populating. Meagan emailed the
metrics — I'll paste them below:

[PASTE METRICS HERE]

Please update the metrics block with these values. Format consistently
with how other metric blocks on the site display (likely large number +
label pattern). Show me the diff.
```

**PR title:** `content(capital-stack): populate space capital stack metrics`

---

## Phase 5 — Contact / footer

### Task 5.1 — Set up mailto links with auto-populated subject lines

**Source:** *16:24 Meagan: "I think it's just pops up to an email."* *16:39 Meagan: "Can you auto populate the subject line?... I would want it to say, Ramsey RFG, submit an executive summary. Ramsey RFG, Request an introduction. Ramsey RFG, request an interview. You know, just so that we know as those are coming in to us, what bucket they're in."*

**Prompt:**
```
Set up mailto: links across the site for the three contact actions, each
with a pre-populated subject line. Recipient: bart@ramseyrfg.com
(confirm the actual domain in use — it may be ramseyrfg.com or
ramseyfg.com based on the repo name; check existing email links in the
codebase).

The three contact actions:

1. Submit an Executive Summary
   - Subject: "Ramsey RFG — Submit an Executive Summary"
   - mailto:bart@ramseyrfg.com?subject=Ramsey%20RFG%20%E2%80%94%20Submit%20an%20Executive%20Summary

2. Request an Introduction
   - Subject: "Ramsey RFG — Request an Introduction"

3. Request an Interview
   - Subject: "Ramsey RFG — Request an Interview"

Wherever the site currently has a generic "Contact Us" CTA, replace it
with these three more specific actions (probably as three buttons or a
small contact-options grid).

URL-encode the subjects properly (spaces as %20, em dash as %E2%80%94, etc.).

Note: do NOT build a submission form right now — Meagan said
"eventually we can have a submission page for executive summaries, but I
don't think we need that right now." Mailto only.

Show me the implementation before committing.
```

**PR title:** `feat(contact): add three mailto CTAs with auto-populated subject lines`

---

### Task 5.2 — Change footer contact email to Bart's direct email

**Source:** *17:04 Meagan: "for the contact information at the bottom, instead of [info]@RamseyRFG, let's change that to Bart@RamseyRFG."* *17:13 Bart: "We never check [info emails]... it's just always better just to do direct."*

**Prompt:**
```
In the footer / contact section at the bottom of the page, find the
contact email currently listed (likely something like info@ramseyrfg.com
or contact@ramseyrfg.com).

Replace it with: bart@ramseyrfg.com

(Verify domain — match whatever domain is used elsewhere in the codebase.)

This should be a mailto link, displayed as "bart@ramseyrfg.com" — not
hidden behind a generic "Contact" label.

Show me where the change is being made and the diff.
```

**PR title:** `chore(footer): replace info@ contact email with bart@ direct`

---

### Task 5.3 — Keep Ramsey family crest in footer as "Ramsey Heritage"

**Source:** *17:36–18:30 Logan/Meagan/Bart:* Decision was to keep the Ramsey crest at the bottom of the page as a separate "Ramsey Heritage" element, NOT replace the corporate logo at the top with it.

**Prompt:**
```
The Ramsey family crest should appear in the FOOTER of every page, labeled
"Ramsey Heritage" (or similar — match existing styling). It should NOT
replace the corporate logo at the top of the page — the clean corporate
logo stays in the header.

1. Verify the crest is present in the footer with a "Ramsey Heritage"
   label. If not, add it.
2. Verify the corporate logo (not the crest) is in the header. If the
   crest was swapped in by mistake, swap it back.
3. The crest in the footer should be modestly sized — meaningful but not
   dominant.

Show me the current state of both header and footer before changing
anything.
```

**PR title:** `chore(layout): keep corporate logo in header, family crest as 'Ramsey Heritage' in footer`

---

### Task 5.4 — Differentiate internal vs external links (arrow icon convention)

**Source:** *18:30 Meagan: "the difference between the ones that have the arrow and the ones that don't, are those internal and external links?"* *18:47 Logan: "Yeah... it's going to direct you to different websites if it's got narrow outbound."*

**Prompt:**
```
The site uses an arrow icon convention to distinguish internal vs external
links:
- External links (open new tab to another domain): show an outbound arrow
  icon next to the link text
- Internal links (same site, in-page or in-app navigation): NO arrow icon

Please audit all links on the home page, portfolio page, and capital stack
page and ensure this convention is applied consistently:

1. Any link whose href points to an external domain (linkedin.com,
   spaceportfund.com, external news/press sites, etc.) gets an outbound
   arrow icon AND target="_blank" rel="noopener noreferrer".
2. Any link whose href is internal (relative path, anchor, route) does NOT
   get an arrow icon.
3. Use the existing arrow icon if one already exists in the codebase
   (search for "arrow", "external", "outbound" in icons). Otherwise use
   a simple SVG arrow (↗ or similar).

Show me which links you flagged and the convention you're applying before
committing.
```

**PR title:** `style(links): consistently mark external links with outbound arrow icon`

---

### Task 5.5 — Link Spaceport Fund to spaceportfund.com

**Source:** *19:29 Meagan: "Spaceport Fund link is really easy. It's spaceportfund.com."*

**Prompt:**
```
Wherever "Spaceport Fund" appears as a clickable link on the site (likely
in the portfolio entry for Karman Line / Spaceport Fund, and possibly on
the Capital Stack page), link it to:

https://spaceportfund.com

Open in a new tab. Apply the outbound arrow icon per Task 5.4.

Show me each occurrence you found and updated.
```

**PR title:** `feat(links): wire Spaceport Fund link to spaceportfund.com`

---

## Phase 6 — Final polish

### Task 6.1 — Replace the project-portfolio page "Established" minor copy fixes

**Source:** *1:45 Logan: "Still probably needs a few updates and tweaks, like there's little things here, like established whatever it is that I got a fine-tune."* — Logan flagged minor copy items in his own walkthrough that he wanted to clean up.

**Prompt:**
```
Do a copy / typography pass on the home page and portfolio pages:

1. Look for any obvious placeholder text (e.g., "Lorem ipsum", "Established
   whatever", "TODO", "[placeholder]", empty headers, double-pasted
   sentences, "lorem", "xxx").
2. Look for typos (especially in transcribed-content sections: project
   names, founder names, dollar amounts).
3. Look for inconsistent capitalization in headings.
4. Look for inconsistent date formats.
5. Flag any sentence that looks half-finished or copy-pasted incorrectly.

Don't fix any substantive content issues — only obvious clean-up. List each
issue you find and the proposed fix; I'll approve before you commit.
```

**PR title:** `chore(copy): clean up placeholder text and obvious typos`

---

### Task 6.2 — Accessibility & responsive pass

**Source:** Implied by "near-publishable" target — Meagan plans a fine-tooth-comb review next.

**Prompt:**
```
Do a basic accessibility and responsive design pass:

1. Verify all images have meaningful alt text (not empty unless purely
   decorative).
2. Verify color contrast meets WCAG AA for all body text and link colors
   (especially the new green link color from Task 2.2 and any non-red
   replacement color from Task 1.2).
3. Verify the site renders correctly at mobile widths (375px, 414px) and
   tablet (768px). Flag any sections that overflow, get squeezed, or
   become illegible.
4. Verify all interactive elements (buttons, links, expandable bios) have
   visible focus states for keyboard navigation.

Don't fix everything — just produce a prioritized list of issues with
severity. I'll decide what blocks publish.
```

**PR title:** `chore(a11y): audit and fix accessibility and responsive issues`

---

### Task 6.3 — Pre-publish checklist

**Prompt:**
```
Before we go live, run through this checklist and report status on each:

[ ] No broken links (run a link checker if possible — every internal and
    external href returns a valid response)
[ ] No console errors when loading the home page, portfolio page, capital
    stack page, or any team bio page
[ ] All TODO comments / data-todo attributes are listed so I can decide
    which block publish
[ ] All placeholder images flagged
[ ] All mailto links work and have correct subjects
[ ] Footer copyright year is correct (2026)
[ ] Page <title> and meta description set for every page
[ ] Favicon present
[ ] No references to "Ramsey Reg A"
[ ] No references to "previous projects" or "successful exits"
    sections (those were removed)
[ ] Yo-Yodyne is in main portfolio, not separated
[ ] Gulf Equities and Deep Space Industries are in Proven Track Record
[ ] Ambrose Cell Therapy is in Current Deals, not Proven Track Record
[ ] Video captions are correct (not reversed)
[ ] Space Capital Stack appears only ONCE on home page (with Read the
    Paper link)

Report each as PASS / FAIL / NEEDS-INFO with brief notes.
```

**PR title:** `chore: pre-publish checklist audit`

---

## Phase 7 — Open items / awaiting input (do not action yet)

These are items where you're waiting on something from Meagan, Leo, or Bart. Skip them until you have what you need.

### Task 7.1 — Updated Axe H2O logo **[BLOCKED]**
**Source:** *10:24 Meagan: "you're about to get an email from me from an even different address. With the updated H2O logo. I just updated it while I was out of town."*
**Status:** Meagan was sending updated logo via email. Check inbox; once received, swap into the Axe H2O portfolio entry.

### Task 7.2 — Karman Line / Spaceport Fund logo **[BLOCKED]**
**Source:** *8:34 Logan: "is there a dedicated logo or icon for Carmen Line Spaceport Fund?"* *8:45 Meagan: "Yes, I can get that to you... carpenterlogan3@gmail.com."*
**Status:** Meagan was sending to carpenterlogan3@gmail.com. Check inbox; once received, replace placeholder.

### Task 7.3 — Deck for Ambrose Cell Therapy **[BLOCKED]**
**Source:** *40:16 Logan: "I got everything I need except for the deck upon request for Ambrose cell therapy."*
**Status:** Need to chase. Once received, add to Ambrose portfolio entry per Task 4.2 pattern.

### Task 7.4 — Confirm CoreMedica and Manevo status **[BLOCKED]**
**Source:** *37:19 Logan: "There was something called out about CoreMedica and Manevo from our very first discussion. Does that still need to be incorporated?"* *37:41 Bart: "I don't know where core medic is at right now."*
**Status:** Bart wasn't sure. Wait for confirmation before adding to portfolio.

### Task 7.5 — Texas-to-Mars / Eden open house event references **[FUTURE]**
**Source:** *27:42 Meagan:* The Texas-to-Mars event is what the front-page videos are from. This is contact-database work, not website work. Keep separate.

---

## Phase 8 — Out-of-scope (separate workstream, NOT website)

The following came up in the meeting but are NOT website changes — these are Logan's other automation/tools projects. Don't include in website PRs:

- Outreach Tracker (Gmail crawler tool)
- Prospecting Engine / Capital Factory database automation
- Portfolio Dashboard (the Bloomberg-portal-style equity tracker)
- LinkedIn / Press Release amplified-content tool
- CRM / business card scanner integration

Build these in a separate repo / workstream. Logan is showing all of these via HTML mockups already; they're queued for development.

---

## Suggested PR sequence (if doing this in order)

If you want to do this as a clean, reviewable sequence of small PRs, I'd suggest this order:

1. Task 0.1 (orientation — no PR)
2. Tasks 1.1, 1.2 (quick home-page fixes)
3. Task 1.3 (de-dup capital stack)
4. Tasks 2.1, 2.2 (bio shortening + green links)
5. Task 2.3 (LinkedIn — Meagan's live)
6. Tasks 3.5, 3.6, 3.8 (deletions — Successful Exits, Previous Projects, Reg A)
7. Tasks 3.1, 3.2, 3.3, 3.7 (portfolio re-ordering)
8. Task 3.4 (Off-Earth Data placeholder)
9. Tasks 3.9, 3.10 (image fixes)
10. Task 4.1 (descriptions batch)
11. Task 4.2 (deck PDFs)
12. Task 4.3 (Park Plaza + Detecti-Chem scaffolding)
13. Tasks 5.1, 5.2, 5.3 (contact + footer)
14. Tasks 5.4, 5.5 (external link convention + Spaceport Fund)
15. Task 6.1 (copy clean-up)
16. Task 6.2 (a11y / responsive)
17. Task 6.3 (pre-publish audit)

Run 4.4 and any other [BLOCKED] tasks as the inputs arrive.

---

## Notes for the train ride

- Each task above is paste-ready — copy the **Prompt** block into Claude Code, let it propose changes, review the diff, commit, and open a PR.
- Use the **PR title** suggestion for consistency.
- When Claude Code asks for confirmation before destructive changes (deletes), say yes only after you've seen what's being removed.
- Don't be afraid to skip a task if it's blocked — there are plenty of independent tasks here you can knock out without anyone's input.
- After the run, the only items you really need other humans for are: Park Plaza description (Leo), CoreMedica/Manevo status (Bart), Off-Earth Data assets (Meagan), the Axe H2O updated logo (Meagan, already emailed), the Karman Line logo (Meagan, already emailed), space capital stack metrics (Meagan, already emailed), and Ambrose deck.

Good luck on the train. The website should be solidly publish-ready by the time you're at the beach house.
