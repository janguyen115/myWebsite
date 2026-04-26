# Probability Distributions Reference - Complete Project Overview

## 📦 What You've Received

A complete, production-ready React component library for building an interactive probability distributions reference with step-by-step derivations.

### ✨ Features

- **Interactive Table**: Click distribution names to expand details
- **Collapsible Columns**: Toggle E[X], Var(X), CDF, MGF visibility
- **Derivation Panel**: Right-side panel with step-by-step derivations
- **LaTeX Rendering**: Beautiful math typesetting with KaTeX
- **Responsive Design**: Works on desktop, tablet, mobile
- **Dark Mode Ready**: CSS variables for easy theming
- **Print Friendly**: Optimized CSS for printing

---

## 📁 Project Structure

```
distribution-resource/
│
├── 📄 README.md                          # Quick start guide
├── 📄 SETUP.md                           # Detailed setup instructions
├── 📄 DERIVATION_ORDER.md               # Recommended derivation sequence (IMPORTANT!)
├── 📄 PROGRESS_CHECKLIST.md             # Track your progress
├── 📄 package.json                       # Dependencies
│
├── src/
│   │
│   ├── components/                       # React components
│   │   ├── DistributionTable.tsx        # Main container (orchestrates state)
│   │   ├── TableHeader.tsx              # Table header with dynamic columns
│   │   ├── DistributionRow.tsx          # Single row with expand buttons
│   │   ├── DetailsPanel.tsx             # Comments, examples, related distributions
│   │   ├── DerivationPanel.tsx          # Right-side derivation panel
│   │   ├── ColumnToggle.tsx             # Sidebar for column visibility
│   │   └── FormulaCell.tsx              # Reusable formula cell
│   │
│   ├── lib/                              # Data and types
│   │   ├── types.ts                     # TypeScript interfaces
│   │   └── distributions.ts             # ALL DISTRIBUTION DATA GOES HERE
│   │
│   └── styles/
│       └── distributions.css            # All styling (1000+ lines, fully responsive)
│
└── [This file you're reading]
```

---

## 🚀 Quick Start (5 minutes)

### 1. Copy to Your Project
```bash
cd your-myWebsite-project
cp -r /path/to/distribution-resource/src/* src/
cp -r /path/to/distribution-resource/DERIVATION_ORDER.md .
```

### 2. Install Dependencies
```bash
npm install react-katex katex framer-motion lucide-react
```

### 3. Import in Your Page
```tsx
// pages/distributions.tsx
import { DistributionTable } from '@/components/DistributionTable';

export default function DistributionsPage() {
  return <DistributionTable />;
}
```

### 4. Add CSS
```tsx
// In _app.tsx or layout.tsx
import '@/styles/distributions.css';
```

---

## 📝 How to Use This Project

### Phase 1: Start Deriving

1. Open `DERIVATION_ORDER.md`
2. Follow the recommended sequence (starts with Uniform)
3. Hand-derive on paper first
4. Check your work with examples
5. Use `PROGRESS_CHECKLIST.md` to track progress

### Phase 2: Add to Code

For each completed distribution:

1. Edit `src/lib/distributions.ts`
2. Copy the TEMPLATE and fill in all fields
3. Use proper LaTeX formatting
4. Format derivation steps clearly
5. Add 2-3 worked examples
6. Specify related distributions

### Phase 3: Test in Browser

```bash
npm run dev
# Visit http://localhost:3000/distributions
# Click on distribution names, columns, formulas
# Verify LaTeX renders correctly
```

### Phase 4: Deploy

```bash
npm run build
# Copy to your myWebsite project
# Deploy as usual
```

---

## 🎯 Recommended Workflow

### Week 1: Foundations
```
Monday:    Uniform(Cont) + Uniform(Disc) → Code them
Tuesday:   Bernoulli + Binomial → Code them
Wed-Fri:   Refine, add examples, polish
```

### Week 2-3: Exponential Family
```
Mon-Tue:   Exponential (show memoryless property)
Wed:       Gamma (show Exp as special case)
Thu:       Poisson (show Binomial limit)
Fri:       Finish & connect all three
```

### Week 3: Discrete
```
Mon-Tue:   Geometric + Negative Binomial
Wed:       Hypergeometric
Thu-Fri:   Polish & test
```

### Week 4: Normal & Sampling
```
Mon-Tue:   Normal (this is deep—take time!)
Wed:       Chi-square (use Gamma as shortcut)
Thu:       t-distribution
Fri:       F-distribution
```

### Week 5: Applications
```
Mon-Tue:   Lognormal
Wed-Thu:   Beta (complex—two days)
Fri:       Review all, finalize
```

---

## 📚 File-by-File Guide

### `DERIVATION_ORDER.md` ⭐ START HERE
- **What**: The optimal sequence to derive all 16 distributions
- **Why**: Shows dependencies and learning progression
- **Details**: Time estimates, key insights, batch recommendations
- **When to use**: Before starting each distribution
- **Read time**: 15 minutes (but refer back often)

