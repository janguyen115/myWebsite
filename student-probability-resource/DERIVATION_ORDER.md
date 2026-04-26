/**
 * DERIVATION ORDER: Probability Distributions
 * 
 * This document outlines the optimal order to derive all 16 distributions.
 * The order is designed to:
 * 1. Start with simple, foundational distributions
 * 2. Build toward more complex distributions using earlier ones
 * 3. Show key limit relationships and transformations
 * 4. Highlight conjugate priors and important applications
 */

/* ============================================================================
   PHASE 1: FOUNDATIONS (Weeks 1-2)
   ============================================================================
   
   Start with distributions that don't require advanced techniques and will
   support everything else. These are also commonly used in intro stats.
*/

// 1. UNIFORM (Continuous)
//    Why first: Easiest distribution. Constant PDF, simple integrals.
//              Basis for inverse transform sampling.
//    Time: 60 min
//    Derivations needed:
//    - Mean: Simple integral, no substitution needed
//    - Variance: Slightly trickier, but straightforward
//    - CDF: Direct integration
//    - MGF: Basic exponential integral
//    Example: Waiting time [0, 10 minutes]

// 2. UNIFORM (Discrete)
//    Why second: Same concepts as continuous, but simpler summation.
//               Reinforces discrete vs continuous thinking.
//    Time: 40 min
//    Derivations: Similar to continuous
//    Example: Fair die roll

// 3. BERNOULLI
//    Why third: Simplest probability distribution. Single trial.
//              Foundation for Binomial.
//    Time: 30 min
//    Derivations:
//    - Mean: E[X] = p (from definition)
//    - Variance: E[X²] - (E[X])² = p(1-p)
//    - MGF: Straightforward
//    Example: Coin flip

// 4. BINOMIAL
//    Why fourth: Sum of independent Bernoullis.
//               Introduces combinatorics naturally.
//    Time: 90 min
//    Derivations:
//    - Mean: E[X] = np (using linearity of expectation + E[Bernoulli])
//    - Variance: Var(X) = np(1-p) (using independence)
//    - MGF: (1-p+pe^t)^n (binomial theorem)
//    Examples: Number of heads in n flips, defective items in batch
//    Key insight: Sum of independent Bernoullis

/* ============================================================================
   PHASE 2: FOUNDATION → CONTINUOUS (Weeks 2-3)
   ============================================================================
   
   Introduce exponential distribution, then build Gamma and Poisson from it.
   These show key limit relationships.
*/

// 5. EXPONENTIAL
//    Why here: Memoryless property. Foundation for Gamma.
//            Special case of Poisson process (continuous time).
//    Time: 75 min
//    Derivations:
//    - Mean: E[X] = 1/λ (integration by parts or MGF)
//    - Variance: 1/λ² 
//    - CDF: Direct integration
//    - MGF: λ/(λ-t)
//    Example: Time until radioactive decay
//    Key insight: Memoryless property (P(X > s+t | X > s) = P(X > t))

// 6. GAMMA
//    Why here: Generalizes Exponential (α=1). Special case: Chi-square.
//            Conjugate prior for rate parameter of Exponential.
//    Time: 100 min
//    Derivations:
//    - Mean: α/β (using Gamma function properties)
//    - Variance: α/β² (using E[X²] calculation)
//    - MGF: (β/(β-t))^α
//    Examples: Sum of independent Exponentials, time until α-th event
//    Key insight: Sum of k Exp(λ) ~ Gamma(k, λ)

// 7. POISSON
//    Why here: Limit of Binomial as n→∞, p→0, np=λ fixed.
//            Models rare events. Shows relationship to Binomial.
//    Time: 75 min
//    Derivations:
//    - Mean: E[X] = λ (from definition or MGF)
//    - Variance: Var(X) = λ (notable: mean = variance!)
//    - MGF: exp(λ(e^t - 1))
//    - PMF: Standard formula
//    Example: Number of cars arriving at intersection per hour
//    Key insight: Limit of Binomial; Poisson → Normal as λ → ∞

/* ============================================================================
   PHASE 3: DISCRETE (Week 3)
   ============================================================================
   
   Finish the discrete distributions. These are quicker than continuous.
*/

// 8. GEOMETRIC
//    Why here: Number of trials until first success.
//            Memoryless property (like Exponential).
//            Foundation for Negative Binomial.
//    Time: 60 min
//    Derivations:
//    - Mean: 1/p (using infinite series formula)
//    - Variance: (1-p)/p²
//    - MGF: pe^t / (1 - (1-p)e^t)
//    Example: Number of flips until first heads
//    Key insight: Memoryless property

