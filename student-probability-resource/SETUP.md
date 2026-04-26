# Probability Distributions Reference - Setup Guide

## Quick Start

### 1. Copy Files to Your Project

```bash
# From your myWebsite project root
cp -r distribution-resource/src/* src/

# Or if you prefer to merge:
cp distribution-resource/src/components/* src/components/
cp distribution-resource/src/lib/* src/lib/
cp distribution-resource/src/styles/* src/styles/
```

### 2. Install Dependencies

```bash
npm install react-katex katex framer-motion lucide-react
```

### 3. Import in Your Page

```tsx
// pages/distributions.tsx (or whatever your page path is)
import { DistributionTable } from '@/components/DistributionTable';

export default function DistributionsPage() {
  return (
    <div>
      <DistributionTable />
    </div>
  );
}
```

### 4. Add CSS to Global Styles (if not auto-imported)

```tsx
// _app.tsx or layout.tsx
import '@/styles/distributions.css';
```

## Project Structure

```
distribution-resource/
├── src/
│   ├── components/
│   │   ├── DistributionTable.tsx       # Main container
│   │   ├── TableHeader.tsx              # Column headers
│   │   ├── DistributionRow.tsx          # Single row + expansion
│   │   ├── DetailsPanel.tsx             # Comments, examples, related
│   │   ├── DerivationPanel.tsx          # Right-side derivation panel
│   │   ├── ColumnToggle.tsx             # Sidebar column visibility
│   │   └── FormulaCell.tsx              # Reusable formula cell
│   ├── lib/
│   │   ├── types.ts                     # TypeScript interfaces
│   │   └── distributions.ts             # Distribution data
│   └── styles/
│       └── distributions.css            # All styling
├── DERIVATION_ORDER.md                 # Recommended derivation sequence
├── package.json
└── README.md
```

## How to Add Distributions

### Step 1: Derive on Paper

Before coding, hand-derive:
1. Mean (E[X])
2. Variance (Var(X))
3. CDF (if applicable)
4. MGF (if exists)
5. 2-3 worked examples
6. 3-5 insightful comments

### Step 2: Fill in `distributions.ts`

Use the TEMPLATE in `lib/distributions.ts` and fill in all fields:

```typescript
const distributions: Distribution[] = [
  {
    id: 'your-distribution',
    name: 'Your Distribution',
    type: 'continuous',
    
    parameters: [
      {
        symbol: 'θ',
        constraints: 'θ > 0',
        description: 'Parameter description'
      }
    ],
    
    support: '[0, ∞)',
    
    pmfPdf: {
      formula: 'f(x) = ...',
      latex: 'f(x) = \\frac{...}{...}',
      domain: '[0, ∞)'
    },
    
    mean: {
      formula: 'E[X] = θ',
      latex: 'E[X] = \\theta',
      derivation: `
Step 1: Start with definition...
Step 2: Substitute...
Step 3: [Continue with detailed steps]
      `.trim(),
      notes: 'Optional notes'
    },
    
    // ... variance, cdf, mgf follow same pattern
    
    examples: [
      {
        title: 'Example Title',
        description: 'What this example demonstrates',
        setup: 'Given: ...',
        calculation: 'Step 1: ...',
        answer: 'Final answer with interpretation'
      }
    ],
    
    comments: [
      'First observation',
      'Second observation',
      'Relationship to other distributions'
    ],
    
    relatedDistributions: [
      {
        name: 'Related Distribution',
        relationship: 'Limit of'
      }
    ]
  }
];
```

### Step 3: LaTeX Formatting Tips

Use `\\` for backslashes in TypeScript strings:

```typescript
// ✗ Wrong
latex: 'f(x) = \frac{1}{2}'

// ✓ Correct
latex: 'f(x) = \\frac{1}{2}'

// Common patterns:
// Fractions: \\frac{numerator}{denominator}
// Powers: x^2 or x^{2n}
// Subscripts: x_i or x_{i+1}
// Integrations: \\int_a^b
// Summations: \\sum_{i=1}^{n}
// Limits: \\lim_{n \\to \\infty}
```

### Step 4: Derivation Step Formatting

Write derivation steps with clear numbering:

```typescript
derivation: `
Step 1: By definition of expectation
  E[X] = ∫ x f(x) dx