### `PROGRESS_CHECKLIST.md`
- **What**: Checkbox list for tracking your progress
- **Why**: Visibility into what's done vs. what's remaining
- **When to use**: Daily progress tracking
- **How**: Check boxes as you complete each step

### `SETUP.md`
- **What**: Detailed installation and configuration guide
- **Includes**: Troubleshooting, LaTeX tips, deployment steps
- **When to use**: When setting up or encountering issues

### `src/lib/types.ts`
- **What**: TypeScript interfaces for all data structures
- **Why**: Ensures type safety and autocomplete
- **Key types**: Distribution, Formula, FormulaWithDerivation, Example
- **Don't modify**: Unless adding new fields

### `src/lib/distributions.ts`
- **What**: ALL your derivation data goes here
- **Structure**: Array of Distribution objects
- **Template**: Copy-paste template for new distributions
- **What to edit**: Fill in each distribution completely

### `src/components/DistributionTable.tsx`
- **What**: Main container component
- **Handles**: State management, column visibility, panel opening
- **Don't modify**: Unless adding major features
- **Key state**: columnVisibility, expandedState, activeDerivation

### `src/components/DistributionRow.tsx`
- **What**: Single row rendering
- **Shows**: Name, Parameters, Support, PDF/PMF, (optionally) E[X], Var(X), CDF, MGF
- **Clickable**: Name expands details, formula cells open derivation
- **Details expansion**: Shows comments, examples, related distributions

### `src/components/DerivationPanel.tsx`
- **What**: Right-side panel with derivation steps
- **Renders**: LaTeX formulas, step-by-step derivations
- **Features**: Navigation between distributions, notes section
- **Smooth**: Slides in from right with animation

### `src/styles/distributions.css`
- **What**: All styling (mobile responsive)
- **Features**: CSS variables, animations, dark mode ready
- **Breakpoints**: 1200px, 768px
- **Key sections**: Table, panels, responsive, print

---

## 🔑 Key Concepts

### How to Write Derivations

**Bad:**
```typescript
derivation: "E[X] = μ (by symmetry)"
```

**Good:**
```typescript
derivation: `
Step 1: By definition of expectation
  E[X] = ∫ x f(x) dx

Step 2: Substitute f(x) = (1/(σ√(2π))) exp(-(x-μ)²/(2σ²))
  E[X] = ∫ x · (1/(σ√(2π))) exp(-(x-μ)²/(2σ²)) dx

Step 3: By symmetry around μ, the odd part integrates to zero
  E[X] = μ

Conclusion: E[X] = μ
`.trim()
```

### LaTeX Formatting

Remember: In TypeScript strings, use `\\` for backslashes.

```typescript
// ✗ WRONG
latex: 'f(x) = \frac{1}{2}'

// ✓ CORRECT
latex: 'f(x) = \\frac{1}{2}'

// Common commands:
\\frac{a}{b}          // Fractions
x^2                   // Powers (inline)
x^{2n}               // Powers (multiple chars)
x_i                  // Subscripts
\\int_a^b            // Integrals
\\sum_{i=1}^{n}      // Summations
\\lim_{n \\to \\infty}  // Limits
\\sqrt{x}            // Square root
\\left(...\\right)   // Auto-sizing parentheses
```

### How to Verify Your Derivations

For each distribution, verify:

1. **MGF check**: M'(0) = E[X]
   - Derive MGF
   - Take first derivative
   - Evaluate at t=0
   - Should equal E[X]

2. **Variance check**: Var(X) = E[X²] - (E[X])²
   - Calculate E[X] directly
   - Calculate E[X²] directly
   - Verify formula equals direct Var calculation

3. **CDF check**: F(x) = ∫₀^x f(u) du
   - Take derivative: dF/dx should equal f(x)

4. **Examples**: Calculate step-by-step
   - Pick concrete numbers
   - Show every calculation step
   - Compare to formula

---

## 🎨 Customization Guide

### Colors

Edit `:root` in `distributions.css`:

```css
--color-primary: #366092;        /* Main blue */
--color-secondary: #b85042;      /* Accent red */
--color-success: #27ae60;        /* Green for answers */
--color-discrete: #f5f5f5;       /* Light gray badge */
--color-continuous: #fffacd;     /* Light yellow badge */
```

### Layout Changes

- **Sidebar width**: Change `.column-toggle-sidebar { width: ... }`
- **Derivation panel width**: Change `.derivation-panel { width: ... }`
- **Column widths**: Edit `distribution-table-header grid-template-columns`
- **Font**: Change `--font-mono` for code/formulas

### Responsive Breakpoints

- **Large desktop**: Default (1200px+)
- **Tablet**: 768px - 1200px
- **Mobile**: < 768px (single column layout)

---

## 🚨 Common Mistakes

### 1. LaTeX Backslash Issues
```typescript
// ✗ This will break
latex: 'f(x) = \frac{1}{2}'

// ✓ This works
latex: 'f(x) = \\frac{1}{2}'
```

