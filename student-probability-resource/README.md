# Probability Distributions Interactive Reference

This is a self-contained React component library for building an interactive probability distributions reference guide.

## Structure

```
src/
├── components/
│   ├── DistributionTable.tsx       # Main container
│   ├── TableHeader.tsx              # Column headers with toggle
│   ├── DistributionRow.tsx          # Single row
│   ├── DetailsPanel.tsx             # Expanded details (comments, examples)
│   └── DerivationPanel.tsx          # Right-side derivation panel
├── lib/
│   ├── distributions.ts             # All distribution data
│   └── types.ts                     # TypeScript interfaces
└── styles/
    └── distributions.css            # Custom styling
```

## Installation

1. Copy `src/` folder into your React project
2. Install dependencies:
   ```bash
   npm install react-katex katex framer-motion lucide-react
   ```
3. Import in your page:
   ```tsx
   import { DistributionTable } from '@/components/DistributionTable';
   ```

## Usage

```tsx
<DistributionTable />
```

All data lives in `lib/distributions.ts`. Add distributions one at a time.
