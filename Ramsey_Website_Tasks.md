# Ramsey Financial Group — Website Rework Task List
**Source:** Bart Womack / Logan Carpenter Website Sync — Apr 30, 2026
**Owner:** Logan Carpenter
**Tooling:** Claude + Claude Code → GitHub → live site (pending Holiday handoff)

---

## How to use this document
Tasks are grouped by where they live in the codebase and ordered by what is actionable now versus what is blocked on inputs from Bart, Megan, or Holiday. Each task includes (a) the exact change Bart asked for, (b) a literal quote/paraphrase of his words for context, and (c) an "ask Claude Code to..." prompt you can paste straight into a Claude Code session.

Status legend:
- **[NOW]** — actionable today, no external inputs needed
- **[WAIT-ASSETS]** — blocked on Bart sending materials (per the email Logan already sent)
- **[WAIT-MEGAN]** — needs Megan's QA / sign-off before going live
- **[WAIT-HOLIDAY]** — blocked on Holiday for hosting / GitHub deployment

---

## SECTION 1 — Home Page (`index.html`) Reordering

Bart's exact direction at ~10:50–12:08: the homepage flow should hit visitors over the head with credibility immediately, then move them into active raises, and push videos / "bets that worked" to the bottom as supporting material rather than lead content.

### 1.1 Reorder homepage sections [NOW]
Current order needs to become this sequence, top to bottom:

1. **Intelligent Co-Investing** hero + intro paragraph (keep as-is at top)
2. **30+ Years / 10 Active** stats block — *moved up* (was lower)
3. **Active Raises** section — *renamed from "What We're Raising For Now"*
4. (the rest of the existing middle content)
5. **Bets That Worked** — *moved to bottom*
6. **Videos** — *moved to bottom*

> Bart: "intelligent co-investing… then 30 plus years, the stats. Then I would have it go to… active raises. Because that really hits them over the head very quickly. And then they can start digging into our past and our statements and everything else."

### 1.2 Rename "What We're Raising For Now" → "Active Raises" [NOW]
- Update the section heading
- Update any nav anchor links pointing to it
- Update any internal page references / breadcrumbs

### 1.3 Move "Videos" section to bottom of homepage [NOW]
Bart explicitly reversed his earlier preference here — he now wants videos at the bottom.

### 1.4 Move "Bets That Worked" section to bottom of homepage [NOW]
Place adjacent to Videos at the end of the page.

**Claude Code prompt:**
> "Open `index.html`. Reorder the main sections so the flow is: (1) Intelligent Co-Investing hero, (2) 30+ Years / 10 Active stats block, (3) Active Raises (rename from 'What We're Raising For Now' — also update any anchor IDs and nav links), (4) existing middle content unchanged, (5) Bets That Worked moved to bottom, (6) Videos moved to bottom. Preserve all existing styling and IDs except where renamed. Show me a diff before committing."

---

## SECTION 2 — Portfolio Page

### 2.1 Confirm portfolio filter behavior is working as intended [NOW]
Logan demoed the new filterable portfolio (sector breakouts, click in/click out) and Bart approved it without changes:
> Bart: "this looks amazing, dude. No, I wouldn't change anything here."

**Action:** Smoke-test the filter on each sector to confirm the click-in/click-out fix sticks. No code change needed unless a regression is found.

### 2.2 Do NOT add money-deployed-by-sector breakdown [NOW — decision logged]
Logan offered this; Bart declined.
> Bart: "I don't want to do that because the truth is most of the money that we've deployed is tied up in real estate… it's better to be vague and let everyone's imaginations make us look bigger than we are."

**Action:** Log this as a "do not build" decision so it doesn't resurface. Add a comment in the portfolio template noting the deliberate omission.

### 2.3 Add Off Earth Data to portfolio listings [WAIT-ASSETS]
Megan flagged this as part of the portfolio. Confirm NovaSpark is already listed (Bart asked, Logan thinks yes — verify). If Off Earth Data is missing, add a placeholder card pending materials.

**Claude Code prompt:**
> "Check `portfolio.html` and the portfolio data source (likely a JSON or array in the script). Confirm NovaSpark Energy is present. If Off Earth Data is not present, add a placeholder card with name, sector tag, and 'Details coming soon' copy — match the existing card structure exactly."

---

## SECTION 3 — Get Involved / Contact Portals

This was the longest design discussion (~15:30–18:23). Bart's final answer: build all three portals using **email + optional Calendly**, not just plain mailto.

### 3.1 Build "For Founders" portal — submit executive summary [NOW, partial]
- Primary action: opens user's preferred email client, pre-fills To: Bart + Megan, pre-fills subject line ("Executive Summary Submission — [Founder Name]")
- Suggested body template prompting for: company name, sector, stage, ask, deck link
- Secondary action: Calendly link (deferred — see 3.4)

