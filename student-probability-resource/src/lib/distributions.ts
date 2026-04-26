/**
 * Probability Distributions Reference Data
 * 
 * Fill in derivations, examples, and comments for each distribution.
 * Derive everything from first principles before adding to this file.
 */

import { Distribution } from './types';

/**
 * TEMPLATE FOR NEW DISTRIBUTION
 * Copy this and fill in all fields
 */
const TEMPLATE: Distribution = {
  id: 'template',
  name: 'Template Distribution',
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
    latex: 'f(x) = ...',
    domain: '[0, ∞)'
  },
  
  mean: {
    formula: 'E[X] = θ',
    latex: 'E[X] = \\theta',
    derivation: `
Step 1: Start with definition
  E[X] = ∫₀^∞ x f(x) dx

Step 2: Substitute f(x)
  E[X] = ∫₀^∞ x · [formula] dx

Step 3: [Your derivation steps here]
  [Explain each algebraic step]

Step 4: [Continue...]
  
Conclusion: E[X] = θ
    `.trim(),
    notes: 'Optional derivation notes'
  },
  
  variance: {
    formula: 'Var(X) = θ²',
    latex: 'Var(X) = \\theta^2',
    derivation: `
Step 1: Use Var(X) = E[X²] - (E[X])²

Step 2: Calculate E[X²]
  E[X²] = ∫₀^∞ x² f(x) dx

Step 3: [Your derivation steps]

Step 4: Subtract (E[X])²
  Var(X) = [result] - θ²
  
Conclusion: Var(X) = θ²
    `.trim(),
    notes: 'Alternative: Use MGF derivative formula'
  },
  
  cdf: {
    formula: 'F(x) = 1 - e^(-x/θ)',
    latex: 'F(x) = 1 - e^{-x/\\theta}',
    derivation: `
Step 1: F(x) = ∫₀^x f(u) du

Step 2: Substitute f(u)
  F(x) = ∫₀^x ... du

Step 3: [Integrate]

Conclusion: F(x) = 1 - e^(-x/θ)
    `.trim()
  },
  
  mgf: {
    formula: 'M(t) = (1 - θt)^(-1)',
    latex: 'M(t) = (1 - \\theta t)^{-1}',
    derivation: `
Step 1: M(t) = E[e^(tX)] = ∫₀^∞ e^(tx) f(x) dx

Step 2: Substitute f(x)
  M(t) = ∫₀^∞ e^(tx) ... dx

Step 3: [Integrate using substitution or integration by parts]

Step 4: [Simplify]

Conclusion: M(t) = (1 - θt)^(-1) for t < 1/θ
    `.trim(),
    notes: 'Verify: M\'(0) should equal E[X]'
  },
  
  examples: [
    {
      title: 'Example 1: Basic calculation',
      description: 'A simple scenario',
      setup: 'Given: [Setup here]',
      calculation: `
Step 1: [Your calculation]
Step 2: [Continue]
      `.trim(),
      answer: 'Answer: [Result with interpretation]'
    }
  ],
  
  comments: [
    'First comment: Key property or intuition',
    'Second comment: Application or special case',
    'Third comment: Relationship to other distributions'
  ],
  
  relatedDistributions: [
    {
      name: 'Other Distribution',
      relationship: 'Special case of'
    }
  ]
};

/**
 * ACTUAL DISTRIBUTIONS - Add as you derive them
 */
