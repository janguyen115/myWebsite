# Distributions Sort & Filter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add sort (Default / A–Z) and filter (All / Discrete / Continuous) controls above the Probability Distributions table.

**Architecture:** Add a `type` field to each distribution entry, introduce two state vars (`sortOrder`, `typeFilter`) in `App` that drive a derived `displayedDists` list, and render a new `TableControls` component above the table. No external libraries needed — all plain React state.

**Tech Stack:** React 18 (UMD, browser), Babel standalone, single HTML file, no test runner (verification is manual browser reload).

---

## File Map

| File | Change |
|---|---|
| `instruction_content/distributions.js` | Add `type: 'discrete' \| 'continuous'` to all 13 entries |
| `instruction_content/student-probability-resource.html` | Add `sortOrder`/`typeFilter` state + `displayedDists`, new `TableControls` component, wire both into `App` |

---

### Task 1: Add `type` field to all distribution entries

**Files:**
- Modify: `instruction_content/distributions.js`

- [ ] **Step 1: Add `type` to each entry**

  Open `distributions.js`. For each entry in the `DISTRIBUTIONS` array, add the `type` field immediately after the `id` field. Apply the following mapping:

  ```js
  // Discrete
  id: 'uniform-discrete'   → type: 'discrete'
  id: 'bernoulli'          → type: 'discrete'
  id: 'binomial'           → type: 'discrete'
  id: 'poisson'            → type: 'discrete'
  id: 'geometric'          → type: 'discrete'
  id: 'negative binomial'  → type: 'discrete'
  id: 'hypergeometric'     → type: 'discrete'

  // Continuous
  id: 'uniform-continuous' → type: 'continuous'
  id: 'exponential'        → type: 'continuous'
  id: 'gamma'              → type: 'continuous'
  id: 'normal'             → type: 'continuous'
  id: 'chi-square'         → type: 'continuous'
  id: 'beta'               → type: 'continuous'
  ```

  Example diff for the first entry:
  ```js
  {
    id: 'uniform-discrete',
  + type: 'discrete',
    name: 'Uniform (Discrete)',
  ```

- [ ] **Step 2: Verify in browser**

  Open `student-probability-resource.html` in a browser. Open the console and run:
  ```js
  DISTRIBUTIONS.every(d => d.type === 'discrete' || d.type === 'continuous')
  ```
  Expected: `true`. Also check count:
  ```js
  DISTRIBUTIONS.filter(d => d.type === 'discrete').length  // → 7
  DISTRIBUTIONS.filter(d => d.type === 'continuous').length // → 6
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add instruction_content/distributions.js
  git commit -m "feat: add type field (discrete/continuous) to all distributions"
  ```

---

### Task 2: Add sort/filter state and `displayedDists` to App

**Files:**
- Modify: `instruction_content/student-probability-resource.html` (the `App` function, lines ~757–778)

- [ ] **Step 1: Add two state vars**

  Inside `function App()`, after the existing state declarations, add:

  ```js
  const [sortOrder,   setSortOrder]   = React.useState('default'); // 'default' | 'alpha'
  const [typeFilter,  setTypeFilter]  = React.useState('all');     // 'all' | 'discrete' | 'continuous'
  ```

- [ ] **Step 2: Add `displayedDists` derivation**

  Immediately after the new state vars, add:

  ```js
  const displayedDists = React.useMemo(() => {
    let list = typeFilter === 'all'
      ? DISTRIBUTIONS
      : DISTRIBUTIONS.filter(d => d.type === typeFilter);
    if (sortOrder === 'alpha') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [sortOrder, typeFilter]);
  ```

- [ ] **Step 3: Collapse expanded row when it's filtered out**

  Update `handleSetExpanded` — no change needed there. Instead, add a `React.useEffect` after the `displayedDists` memo:

  ```js
  React.useEffect(() => {
    if (expandedRow && !displayedDists.some(d => d.id === expandedRow)) {
      setExpandedRow(null);
      setActiveCol(null);
    }
  }, [displayedDists, expandedRow]);
  ```

- [ ] **Step 4: Swap `DISTRIBUTIONS.map` for `displayedDists.map` in JSX**

  In the `return` block of `App`, find the table render loop (around line 835):

  ```jsx
  // Before:
  {DISTRIBUTIONS.map(dist => (

  // After:
  {displayedDists.map(dist => (
  ```