// 9. NEGATIVE BINOMIAL
//    Why here: Generalizes Geometric (r=1).
//            Number of failures before r-th success.
//    Time: 75 min
//    Derivations:
//    - Mean: r(1-p)/p (from Gamma-Poisson relationship or direct)
//    - Variance: r(1-p)/p²
//    - PMF: Extended combination formula
//    Example: Defects before 5th success
//    Key insight: Generalization of Geometric

// 10. HYPERGEOMETRIC
//     Why here: Sampling without replacement.
//             Shows how Binomial approximates when N is large.
//     Time: 70 min
//     Derivations:
//     - Mean: n(K/N) (symmetry argument or direct)
//     - Variance: Complex, but shows relationship to Binomial
//     Example: Cards drawn from deck without replacement
//     Key insight: Binomial as N → ∞

/* ============================================================================
   PHASE 4: NORMAL & FOUNDATIONS FOR SAMPLING DISTRIBUTIONS (Week 4)
   ============================================================================
   
   The Normal distribution is the most important. Chi-square, t, and F
   are all related to Normal distribution theory.
*/

// 11. NORMAL (Gaussian)
//     Why here: Central limit theorem.
//             Foundation for Chi-square, t-distribution, F-distribution.
//             Most important in statistics.
//     Time: 120 min
//     Derivations:
//     - Mean: E[X] = μ (by symmetry or MGF)
//     - Variance: E[X²] - μ² = σ² (by completing the square in MGF)
//     - CDF: Only expressible in terms of Φ (no closed form)
//     - MGF: exp(μt + σ²t²/2) (completing the square)
//     Example: Heights of population, IQ scores
//     Key insight: Central Limit Theorem; Sum of Normals is Normal
//     Challenge: Variance derivation requires careful algebra

// 12. CHI-SQUARE
//     Why here: Sum of squared standard Normals.
//             Special case of Gamma(ν/2, 1/2).
//             Used in goodness-of-fit tests, confidence intervals.
//     Time: 60 min
//     Derivations:
//     - Mean: ν (from Gamma property)
//     - Variance: 2ν (from Gamma property)
//     - MGF: (1-2t)^(-ν/2) (from Gamma)
//     Example: Sample variance test statistic
//     Key insight: χ²(ν) = Gamma(ν/2, 1/2) = sum of ν independent N(0,1)²

// 13. t-DISTRIBUTION
//     Why here: Ratio of N(0,1) to √(χ²/ν).
//             Central to t-tests, confidence intervals.
//     Time: 90 min
//     Derivations:
//     - Mean: 0 (ν>1, by symmetry)
//     - Variance: ν/(ν-2) (complex integral; often looked up)
//     - PDF: Gamma function form (not typically derived from scratch)
//     Example: Test statistic for unknown σ
//     Key insight: Heavy tails; approaches Normal as ν → ∞
//     Note: This is harder—you may defer the PDF derivation

// 14. F-DISTRIBUTION
//     Why here: Ratio of two independent χ² distributions (normalized).
//             Used in ANOVA, equality of variances tests.
//     Time: 80 min
//     Derivations:
//     - Mean: d₂/(d₂-2) (from Gamma ratios)
//     - Variance: Complex (often looked up)
//     - Transformation: If Y = F(d₁,d₂), relate to χ²
//     Example: ANOVA F-statistic
//     Key insight: F(d₁,d₂) = [χ²(d₁)/d₁] / [χ²(d₂)/d₂]

/* ============================================================================
   PHASE 5: SPECIAL CASES & APPLICATIONS (Week 5)
   ============================================================================
   
   These show important transformations and applications.
   Fewer derivations needed—mostly show relationships.
*/

// 15. LOGNORMAL
//     Why here: Y = e^X where X ~ Normal.
//             Models right-skewed data (income, file sizes, etc.)
//     Time: 80 min
//     Derivations:
//     - PDF: Change of variables from Normal
//     - Mean: exp(μ + σ²/2) (from moment generating properties)
//     - Variance: Complex but derivable
//     - Key: E[X] ≠ e^(E[ln X]) (Jensen's inequality)
//     Example: Asset prices (financial modeling)
//     Key insight: Y = e^X ~ Lognormal if X ~ Normal

// 16. BETA
//     Why here: Conjugate prior for Binomial probability p.
//             Supports [0,1], flexible shape.
//             Foundation for Dirichlet (multivariate).
//     Time: 110 min
//     Derivations:
//     - Mean: α/(α+β) (using Beta function properties)
//     - Variance: Complex, but derivable
//     - MGF: Series expansion (no closed form)
//     - Connection: If X~Gamma(α,1) and Y~Gamma(β,1), then X/(X+Y)~Beta(α,β)
//     Example: Prior distribution for coin bias
//     Key insight: Conjugate prior for Binomial

// OPTIONAL ADVANCED:
// - WEIBULL: Generalization of Exponential, reliability modeling
// - PARETO: Power law distributions, "80-20" rule
// - CAUCHY: Pathological example (no mean/variance), ratio of Normals

