---
title: Probability Distributions — Sort & Filter Controls
date: 2026-04-28
status: approved
---

## Overview

Add sort and filter controls to the Probability Distributions reference table, enabling users to reorder rows alphabetically or restore default order, and to filter rows by distribution type (discrete / continuous).

## Data Changes (`distributions.js`)

Add `type: 'discrete' | 'continuous'` to each distribution entry.

| Distribution | Type |
|---|---|
| Uniform (Discrete) | discrete |
| Bernoulli | discrete |
| Binomial | discrete |
| Poisson | discrete |
| Geometric | discrete |
| Negative Binomial | discrete |
| Hypergeometric | discrete |
| Uniform (Continuous) | continuous |
| Exponential | continuous |
| Gamma | continuous |
| Normal | continuous |
| Chi-Square | continuous |
| Beta | continuous |

## State (`App`)

Two new state vars:

- `sortOrder: 'default' | 'alpha'` — row ordering
- `typeFilter: 'all' | 'discrete' | 'continuous'` — row visibility

`displayedDists` derived value:
1. Filter `DISTRIBUTIONS` by `typeFilter` (skip if `'all'`)
2. Sort by `sortOrder` (stable alpha sort by `name` if `'alpha'`, original array order if `'default'`)

When `typeFilter` changes and the currently-expanded row is no longer in `displayedDists`, collapse it (`setExpandedRow(null)`, `setActiveCol(null)`).

## Controls UI (`TableControls` component)

Rendered above the table, left-aligned, inside the `jn-content` section. Two pill groups in a flex row with a gap between them:

**Left group — Order:**
`[ Default | A–Z ]`

**Right group — Type:**
`[ All | Discrete | Continuous ]`

### Pill styling

- **Active:** background `JN.redTint`, color `JN.red`, border `1px solid JN.rule`
- **Inactive:** background transparent, color `JN.mute`, border `1px solid JN.ruleSoft`
- Font: `F.sans`, 11px, uppercase, letter-spacing `0.14em`
- Padding: `5px 12px`
- Border-radius: `2px`
- Hover (inactive): background `rgba(122,26,26,0.04)`
- Adjacent pills share borders (no double borders) — achieved with negative margin or grouped border logic

## Files Changed

- `instruction_content/distributions.js` — add `type` field to all 13 entries
- `instruction_content/student-probability-resource.html` — add `sortOrder`/`typeFilter` state, `displayedDists` derivation, `TableControls` component, wire into `App`
