/**
 * Type definitions for probability distributions reference
 */

export type DistributionType = 'discrete' | 'continuous';

export interface Parameter {
  symbol: string;
  constraints: string;
  description: string;
}

export interface Formula {
  formula: string; // Plain text formula
  latex: string;   // LaTeX for rendering
}

export interface FormulaWithDerivation extends Formula {
  derivation: string; // Step-by-step derivation (can include markdown or plain text)
  notes?: string;     // Optional notes about derivation
}

export interface Distribution {
  id: string;
  name: string;
  type: DistributionType;
  
  // Basic info
  parameters: Parameter[];
  support: string; // e.g., "[0, ∞)" or "{0, 1, 2, ...}"
  
  // Core distributions
  pmfPdf: Formula & { domain?: string };
  cdf?: FormulaWithDerivation;
  
  // Moments
  mean: FormulaWithDerivation;
  variance: FormulaWithDerivation;
  
  // Advanced
  mgf?: FormulaWithDerivation;
  
  // Learning content
  examples: Example[];
  comments: string[];
  relatedDistributions: RelatedDistribution[];
}

export interface Example {
  title: string;
  description: string;
  setup?: string;        // Problem setup
  calculation?: string;  // Step-by-step calculation
  answer?: string;       // Final answer with interpretation
}

export interface RelatedDistribution {
  name: string;
  relationship: string;  // e.g., "Limit of", "Special case of", "Conjugate prior for"
}

export interface ColumnVisibility {
  mean: boolean;
  variance: boolean;
  cdf: boolean;
  mgf: boolean;
}

export interface ExpandedState {
  [distributionId: string]: {
    detailsOpen: boolean;
    expandedColumn: string | null; // Which column (if any) has derivation open
  };
}