- [ ] **Step 5: Verify in browser**

  Reload the page. The table should look identical to before (all 13 rows, same order). Open console and confirm:
  ```js
  // No visible change yet — state defaults are 'default' and 'all'
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add instruction_content/student-probability-resource.html
  git commit -m "feat: add sortOrder/typeFilter state and displayedDists derivation"
  ```

---

### Task 3: Build `TableControls` component

**Files:**
- Modify: `instruction_content/student-probability-resource.html` (add component above `// ─── App`)

- [ ] **Step 1: Add `TableControls` component**

  Insert the following component definition just above the `// ─── App ──` comment line (around line 756):

  ```jsx
  // ─── Table controls ───────────────────────────────────────────────────────────
  function PillGroup({ options, value, onChange }) {
    return (
      <div style={{ display: 'flex' }}>
        {options.map(({ label, val }, i) => {
          const isActive = value === val;
          const isFirst  = i === 0;
          const isLast   = i === options.length - 1;
          return (
            <button
              key={val}
              onClick={() => onChange(val)}
              style={{
                all: 'unset',
                cursor: 'pointer',
                padding: '5px 12px',
                fontFamily: F.sans,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: isActive ? JN.red : JN.mute,
                background: isActive ? JN.redTint : 'transparent',
                border: `1px solid ${isActive ? JN.rule : JN.ruleSoft}`,
                borderRadius: isFirst ? '2px 0 0 2px' : isLast ? '0 2px 2px 0' : '0',
                marginLeft: i > 0 ? -1 : 0,
                position: 'relative',
                zIndex: isActive ? 1 : 0,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(122,26,26,0.04)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  function TableControls({ sortOrder, setSortOrder, typeFilter, setTypeFilter }) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
      }}>
        <PillGroup
          options={[
            { label: 'Default', val: 'default' },
            { label: 'A–Z',     val: 'alpha'   },
          ]}
          value={sortOrder}
          onChange={setSortOrder}
        />
        <PillGroup
          options={[
            { label: 'All',        val: 'all'        },
            { label: 'Discrete',   val: 'discrete'   },
            { label: 'Continuous', val: 'continuous' },
          ]}
          value={typeFilter}
          onChange={setTypeFilter}
        />
      </div>
    );
  }
  ```

- [ ] **Step 2: Verify component is defined**

  Reload the browser. No visible change yet — the component exists but isn't rendered. Console should show no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add instruction_content/student-probability-resource.html
  git commit -m "feat: add TableControls and PillGroup components"
  ```

---

### Task 4: Wire `TableControls` into the App JSX

**Files:**
- Modify: `instruction_content/student-probability-resource.html` (the `App` return block, table section ~line 823)

- [ ] **Step 1: Render `TableControls` above the table**

  In the `App` return, find the table section comment and the `<div style={{ display: 'inline-flex' ... }}>` wrapper. Insert `TableControls` immediately before it:

  ```jsx
  {/* Table section */}
  <section className="jn-content" style={{ padding: '56px 72px 80px' }}>
  + <TableControls
  +   sortOrder={sortOrder}
  +   setSortOrder={setSortOrder}
  +   typeFilter={typeFilter}
  +   setTypeFilter={setTypeFilter}
  + />
    <div style={{ display: 'inline-flex', alignItems: 'stretch' }}>
  ```

- [ ] **Step 2: Verify sort control**

  Reload the browser. The pill controls should appear above the table. Click **A–Z** — all 13 rows should reorder alphabetically by name. Click **Default** — original order restores.

- [ ] **Step 3: Verify filter control**

  Click **Discrete** — table should show only 7 rows (Bernoulli, Binomial, Geometric, Hypergeometric, Negative Binomial, Poisson, Uniform (Discrete)). Click **Continuous** — table should show 6 rows. Click **All** — all 13 rows return.

- [ ] **Step 4: Verify collapse behavior**

  Expand a discrete distribution row (e.g. click Bernoulli). Then click **Continuous** filter. Bernoulli disappears and the expanded row collapses cleanly — no orphaned expanded state.

- [ ] **Step 5: Verify sort + filter compose correctly**

  Set filter to **Discrete**, then click **A–Z**. The 7 discrete distributions should appear in alphabetical order. Switch to **Continuous** — 6 continuous distributions in alphabetical order.

- [ ] **Step 6: Commit**

  ```bash
  git add instruction_content/student-probability-resource.html
  git commit -m "feat: wire sort/filter controls into distributions table"
  ```
