# RTL / LTR GUIDE — V2
## Tarh & Afarinesh / طرح و آفرینش

How bilingual text works in Design System V2. Every V2 page inherits these rules from
`tokens-v2.css` (Layer 4 + typography foundation) and `bidi.js`. **No page decides direction
or font on its own.**

---

## 1. The foundation

- A page sets **one** thing: `dir="ltr"` or `dir="rtl"` on its root.
- **Fonts are decided only in `tokens-v2.css`:** `html` and `[dir="ltr"]` → `--en`
  (Schibsted Grotesk); `[dir="rtl"]` and any `lang="fa"` element → `--fa` (Vazirmatn).
- Type roles, spacing corrections, measure and tracking re-point to Persian by inheritance
  (Layer 2). A component writes `var(--t-hl)` once — never a `-fa` token.
- **Never** write `direction`, `font-family` or `unicode-bidi` inline on content.

## 2. Persian rules

- Paragraph direction is RTL, text aligns right, letter-spacing is 0 at every role.
- No uppercase — Persian metadata differentiates by size and weight, not case or tracking.
- A Persian sentence stays RTL **even if it begins with a Latin word**. "SBID جایزه بین‌المللی
  طراحی" is Persian. This is why first-strong-character detection (`dir="auto"`) is not used.
- Photography, drawings, the 3×3 geometry and the diagonal are never mirrored.

## 3. English rules

- Paragraph direction LTR, English family, English tracking and uppercase metadata as designed.
- Inside a Persian page, an English-only string flows LTR but **keeps the right-hand column
  edge** — it must not jump to the left margin.

## 4. Mixed content

A Persian string can contain Latin names, acronyms, organisations and projects.

- `TA_BIDI.parts(s, lang)` splits it. In Persian, **each Latin run is isolated** as `text-ltr`
  and rendered in the English family, so neutral punctuation around it can't reorder.
- A string is an LTR island only when it contains **no Persian script at all**.

| Input (fa) | Parts |
|---|---|
| `SBID جایزه بین‌المللی طراحی ۲۰۱۵` | `[ltr: SBID] [ جایزه بین‌المللی طراحی ] [number: ۲۰۱۵]` |
| `هتل Hotel Asia در تهران` | `[هتل ] [ltr: Hotel Asia] [ در تهران]` |

## 5. Numbers

**Every** year, date, count, range, measurement and project number is isolated LTR.

- `.text-number`: `direction:ltr`, `unicode-bidi:isolate`, tabular figures, English family, no
  wrap, no tracking — in **both** languages, so digit metrics are stable.
- Isolation is what stops `–`, `—`, `·`, `/` and `%` beside a number from jumping sides.
- **Digits are never converted.** They render as the content stores them.
- Ranges use an **en dash**: `TA_BIDI.range(2014, 2026)` → `2014–2026`; a single year collapses.
- `parts()` isolates number runs automatically — `Project 01` → `[Project ][number: 01]`;
  `زیربنا 55,000 m²` → `[زیربنا ][number: 55,000 m²]`.

## 6. The utilities

| Class | direction | unicode-bidi | alignment | font |
|---|---|---|---|---|
| `.text-rtl` | rtl | isolate | right | `--fa` |
| `.text-ltr` | ltr | isolate | column edge (right in rtl) | `--en` |
| `.text-number` | ltr | isolate | column edge | `--en`, tabular |
| `.text-code` | ltr | isolate | column edge | `--en`, no tracking |
| `.text-mixed` | page language | isolate | column edge | follows language |

Choose one with `TA_BIDI.cls(string, lang)`: numeric → `text-number`; Latin-only inside
Persian → `text-ltr`; everything else → `text-mixed`.

## 7. Developer usage

**Load order** (every V2 page helmet):
```html
<link rel="stylesheet" href="../design-system/tokens-v2.css" />
<script src="../runtime/bidi.js"></script>
```

**Root:**
```html
<div dir="{{ dir }}">          <!-- dir: fa ? "rtl" : "ltr" -->
```

**A standalone number:**
```html
<span class="text-number">{{ year }}</span>
```

**A string that may mix scripts** — view model `nameParts: TA_BIDI.parts(name, lang)`:
```html
<span class="text-mixed"><sc-for list="{{ nameParts }}" as="p"><span class="{{ p.cls }}">{{ p.t }}</span></sc-for></span>
```

**A Persian label inside an English header:**
```html
<button lang="fa">فا</button>
```

**Never:**
```html
<span style="direction:ltr">…</span>          <!-- use a class -->
<span style="font-family:var(--fa)">…</span>  <!-- use lang="fa" or dir -->
fa ? "1.5" : "1.04"                           <!-- use a type role -->
```

## 8. Test cases — all verified on Awards V2

| Case | Result |
|---|---|
| جوایز و افتخارات | RTL, `--fa` |
| SBID جایزه بین‌المللی طراحی | RTL paragraph, `SBID` isolated LTR |
| 2015 | LTR, isolated, tabular |
| 2014–2026 | LTR, isolated, en dash |
| Awards & Honors | LTR (English page) |
| Project 01 | `01` isolated |