/* ============================================================================
   DERIVATION SUMMARY BY PHASE
   ============================================================================

   PHASE 1 (Week 1):    Uniform, Bernoulli, Binomial          (Weeks 1-2)
   PHASE 2 (Week 2-3):  Exponential, Gamma, Poisson           (Weeks 2-3)
   PHASE 3 (Week 3):    Geometric, Neg. Binomial, Hyper.      (Week 3)
   PHASE 4 (Week 4):    Normal, Chi-sq, t, F                  (Week 4)
   PHASE 5 (Week 5):    Lognormal, Beta                        (Week 5)

   TOTAL TIME: ~25-30 hours of derivation work
               ~10-12 hours of development

============================================================================

   TIPS FOR SUCCESS:

   1. WRITE BY HAND FIRST
      - Derive everything on paper before typing into the code
      - This builds muscle memory and understanding
      - Catch errors early

   2. STEP-BY-STEP EXPLANATIONS
      - Don't skip steps, even if obvious
      - Explain *why* each step is valid
      - Future you will appreciate this

   3. CHECK YOUR WORK
      - Verify E[X] from MGF: M'(0) = E[X]
      - Check E[X²] from MGF: M''(0) = E[X²]
      - Compute Var from definition: E[X²] - (E[X])²
      - Compare to formula

   4. NOTE ASSUMPTIONS
      - State domain restrictions (e.g., t < λ for MGF)
      - Note when formulas break down (e.g., Var undefined for Cauchy)

   5. RELATE TO PREVIOUS DISTRIBUTIONS
      - "This is like [distribution] but..."
      - "This reduces to [distribution] when..."
      - "This limits to [distribution] as..."

   6. EXAMPLES SHOULD BE NUMERICAL
      - At least one example with concrete numbers
      - Show calculation steps, not just answers
      - Include interpretation ("This means...")

============================================================================

   RECOMMENDED BATCH APPROACH:

   Week 1 (Foundations):
   - Monday:   Uniform (Cont) + Uniform (Disc) = Done before lunch
   - Tuesday:  Bernoulli + Binomial
   - Wed-Thu:  Catch up, refine derivations, write examples
   - Friday:   Code review, prepare for Phase 2

   Week 2-3 (Exponential family):
   - Monday:   Exponential (detailed, with memoryless proof)
   - Tuesday:  Gamma (show Exp as special case)
   - Wednesday: Poisson (show limit from Binomial)
   - Thursday-Friday: Connect all three, write examples

   Week 3 (Discrete):
   - Mon-Tue: Geometric + Negative Binomial (related pair)
   - Wed:     Hypergeometric (one day)
   - Thu-Fri: Refinement

   Week 4 (Normal & Sampling):
   - Mon-Tue: Normal (this is deep, allow time)
   - Wed:     Chi-square (relatively quick, use Gamma)
   - Thu:     t-distribution (harder, may defer PDF proof)
   - Fri:     F-distribution

   Week 5 (Applications):
   - Mon-Tue: Lognormal
   - Wed-Thu: Beta (complex, two days)
   - Fri:     Review all, finalize code

*/

export const DERIVATION_ORDER = [
  // Phase 1: Foundations
  'uniform-continuous',
  'uniform-discrete',
  'bernoulli',
  'binomial',

  // Phase 2: Exponential Family
  'exponential',
  'gamma',
  'poisson',

  // Phase 3: Discrete Finishing
  'geometric',
  'negative-binomial',
  'hypergeometric',

  // Phase 4: Normal & Sampling Distributions
  'normal',
  'chi-square',
  't-distribution',
  'f-distribution',

  // Phase 5: Applications
  'lognormal',
  'beta',

  // Optional Advanced
  // 'weibull',
  // 'pareto',
  // 'cauchy',
];

export const PHASE_SCHEDULE = {
  PHASE_1: ['uniform-continuous', 'uniform-discrete', 'bernoulli', 'binomial'],
  PHASE_2: ['exponential', 'gamma', 'poisson'],
  PHASE_3: ['geometric', 'negative-binomial', 'hypergeometric'],
  PHASE_4: ['normal', 'chi-square', 't-distribution', 'f-distribution'],
  PHASE_5: ['lognormal', 'beta'],
};

// Estimated hours per distribution (total derivation time)
export const TIME_ESTIMATES = {
  'uniform-continuous': 60,
  'uniform-discrete': 40,
  'bernoulli': 30,
  'binomial': 90,
  'exponential': 75,
  'gamma': 100,
  'poisson': 75,
  'geometric': 60,
  'negative-binomial': 75,
  'hypergeometric': 70,
  'normal': 120,
  'chi-square': 60,
  't-distribution': 90,
  'f-distribution': 80,
  'lognormal': 80,
  'beta': 110,
};
