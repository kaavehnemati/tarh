/* Tarh & Afarinesh — SITE-LEVEL IDENTITY
   Deliberately small: brand identity, language configuration and copyright only.
   Domain content stays in projects-data / expertise-data / about-data /
   awards-data / journal-data / contact-data. No legal suffix is invented. */
(function () {
  window.TA_SITE = {
    name: { en: "Tarh & Afarinesh", fa: "طرح و آفرینش" },
    /* no Ltd / LLC / Co. until the studio supplies its registered name */
    legalName: null,
    languages: [
      { code: "en", label: "EN", dir: "ltr", font: '"Schibsted Grotesk",Helvetica,Arial,sans-serif' },
      { code: "fa", label: "فا", dir: "rtl", font: 'Vazirmatn,"Schibsted Grotesk",Tahoma,sans-serif' }
    ],
    defaultLanguage: "en",
    copyright: { year: null, holder: { en: "Tarh & Afarinesh", fa: "طرح و آفرینش" } },
    seo: { title: { en: null, fa: null }, description: { en: null, fa: null } },

    /* bilingual policy: never expose a machine translation as factual copy.
       A missing translation is flagged internally, not silently generated. */
    translationPolicy: {
      autoTranslate: false,
      fallback: "flag-internally"
    },

    /* ---- internal content QA — never rendered to visitors ---------------- */
    qa: function () {
      var out = {
        projects: { total: 0, prototype: 0, draft: 0, real: 0 },
        missingHero: [], missingEn: [], missingFa: [], missingAlt: [],
        missingAltEn: [], missingAltFa: [], decorative: [], realWithoutRealHero: [],
        brokenProjectRefs: [], brokenExpertiseRefs: [], brokenJournalRefs: [],
        duplicateIds: [], duplicateSlugs: [],
        /* §43 — any canonical record still holding a legacy pid relation */
        legacyProjectRelations: [],
        /* §11 — authored story/drawing content that cannot resolve */
        brokenStoryMedia: [],
        brokenDrawingMedia: [],
        unsupportedStoryBlocks: [],
        /* §44 — a public surface pointing at an unpublished project */
        unpublishedPublicReferences: [],
        /* a selected project that does not declare that discipline */
        mismatchedExpertiseSelections: [],
        prototypeFallbackInRealContent: []
      };
      var P = window.TA_PROJECTS, E = window.TA_EXPERTISE, A = window.TA_AWARDS, J = window.TA_JOURNAL;

      if (P) {
        var seenId = {}, seenSlug = {};
        P.all().forEach(function (p) {
          out.projects.total++;
          var st = p.contentState || "prototype";
          if (out.projects[st] != null) out.projects[st]++;
          if (seenId[p.id]) out.duplicateIds.push(p.id); else seenId[p.id] = 1;
          if (seenSlug[p.slug]) out.duplicateSlugs.push(p.slug); else seenSlug[p.slug] = 1;

          /* exact role, so a first-asset fallback cannot look like a hero */
          var hero = P.mediaExact ? P.mediaExact(p.id, "hero") : P.media(p.id, "hero");
          if (!hero) out.missingHero.push(p.id);
          /* §42 — a published real project must not ship a prototype plate */
          if (st === "real" && p.published && (!hero || !hero.src)) out.realWithoutRealHero.push(p.id);
          if (!p.title || !p.title.en) out.missingEn.push(p.id);
          if (!p.title || !p.title.fa) out.missingFa.push(p.id);
          (p.media || []).forEach(function (m) {
            /* §43 — decorative assets are intentionally alt-free; informative ones need both languages */
            if (window.TA_MEDIA && window.TA_MEDIA.needsAlt(m)) {
              if (!m.alt || !m.alt.en) out.missingAltEn.push(m.id);
              if (!m.alt || !m.alt.fa) out.missingAltFa.push(m.id);
              out.missingAlt.push(m.id);
            } else if (m.decorative) out.decorative.push(m.id);
          });
          /* a real record must never inherit a prototype plate as its image */
          if (st === "real") {
            (p.media || []).forEach(function (m) {
              if (!m.src && m.plate != null) out.prototypeFallbackInRealContent.push(m.id);
            });
          }
          /* every referenced expertise slug must exist in the taxonomy */
          if (E) (p.expertise || []).forEach(function (s) {
            if (!E.bySlug(s)) out.brokenExpertiseRefs.push(p.id + " → " + s);
          });
          (p.relatedProjects || []).forEach(function (id) {
            if (!P.byId(id)) out.brokenProjectRefs.push(p.id + " → " + id);
          });
        });
      }

      if (E && P) E.all().forEach(function (e) {
        (e.selectedProjectIds || []).forEach(function (id) {
          if (!P.byId(id)) out.brokenProjectRefs.push(e.slug + " → " + id);
        });
        (e.relatedExpertise || []).forEach(function (s) {
          if (!E.bySlug(s)) out.brokenExpertiseRefs.push(e.slug + " → " + s);
        });
      });

      /* awards reference projects by canonical id */
      if (A && P) A.awards.forEach(function (a) {
        if (a.projectId && !P.byId(a.projectId)) out.brokenProjectRefs.push(a.id + " → " + a.projectId);
      });

      if (J && P) (J.entries || []).forEach(function (j) {
        if (j.projectId && !P.byId(j.projectId)) out.brokenProjectRefs.push(j.id + " → " + j.projectId);
        if (E) (j.exp || []).forEach(function (s) {
          if (!E.bySlug(s)) out.brokenExpertiseRefs.push(j.id + " → " + s);
        });
      });

      /* §43 — the pid→projectId migration is provable: any surviving pid is a fault */
      var scanLegacy = function (label, records) {
        (records || []).forEach(function (r) {
          if (r && Object.prototype.hasOwnProperty.call(r, "pid")) {
            out.legacyProjectRelations.push(label + " " + (r.id || "?"));
          }
        });
      };
      if (A) scanLegacy("award", A.awards);
      if (J) scanLegacy("journal", J.entries);
      if (P) scanLegacy("project", P.all());
      if (E) scanLegacy("expertise", E.all());

      /* §44 — no public surface may point at an unpublished project */
      if (P) {
        var pubOk = function (id) { var c = P.byId(id); return !!c && c.published === true; };
        /* §44 — a selection must match the project's own declared disciplines */
        if (E) E.all().forEach(function (e) {
          (e.selectedProjectIds || []).forEach(function (id) {
            var c = P.byId(id);
            if (c && (c.expertise || []).indexOf(e.slug) < 0) {
              out.mismatchedExpertiseSelections.push("expertise " + e.slug + " → " + id);
            }
          });
        });

        if (E) E.all().forEach(function (e) {
          (e.selectedProjectIds || []).forEach(function (id) {
            if (P.byId(id) && !pubOk(id)) out.unpublishedPublicReferences.push("expertise " + e.slug + " → " + id);
          });
        });
        if (A) A.awards.forEach(function (a) {
          if (a.projectId && P.byId(a.projectId) && !pubOk(a.projectId)) {
            out.unpublishedPublicReferences.push("award " + a.id + " → " + a.projectId);
          }
        });
        if (J) (J.entries || []).forEach(function (j) {
          if (j.projectId && P.byId(j.projectId) && !pubOk(j.projectId)) {
            out.unpublishedPublicReferences.push("journal " + j.id + " → " + j.projectId);
          }
        });
        P.all().forEach(function (p) {
          if (p.homepageFeatured && p.published !== true) {
            out.unpublishedPublicReferences.push("homepage → " + p.id);
          }
          (p.relatedProjects || []).forEach(function (id) {
            if (P.byId(id) && !pubOk(id)) out.unpublishedPublicReferences.push("related " + p.id + " → " + id);
          });
        });
      }

      /* §11/§12 — authored story and drawing content must resolve */
      if (P) {
        var SUPPORTED = ["full-image", "image-text", "image-pair", "sticky-narrative",
                         "quote", "text", "drawing-group"];
        var RENDERED = ["full-image", "image-text", "sticky-narrative", "quote", "text"];
        P.all().forEach(function (p) {
          (p.story || []).forEach(function (b, i) {
            var tag = p.id + " · " + (b.type || "?") + "[" + i + "]";
            if (SUPPORTED.indexOf(b.type) < 0) { out.unsupportedStoryBlocks.push(tag + " — unknown type"); return; }
            var ids = (b.mediaId ? [b.mediaId] : []).concat(b.mediaIds || []);
            var valid = 0;
            ids.forEach(function (mid) {
              if (P.mediaById(p.id, mid)) valid++;
              else out.brokenStoryMedia.push(tag + " → " + mid);
            });
            if (b.type === "sticky-narrative" && valid === 0) out.brokenStoryMedia.push(tag + " — no valid media");
            if (b.type === "image-pair" && valid < 2) out.brokenStoryMedia.push(tag + " — needs two media");
            /* authored but not yet renderable: surfaced, never silently dropped */
            if (RENDERED.indexOf(b.type) < 0) out.unsupportedStoryBlocks.push(tag + " — no approved composition");
          });
          (p.drawings || []).forEach(function (d, i) {
            var tag = p.id + " · drawing[" + i + "]";
            if (d.mediaId) {
              if (!P.mediaById(p.id, d.mediaId)) out.brokenDrawingMedia.push(tag + " → " + d.mediaId);
            } else if (!d.media) {
              out.brokenDrawingMedia.push(tag + " — no mediaId or media");
            }
          });
        });
      }

      return out;
    }
  };
})();