### 3.2 Build "For Investors" portal — request introduction [NOW, partial]
- Primary action: email to Bart + Megan, subject "Investor Introduction Request"
- Secondary action: Calendly button (deferred — see 3.4)

### 3.3 Build "Press & Policy" portal — interview / inquiry request [NOW, partial]
- Primary action: email to Bart + Megan, subject "Press / Policy Inquiry"
- Secondary action: Calendly button (deferred — see 3.4)

### 3.4 Calendly integration [WAIT-MEGAN / WAIT-BART]
Bart confirmed neither he, Megan, nor Leo currently have Calendly set up. Action items:
- Logan to help Bart/Megan stand up Calendly accounts
- Once URLs exist, swap the placeholder "Schedule a Meeting" buttons to live Calendly embeds
- Until then, render those buttons as disabled or hidden

> Logan's self-noted to-do: "Logan to build out for founders, for investors and for press and policy sections with email and potentially calendar link options. QA with Megan."

**Claude Code prompt:**
> "Create three portal sections under a 'Get Involved' page or section: For Founders, For Investors, For Press & Policy. Each should have a primary `mailto:` button addressed to bart@... and meagan@... with a pre-filled subject line and body template appropriate to the audience. Below the email button, scaffold a 'Schedule a Meeting' button that's currently disabled with a tooltip 'Coming soon' — wired so a Calendly URL can be dropped in later via a single config variable. Use the existing site's button styling."

### 3.5 Update default contact recipients site-wide [NOW]
Bart confirmed: contact info listed = **Bart + Megan**.
> Bart: "I'd say me and Megan."

Apply to: footer contact, contact page, any "reach out" CTAs across the site. Replace any old Leo-only or generic info@ addresses unless explicitly intended.

---

## SECTION 4 — Team / Bios Section

### 4.1 Lift current bios + headshots from existing Ramsey site [NOW]
Megan recently updated these on the live current site, so they're approved copy.
- Pull bios for: Bart Womack, Meagan Crawford, Leo Womack (and any others currently listed)
- Pull professional headshots at the highest available resolution
- Re-upload to the new site assets folder
- Match the existing card layout

> Logan's self-noted to-do: "lift current bios and headshots off the current Ramsey website. I can handle that."

**Claude Code prompt:**
> "I'm going to scrape bios and headshots from the live Ramsey Financial Group site. Help me write a small Node script that pulls each team member's name, title, bio paragraph, and headshot image URL given a list of profile URLs, then saves headshots to `/assets/team/` and outputs a JSON file with the structured bio data. Then update the team section in the new site to consume that JSON."

---

## SECTION 5 — White Paper PDF Embed

### 5.1 Fix broken PDF embed [NOW]
Logan reported: "I even figured out how to embed the PDF in here for the white paper… now it's not working, which is awesome, but it was working before."

**Action:** Debug the embed. Common culprits:
- File path changed after a folder restructure
- MIME-type / Content-Disposition issue
- Browser blocking inline PDF in some configurations — fall back to `<object>` with `<iframe>` fallback, and a "Download PDF" link as a final fallback

**Claude Code prompt:**
> "The white paper PDF embed on the homepage stopped rendering. Inspect the embed element, verify the file path resolves, and refactor to a three-layer fallback: `<object>` → `<iframe>` → direct download link. Test in Chrome and Safari."

---

## SECTION 6 — Social / LinkedIn Wiring

### 6.1 Make LinkedIn icon click through to the Ramsey LinkedIn page [NOW]
Logan committed to this directly:
> Logan: "I'm going to make it so that when you click LinkedIn, it sends right to the LinkedIn."

**Action:** Update the LinkedIn icon's `href` to the Ramsey Financial Group company page URL (confirm exact URL with Bart/Megan if not already known). Set `target="_blank"` and `rel="noopener noreferrer"`.

### 6.2 Add basic site analytics [NOW or near-term]
Logan referenced tracking once LinkedIn drives traffic:
> Logan: "we can track the analytics of who's seeing this, how they're getting to it, whether it's from LinkedIn, from searching the website, from whatever it might be."

**Action:** Decide on Plausible / Fathom / GA4 and install the snippet. Plausible or Fathom are lightweight and privacy-respecting; GA4 is the default if Megan/Bart want UTM tracking out of the box. Confirm preference before installing.

---

## SECTION 7 — Outstanding Asset Requests (Bart's homework)

These are the items Logan already emailed Bart + Megan + Leo about. Bart confirmed he'd work on them today (Apr 30).

### 7.1 [WAIT-ASSETS] Items needed from Bart per the prior email:
- Videos for the Videos section (the ones being moved to the bottom)
- Whatever specific copy/data Logan flagged in his email
- Confirmation of the active raises list with current numbers

