# Student Probability Resource — Design Spec
**Date:** 2026-04-26

## Overview

Add a self-contained page to the main website that displays an interactive probability distribution reference table. The user fills in distribution data manually. No build step, no separate app.

---

## Files

| File | Action | Purpose |
|------|--------|---------|
| `student-probability-resource.html` | Create | Main page with React + Babel + MathJax, fully self-contained |
| `student-probability-resource-redirect.html` | Create | Thin redirect (mirrors `cv.html`, `collaborators.html` pattern) |
| `index.html` | Modify | Add link to the resource on the instruction page |

---

## Architecture

`student-probability-resource.html` follows the same pattern as the existing site:
- React 18 + Babel via CDN (no build step)
- MathJax 3 via CDN for formula rendering
- Shared fonts (Libre Baskerville, Archivo, IBM Plex Mono) via Google Fonts
- Shared color palette: paper `#f4f1ea`, ink `#1a1a1c`, red accent `#7a1a1a`

Distribution data is a plain JS array at the top of the file. Each entry is one object. The user adds distributions by adding objects to this array — no component code changes needed.

`student-probability-resource-redirect.html` is a one-liner redirect to `student-probability-resource.html`, enabling a clean URL entry point.

---

## Table Structure

### Always-visible columns
1. **Distribution** — name, clickable
2. **Parameters** — e.g. `X ~ Binomial(n, p)`
3. **PMF/PDF** — formula rendered via MathJax

### Toggleable columns (hidden by default)
4. **CDF**
5. **E(X)**
6. **Var(X)**
7. **MGF**

Column toggles appear as checkboxes in a small control bar above the table.

---

## Interactions

### Click distribution name
- The entire row expands downward inline (no side panel)
- Expanded content sections: Use Cases, History, Example, Relationships
- Only one row can be expanded at a time; opening another collapses the current one

### Click a formula cell (PMF/PDF, CDF, E(X), Var(X), MGF)
- The entire row expands downward inline (same as above)
- Additionally, the clicked column widens horizontally to show derivation or extended detail
- The expanded column content is distinct from the row detail sections (derivation vs. narrative)
- Only one row expanded at a time

### Collapse
- Clicking the expanded row's name (or the active cell again) collapses it
- Opening a different row collapses the current one

---

## Data Shape

Each distribution object in the JS array:

```js
{
  id: 'binomial',
  name: 'Binomial',
  parameters: 'X \\sim \\text{Binomial}(n, p)',
  pmfPdf: '\\binom{n}{k} p^k (1-p)^{n-k}',
  cdf: '...',           // latex string
  mean: 'np',           // latex string
  variance: 'np(1-p)',  // latex string
  mgf: '(1-p+pe^t)^n', // latex string

  // Expanded row sections
  useCases: 'Plain text or HTML string',
  history: 'Plain text or HTML string',
  example: 'Plain text or HTML string',
  relationships: 'Plain text or HTML string',

  // Per-column derivation detail (shown when cell is clicked)
  derivations: {
    pmfPdf: 'latex or text',
    cdf: 'latex or text',
    mean: 'latex or text',
    variance: 'latex or text',
    mgf: 'latex or text',
  }
}
```

Fields left as empty strings `''` render as "—" in the table.

---

## Instruction Page Link

On the instruction page in `index.html`, add a resource card for the student probability resource **before** the existing "A Student's Guide to Numerical Bayes" card in the Resources section. Style consistent with the existing card. Also update the section subtitle from "One active, more to come" to "Two active, more to come".

---

## Out of Scope

- Search or filter by distribution type
- User accounts or saved state
- Mobile-optimized layout (desktop-first is fine)
- The existing `student-probability-resource/` Next.js subproject is untouched