export const distributions: Distribution[] = [
  // FOUNDATION DISTRIBUTIONS (Start here)
  
  {
    id: 'uniform-continuous',
    name: 'Uniform (Continuous)',
    type: 'continuous',
    
    parameters: [
      {
        symbol: 'a, b',
        constraints: 'a, b ∈ ℝ, a < b',
        description: 'Lower and upper bounds'
      }
    ],
    
    support: '[a, b]',
    
    pmfPdf: {
      formula: 'f(x) = 1/(b - a) for a ≤ x ≤ b; 0 otherwise',
      latex: 'f(x) = \\begin{cases} \\frac{1}{b-a} & \\text{if } a \\leq x \\leq b \\\\ 0 & \\text{otherwise} \\end{cases}',
      domain: '[a, b]'
    },
    
    mean: {
      formula: 'E[X] = (a + b)/2',
      latex: 'E[X] = \\frac{a + b}{2}',
      derivation: `
Step 1: By definition of expectation
  E[X] = ∫ₐᵇ x · f(x) dx = ∫ₐᵇ x · 1/(b-a) dx

Step 2: Factor out constant
  E[X] = 1/(b-a) · ∫ₐᵇ x dx

Step 3: Integrate
  E[X] = 1/(b-a) · [x²/2]ₐᵇ = 1/(b-a) · (b²/2 - a²/2)

Step 4: Simplify
  E[X] = (b² - a²) / (2(b-a)) = (b+a)(b-a) / (2(b-a)) = (a+b)/2

Conclusion: E[X] = (a + b)/2
      `.trim(),
      notes: 'Intuitively, the mean of a symmetric distribution is the midpoint'
    },
    
    variance: {
      formula: 'Var(X) = (b - a)²/12',
      latex: 'Var(X) = \\frac{(b-a)^2}{12}',
      derivation: `
Step 1: Calculate E[X²]
  E[X²] = ∫ₐᵇ x² · 1/(b-a) dx = 1/(b-a) · ∫ₐᵇ x² dx

Step 2: Integrate
  E[X²] = 1/(b-a) · [x³/3]ₐᵇ = 1/(b-a) · (b³/3 - a³/3)

Step 3: Simplify using b³ - a³ = (b-a)(b² + ab + a²)
  E[X²] = (b² + ab + a²)/3

Step 4: Use Var(X) = E[X²] - (E[X])²
  Var(X) = (b² + ab + a²)/3 - ((a+b)/2)²
         = (b² + ab + a²)/3 - (a² + 2ab + b²)/4

Step 5: Find common denominator (12)
  Var(X) = 4(b² + ab + a²)/12 - 3(a² + 2ab + b²)/12
         = (4b² + 4ab + 4a² - 3a² - 6ab - 3b²)/12
         = (b² - 2ab + a²)/12
         = (b - a)²/12

Conclusion: Var(X) = (b - a)²/12
      `.trim()
    },
    
    cdf: {
      formula: 'F(x) = (x - a)/(b - a) for a ≤ x ≤ b',
      latex: 'F(x) = \\begin{cases} 0 & \\text{if } x < a \\\\ \\frac{x-a}{b-a} & \\text{if } a \\leq x \\leq b \\\\ 1 & \\text{if } x > b \\end{cases}',
      derivation: `
Step 1: F(x) = P(X ≤ x) = ∫ₐˣ f(u) du = ∫ₐˣ 1/(b-a) du

Step 2: Integrate
  F(x) = 1/(b-a) · [u]ₐˣ = 1/(b-a) · (x - a)

Step 3: Simplify
  F(x) = (x - a)/(b - a)

Conclusion: Verified for a ≤ x ≤ b
      `.trim()
    },
    
    mgf: {
      formula: 'M(t) = (e^(bt) - e^(at))/(t(b - a))',
      latex: 'M(t) = \\frac{e^{bt} - e^{at}}{t(b-a)}',
      derivation: `
Step 1: By definition
  M(t) = E[e^(tX)] = ∫ₐᵇ e^(tx) · 1/(b-a) dx

Step 2: Factor out constant
  M(t) = 1/(b-a) · ∫ₐᵇ e^(tx) dx

Step 3: Integrate (∫e^(tx)dx = e^(tx)/t)
  M(t) = 1/(b-a) · [e^(tx)/t]ₐᵇ = 1/(b-a) · (e^(bt)/t - e^(at)/t)

Step 4: Factor and simplify
  M(t) = (e^(bt) - e^(at))/(t(b-a))

Conclusion: M(t) = (e^(bt) - e^(at))/(t(b-a)) for t ≠ 0
      `.trim(),
      notes: 'For t = 0, use L\'Hôpital\'s rule to recover M(0) = 1'
    },
    
    examples: [
      {
        title: 'Example 1: Waiting time [0, 10 minutes]',
        description: 'A bus arrives uniformly between 0 and 10 minutes. What is the expected wait time?',
        setup: 'X ~ Uniform(0, 10), find E[X]',
        calculation: `
E[X] = (a + b)/2 = (0 + 10)/2 = 5 minutes
        `.trim(),
        answer: 'Expected wait: 5 minutes'
      },
      {
        title: 'Example 2: Variance of [0, 10] uniform',
        description: 'Calculate the variance of the waiting time',
        setup: 'X ~ Uniform(0, 10), find Var(X)',
        calculation: `
Var(X) = (b - a)²/12 = (10 - 0)²/12 = 100/12 ≈ 8.33

SD(X) = √8.33 ≈ 2.89 minutes
        `.trim(),
        answer: 'Variance: 100/12; Standard deviation: ~2.89 minutes'
      }
    ],
    
    comments: [
      'Uniform distribution has constant probability density over its domain',
      'No memorization needed—E[X] is just the midpoint, always',
      'Foundation for inverse transform sampling: if U ~ Uniform(0,1), then a + U(b-a) ~ Uniform(a,b)',
      'The only continuous distribution where every sub-interval has equal probability'
    ],
    
    relatedDistributions: [
      {
        name: 'Uniform (Discrete)',
        relationship: 'Discrete analog'
      },
      {
        name: 'Beta',
        relationship: 'Generalization (Beta(1,1) = Uniform(0,1))'
      }
    ]
  },
  
  // Add more distributions here as you derive them
  // Follow the same structure as Uniform above
  
];

// Placeholder counts to track progress
export const TOTAL_DISTRIBUTIONS = 16;
export const COMPLETED_DISTRIBUTIONS = distributions.length;
export const REMAINING = TOTAL_DISTRIBUTIONS - COMPLETED_DISTRIBUTIONS;