> Bart: "I'll work on this today… I can work all day on getting you the rest of the materials."

**Action:** Once Bart sends materials, drop them into `/assets/` with consistent naming (e.g., `videos/`, `raises/`) and update references. Forward Bart the original email again if he doesn't deliver by EOD Friday.

---

## SECTION 8 — Hosting & Deployment Path

### 8.1 [WAIT-HOLIDAY] Move site from Logan's private server to Cursive's GitHub-backed hosting
Logan stated the site is currently on his private server with pull-request notifications enabled (no unauthorized edits possible). The end state is hosting on Cursive's GitHub server so edits flow:
**Claude Code → GitHub → live site (refresh to update)**

> Logan: "any time I edit this I can push it through in real time and just hit refresh basically. And it updates the changes from my Claude code [to] my github and then to the website."

**Action items:**
- Schedule sync with Holiday to walk through the deployment pipeline
- Bart offered: "I think when we get it ready, we can just hand it over to him. He'll do it" — but Logan wants to learn the pipeline for institutional knowledge. Confirm which path you want.
- Once handed off / set up: configure GitHub repo, set up CI (GitHub Pages, Netlify, or Vercel — confirm what Cursive uses), point DNS

### 8.2 Pre-launch sharing protocol [NOW — communication item]
Logan to Bart on the current preview link:
> Logan: "Be careful sharing it beyond, you know, you, me, Megan, your dad… people can see it, they can't edit it, but they can see it."

**Action:** Add a clear "MOCK-UP — NOT FINAL" banner on every page (Logan said "it's very obvious that this is a mock-up" — verify this banner is actually present on every route, not just home). Remove the banner site-wide on launch day as a single config flag.

---

## SECTION 9 — Cross-Cutting / Polish (Logan's call as developer)

These weren't directly called out by Bart but follow from the discussion:

### 9.1 [NOW] Verify all navigation anchors still resolve after Section 1 reorder
Section reordering will break anchor links if any nav items point to renamed sections (`#raising` → `#active-raises`).

### 9.2 [NOW] Sitemap & robots.txt
If launch is realistically next week (Logan said "if I have what I need this could be done and active next week"), make sure `sitemap.xml` and `robots.txt` are present and current. Set `robots.txt` to disallow until launch, then flip it.

### 9.3 [NOW] Open Graph + Twitter Card tags
Once LinkedIn posting starts driving traffic (Section 6), each shared link will look much better with proper OG tags. Add `og:title`, `og:description`, `og:image`, `twitter:card` to the homepage and portfolio page at minimum.

**Claude Code prompt:**
> "Add Open Graph and Twitter Card meta tags to the `<head>` of `index.html`, `portfolio.html`, and any other top-level pages. Use a single OG image in `/assets/og/` — I'll provide the image. Title and description should match each page's H1 and lead paragraph. Add a build-time check or comment block reminding to update these when page content changes."

---

## SECTION 10 — Decisions Logged (do NOT change)

For your records, these are explicit "no" decisions from Bart so they don't get re-litigated:

| Item | Decision | Rationale |
|------|----------|-----------|
| Show capital deployed by sector on portfolio | **No** | Most capital is in real estate; vagueness lets imaginations inflate the number |
| Calendly-only contact (no email option) | **No** | Bart wants email primary; Calendly is secondary |
| Plain `mailto:` only for portals | **No** | Final answer was email + Calendly hybrid |

---

## Out-of-Scope Items Noted in the Meeting (for awareness, not this sprint)

These came up during the call but are separate workstreams — DO NOT block website launch on them:

- **CEO email-to-LinkedIn auto-posting tool** ("email scraper") — Bart wants this built next, after the website ships
- **Cohesive ecosystem hub** (Calendly + Task Robin + Project Tracker + Outreach Tracker, queryable from one place) — future build
- **Jetson Capital family-office event** — Logan to email Bart, Leo, Megan a one-paragraph overview for them to decide on attending
- **Portco partnerships / military project briefing** — separate sticky note, revisit in 2 weeks per Bart

---

## Suggested Order of Operations for Your Next Claude Code Session

If you want to knock out everything in **[NOW]** in one sitting, work in this order to minimize merge conflicts:

1. Section 1 (homepage reorder) — biggest structural change, do first
2. Section 9.1 (verify anchors) — immediately validates Section 1
3. Section 5 (PDF embed fix) — independent, quick win
4. Section 3.1–3.3 + 3.5 (Get Involved portals + contact recipients) — new component work
5. Section 4.1 (lift bios/headshots) — async script run, can happen in background
6. Section 6.1 (LinkedIn href) — one-line change
7. Section 8.2 (mock-up banner audit) — verification pass
8. Section 9.3 (OG tags) — wraps up polish

Then commit, push, and send Bart the preview link with a changelog summarizing what moved.