Step 2: Substitute f(x) = ...
  E[X] = ∫ x · [formula] dx

Step 3: Factor out constants
  E[X] = [constant] · ∫ [simplified] dx

Step 4: Integrate
  E[X] = [result]

Step 5: Simplify
  E[X] = θ

Conclusion: E[X] = θ
`.trim()
```

The parser will automatically split by "Step X:" so be consistent.

## Recommended Derivation Order

See `DERIVATION_ORDER.md` for the full progression with timing estimates.

**Quick version:**
1. **Uniform** (60 min) - Easiest, foundation for everything
2. **Bernoulli** (30 min) - Simple, leads to Binomial
3. **Binomial** (90 min) - Key discrete distribution
4. **Exponential** (75 min) - Foundation for Gamma
5. **Gamma** (100 min) - Generalizes Exponential
6. **Poisson** (75 min) - Shows Binomial limit
7. **Normal** (120 min) - Most important
8. **Chi-square** (60 min) - Special case of Gamma
9. **t-distribution** (90 min) - For hypothesis testing
10. **F-distribution** (80 min) - For ANOVA
11. **Geometric** (60 min) - Number of trials until success
12. **Negative Binomial** (75 min) - Generalizes Geometric
13. **Hypergeometric** (70 min) - Sampling without replacement
14. **Lognormal** (80 min) - Transformation of Normal
15. **Beta** (110 min) - Conjugate prior for Binomial

Total: ~1,245 minutes ≈ 20-21 hours

## Styling & Customization

### Colors

Edit `:root` in `distributions.css`:

```css
:root {
  --color-primary: #366092;        /* Blue */
  --color-secondary: #b85042;      /* Red */
  --color-success: #27ae60;        /* Green */
  --color-discrete: #f5f5f5;       /* Light gray for discrete badge */
  --color-continuous: #fffacd;     /* Light yellow for continuous badge */
}
```

### Layout

- Sidebar width: 200px (change in `.column-toggle-sidebar`)
- Derivation panel width: 600px (change in `.derivation-panel`)
- Column widths: Edit `distribution-table-header` grid-template-columns

## Development Tips

### Hot Reload

Next.js handles automatic reloading. Just save your changes to `distributions.ts`:

```typescript
// Edit this
distributions.ts
// → Auto-refresh in browser
```

### Debugging

Add console logs in components:

```typescript
const handleOpenDerivation = useCallback(
  (distributionId: string, column: string) => {
    console.log('Opening derivation:', { distributionId, column });
    setActiveDerivation({ distributionId, column });
  },
  []
);
```

### Testing LaTeX

Copy a LaTeX string and test it at: https://www.overleaf.com/

```latex
f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
```

## Deployment to myWebsite

### When ready to deploy:

```bash
# From distribution-resource/
npm run build

# Move to myWebsite
cp -r src/* ../janguyen115.github.io/myWebsite/src/

# In myWebsite:
npm run build
npm run deploy
```

### Or integrate directly:

Copy the components folder into your myWebsite project and import:

```tsx
// pages/distributions.tsx
import { DistributionTable } from '@/components/DistributionTable';

export default function Distributions() {
  return (
    <main>
      <DistributionTable />
    </main>
  );
}
```

## Common Issues & Solutions

### Issue: LaTeX not rendering
**Solution**: Make sure `react-katex` is installed:
```bash
npm install react-katex katex
```

### Issue: Styles not applying
**Solution**: Import CSS in your root layout/page:
```tsx
import '@/styles/distributions.css';
```

### Issue: Derivation panel overlaps text
**Solution**: This is intentional (overlay with backdrop). Close with the X button or click outside.

### Issue: Too many columns visible
**Solution**: Use the column toggle sidebar to hide CDF/MGF if you haven't derived them yet.

## Performance Notes

- Component is optimized with `useCallback` to prevent unnecessary re-renders
- Large derivations should be fine (CSS handles overflow with scrolling)
- Responsive design handles mobile (single-column layout)

## Next Steps

1. ✅ Copy files to your project
2. ✅ Install dependencies
3. ✅ Choose starting distribution
4. 📝 Hand-derive on paper
5. 💻 Fill in `distributions.ts`
6. 🧪 Test in browser
7. ✨ Iterate

Good luck! This is a solid learning project. The act of writing out all the derivations will cement your understanding.