### 2. Incomplete Distributions
Don't skip fields. Even if you can't derive CDF or MGF, leave them empty or note "N/A".

```typescript
cdf: undefined,  // ✓ OK - will show "N/A"
cdf: {          // ✗ Wrong - will show error
  formula: '',
  latex: ''
}
```

### 3. Missing Examples
Include at least one numerical example per distribution. Text examples alone aren't sufficient.

### 4. Inconsistent Notation
In Binomial, use `n` and `p` consistently throughout. Don't switch between `N` and `n`.

### 5. Not Testing LaTeX
Test your LaTeX at: https://www.overleaf.com/
Don't assume it's correct without verification.

---

## 🔗 Integration with myWebsite

### Option 1: Copy-Paste (Easiest)
```bash
cp -r src/* your-myWebsite/src/
```

### Option 2: Git Submodule (Advanced)
```bash
cd your-myWebsite
git submodule add <repo-url> distribution-reference
```

### Option 3: NPM Package (Most Professional)
Create a package at `@jamesanguyen/distributions` on npm.

---

## 📖 Learning Outcomes

After completing this project, you will:

✅ Deeply understand probability distributions
✅ Master mathematical derivations
✅ Practice technical writing (mathematics + code)
✅ Build a professional web component library
✅ Learn React state management
✅ Experience responsive web design
✅ Create a portfolio-quality project

---

## 💡 Tips for Success

1. **Hand-derive everything first**
   - Use paper and pen
   - Don't look up answers
   - Your derivation, your understanding

2. **Write step-by-step**
   - Every algebra step matters
   - Explain *why*, not just *how*
   - Future students (including you) will thank you

3. **Test as you go**
   - Add one distribution at a time
   - Test in browser immediately
   - Catch styling/code issues early

4. **Save your work**
   - Git commit after each distribution
   - Push frequently to GitHub
   - Shows your progress over time

5. **Document everything**
   - Comments in code matter
   - Examples should be clear
   - Your future self needs clarity

---

## 🎓 Resources

**Derivation Help:**
- Your PDF textbook (keep it handy!)
- Mathematical derivations websites
- Wolfram Alpha (to check algebra)

**LaTeX Help:**
- https://www.overleaf.com/ (test LaTeX here)
- https://detexify.kirelabs.org/ (find symbol codes)
- KaTeX docs: https://katex.org/docs/supported.html

**React/TypeScript Help:**
- React docs: https://react.dev/
- TypeScript: https://www.typescriptlang.org/docs/
- Next.js: https://nextjs.org/docs

**Probability Resources:**
- Your textbooks
- Khan Academy (if stuck)
- StatQuest with Josh Starmer (YouTube)

---

## 📞 Troubleshooting

### LaTeX not rendering?
- Verify `react-katex` is installed: `npm list react-katex`
- Check CSS is imported
- Test LaTeX at https://www.overleaf.com/

### Styles not applying?
- Import CSS: `import '@/styles/distributions.css';`
- Clear Next.js cache: `rm -rf .next`

### Components not found?
- Check imports: `import { Component } from '@/components/';`
- Verify path aliases in `next.config.js`

### Slow performance?
- Use React DevTools Profiler
- Check for unnecessary re-renders
- Component already uses `useCallback` optimization

---

## 🎯 Next Steps

1. ✅ **Read** this file
2. ✅ **Read** DERIVATION_ORDER.md
3. ✅ **Skim** SETUP.md
4. ✅ **Start deriving** Uniform distribution (on paper)
5. ✅ **Test setup** by adding Uniform to distributions.ts
6. ✅ **View in browser** and verify it works
7. ✅ **Continue** with next distribution

---

## 🏆 Success Criteria

You'll know you're done when:

- [ ] All 16 distributions have complete derivations
- [ ] All derivations are thoroughly explained (step-by-step)
- [ ] Each distribution has 2-3 worked numerical examples
- [ ] Each distribution has 3-5 insightful comments
- [ ] Related distributions are correctly noted
- [ ] All LaTeX renders correctly
- [ ] Component is responsive (tested on mobile)
- [ ] Website is deployed to myWebsite
- [ ] You understand all the mathematics

---

**Good luck! This is an excellent learning project. The derivations will cement your understanding of probability theory, and the React component library demonstrates professional web development skills.** 🚀

---

## File Manifest

```
✓ README.md                    (450 lines)
✓ SETUP.md                    (380 lines)
✓ DERIVATION_ORDER.md         (450 lines)  ← START HERE for derivations
✓ PROGRESS_CHECKLIST.md       (400 lines)
✓ package.json                (20 lines)
✓ src/lib/types.ts            (70 lines)
✓ src/lib/distributions.ts    (300 lines, with Uniform example)
✓ src/components/*.tsx        (7 components, ~900 lines total)
✓ src/styles/distributions.css (1000+ lines, fully responsive)
```

**Total: ~2,500+ lines of code and documentation**
