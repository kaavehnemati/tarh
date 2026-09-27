# Contact — Demo Content Summary

**Status: CONTACT PAGE — DEMO READY**

## Final EN copy
- Opening: "Every project begins / before the first line is drawn." + supporting line about site,
  ambition and project stage bringing architecture, engineering and delivery into one conversation.
- Inquiry types: Start a Project · Professional Collaboration · Media & Press · Careers · General Inquiry.
- Project side copy: "Start with what you know." — site/programme/idea framing.
- Careers side copy: direct-application line pointing to `apply4job@tarh-afarinesh.com`.
- Media & Press side copy: publication name / subject / deadline framing.
- Closing: "Bring us the brief. / Or just the beginning of one." + CTA "Start a conversation" (anchors to the inquiry picker).

## Final FA copy
- Opening: «هر پروژه، پیش از نخستین خط آغاز می‌شود.» + supporting line.
- Inquiry types: شروع یک پروژه · همکاری حرفه‌ای · رسانه و مطبوعات · فرصت‌های شغلی · ارتباط عمومی.
- Project side copy: «از آنچه امروز می‌دانید شروع کنید.»
- Careers/Media side copy translated per brief.
- Closing: «شرح پروژه را بیاورید؛ یا حتی فقط نقطه‌ی آغازش را.» + CTA «شروع گفت‌وگو».

## Form structure per inquiry (name/email/message always present)
- **Start a Project**: + Organisation, Project location, Areas of expertise (multi-select from
  live `TA_EXPERTISE` taxonomy), Project stage (8-value vocabulary: Early Brief → Feasibility →
  Concept Design → Design Development → Technical Design → Construction & Delivery → Existing
  Project/Consultation → Other), Approximate scale (optional), Desired timeline, Attachments.
  Message field labels as "Project brief".
- **Professional Collaboration**: + Organisation, Nature of collaboration, Website/portfolio,
  Attachments. Message labels as "Short note".
- **Media & Press**: + Organisation, Deadline, Subject.
- **Careers**: + Role of interest, Website/portfolio (doubles as portfolio URL), CV/portfolio
  upload (attachment). Message labels as "Short note". Side copy repeats the direct
  `apply4job@tarh-afarinesh.com` route.
- **General Inquiry**: + Subject.

## Demo/placeholder data used
- Studio address is intentionally city-level only: **"Tehran, Iran"** — no street address
  invented, per the demo policy in the brief.
- No map/directions URL (none exists yet — left null rather than fabricated).
- Hours row omitted (no confirmed value).
- Hero "Threshold" visual is a drop-in `<image-slot>` placeholder (21:8 band, full width,
  directly under the opening) — ready for the user to drop the real conceptual photograph
  described in the brief (two monumental planes, narrow threshold opening, natural light, no
  people/furniture/text/branding in-frame).

## Real/working data now wired in
Email `info@tarh-afarinesh.com`, careers email `apply4job@tarh-afarinesh.com`, phone
`+98 21 88370781`, website `tarh-afarinesh.com`, Instagram and LinkedIn (both now live links,
opening in a new tab) — all sourced from `contact-data.js` (single source shared with V1's
Contact page and future footer blocks, per the project's existing content-sharing architecture).

## Visual direction summary
"Architectural Threshold" concept — quiet, precise, premium; canvas/ink/turquoise palette only
(no new colors introduced); no cards, no generic form chrome; inquiry types render as a
numbered editorial register with a reactive 3×3 motif and `select` contextual cursor; fields are
label + rule, no boxed inputs.

## Remaining data to confirm before production
- Full street-level office address (if the studio wants one published).
- Office hours, if any.
- Whether a dedicated media/press email exists (currently routes to the general inbox, matching
  brief §10's fallback instruction).
- Real Threshold photography to fill the hero image slot.
