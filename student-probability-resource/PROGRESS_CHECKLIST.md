# Distribution Derivation Checklist

Track your progress as you work through each distribution.

## PHASE 1: Foundations (Week 1-2)

### ☐ Uniform (Continuous)
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = (a+b)/2
  - ☐ Var(X) = (b-a)²/12
  - ☐ CDF = (x-a)/(b-a)
  - ☐ MGF = (e^(bt) - e^(at))/(t(b-a))
- **Content**:
  - ☐ 2-3 examples written
  - ☐ 3-5 comments added
  - ☐ Related distributions noted
- **Code**:
  - ☐ Entered in distributions.ts
  - ☐ LaTeX verified in browser
  - ☐ Derivation steps formatted
- **Date started**: _____ | **Date finished**: _____
- **Time spent**: _____ min

### ☐ Uniform (Discrete)
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = (a+b)/2
  - ☐ Var(X) = ((b-a+1)²-1)/12
  - ☐ CDF
  - ☐ MGF
- **Content**: ☐ Examples | ☐ Comments | ☐ Related
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

### ☐ Bernoulli
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = p
  - ☐ Var(X) = p(1-p)
  - ☐ MGF = 1-p+pe^t
- **Content**: ☐ Examples | ☐ Comments | ☐ Related
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

### ☐ Binomial
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = np (use linearity + Bernoulli)
  - ☐ Var(X) = np(1-p) (use independence)
  - ☐ MGF = (1-p+pe^t)^n
- **Content**: ☐ Examples | ☐ Comments | ☐ Related
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

---

## PHASE 2: Exponential Family (Week 2-3)

### ☐ Exponential
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = 1/λ (integration by parts)
  - ☐ Var(X) = 1/λ²
  - ☐ CDF = 1 - e^(-λx)
  - ☐ MGF = λ/(λ-t)
  - ☐ Memoryless property proof
- **Content**: ☐ Examples | ☐ Comments | ☐ Related | ☐ Memoryless example
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

### ☐ Gamma
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = α/β (using Gamma function properties)
  - ☐ Var(X) = α/β²
  - ☐ MGF = (β/(β-t))^α
  - ☐ Show Exponential is special case (α=1)
- **Content**: ☐ Examples | ☐ Comments | ☐ Related (Exponential, Chi-square)
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

### ☐ Poisson
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = λ
  - ☐ Var(X) = λ
  - ☐ MGF = exp(λ(e^t - 1))
  - ☐ Limit of Binomial proof (n→∞, p→0, np=λ)
- **Content**: ☐ Examples | ☐ Comments (mean=var) | ☐ Related (Binomial limit)
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

---

## PHASE 3: Discrete (Week 3)

### ☐ Geometric
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = 1/p (infinite series)
  - ☐ Var(X) = (1-p)/p²
  - ☐ MGF
  - ☐ Memoryless property proof
- **Content**: ☐ Examples | ☐ Comments | ☐ Related
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

### ☐ Negative Binomial
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = r(1-p)/p
  - ☐ Var(X) = r(1-p)/p²
  - ☐ PMF with combination formula
  - ☐ Show Geometric as special case (r=1)
- **Content**: ☐ Examples | ☐ Comments | ☐ Related (Geometric)
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

### ☐ Hypergeometric
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = n(K/N)
  - ☐ Var(X) = n(K/N)(1-K/N)[(N-n)/(N-1)]
  - ☐ PMF
  - ☐ Binomial approximation as N→∞
- **Content**: ☐ Examples | ☐ Comments | ☐ Related (Binomial)
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

---

## PHASE 4: Normal & Sampling Distributions (Week 4)

### ☐ Normal (Gaussian) ⭐ Most Important
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = μ (by symmetry or MGF)
  - ☐ Var(X) = σ² (complete the square in MGF)
  - ☐ MGF = exp(μt + σ²t²/2) (completing the square)
  - ☐ Note: CDF has no closed form
  - ☐ Central Limit Theorem explanation
- **Content**: ☐ Examples | ☐ Comments (68-95-99.7 rule) | ☐ Related
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Estimated time**: 120 min | **Date**: _____ | **Time spent**: _____ min

### ☐ Chi-Square
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = ν (from Gamma)
  - ☐ Var(X) = 2ν (from Gamma)
  - ☐ MGF = (1-2t)^(-ν/2) (from Gamma)
  - ☐ Show as sum of ν independent N(0,1)²
  - ☐ Show as special case of Gamma(ν/2, 1/2)
- **Content**: ☐ Examples | ☐ Comments | ☐ Related (Gamma, Normal)
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

### ☐ t-Distribution
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = 0 (ν>1, by symmetry)
  - ☐ Var(X) = ν/(ν-2) (ν>2)
  - ☐ PDF derivation (note: may defer if complex)
  - ☐ Relationship to N(0,1) and χ²
  - ☐ Limit to Normal as ν→∞
- **Content**: ☐ Examples | ☐ Comments (heavy tails) | ☐ Related
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

### ☐ F-Distribution
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = d₂/(d₂-2) (d₂>2)
  - ☐ Var(X) (complex formula)
  - ☐ Relationship to χ² ratio
  - ☐ Show F(d₁,d₂) = [χ²(d₁)/d₁]/[χ²(d₂)/d₂]
- **Content**: ☐ Examples (ANOVA) | ☐ Comments | ☐ Related (Chi-square)
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

---

## PHASE 5: Special Cases & Applications (Week 5)

### ☐ Lognormal
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ PDF via change of variables (Y = e^X where X ~ Normal)
  - ☐ E[X] = exp(μ + σ²/2)
  - ☐ Var(X) = [exp(σ²)-1]exp(2μ+σ²)
  - ☐ Note: E[X] ≠ e^(E[ln(X)])
- **Content**: ☐ Examples (asset prices) | ☐ Comments (right-skewed) | ☐ Related (Normal)
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Date**: _____ | **Time**: _____ min

### ☐ Beta
- **Status**: Not started | In progress | ✅ Complete
- **Derivations**:
  - ☐ E[X] = α/(α+β)
  - ☐ Var(X) = αβ/[(α+β)²(α+β+1)]
  - ☐ Connection: If X~Gamma(α,1), Y~Gamma(β,1), then X/(X+Y)~Beta(α,β)
  - ☐ Conjugate prior relationship for Binomial
- **Content**: ☐ Examples (coin bias prior) | ☐ Comments | ☐ Related
- **Code**: ☐ In distributions.ts | ☐ Tested
- **Estimated time**: 110 min | **Date**: _____ | **Time spent**: _____ min

---

## COMPONENT DEVELOPMENT CHECKLIST

- ☐ DistributionTable.tsx created & working
- ☐ TableHeader.tsx created & rendering columns dynamically
- ☐ ColumnToggle.tsx created & toggling visibility
- ☐ DistributionRow.tsx created & expanding details
- ☐ DetailsPanel.tsx created & showing comments/examples
- ☐ DerivationPanel.tsx created & rendering LaTeX
- ☐ FormulaCell.tsx created & clickable
- ☐ types.ts defined with all interfaces
- ☐ distributions.css styled & responsive
- ☐ Uniform distribution added to distributions.ts
- ☐ All components tested in browser
- ☐ LaTeX rendering verified
- ☐ Derivation panel slides in/out smoothly
- ☐ Navigation between distributions works
- ☐ Mobile responsive design tested

---

## CODE QUALITY CHECKLIST

For each distribution added:

- ☐ TypeScript compiles without errors
- ☐ All LaTeX strings properly escaped (`\\` for backslashes)
- ☐ Derivation steps formatted consistently
- ☐ Examples include setup, calculation, and answer
- ☐ Comments are meaningful and insightful
- ☐ Related distributions are correct
- ☐ Comments in code explain complex parts
- ☐ No console warnings

---

## SUMMARY

```
Distributions completed: _____ / 16

Phase 1 progress: _____ / 4
Phase 2 progress: _____ / 3
Phase 3 progress: _____ / 3
Phase 4 progress: _____ / 4
Phase 5 progress: _____ / 2

Total derivation time: _____ hours
Total development time: _____ hours
```

**Target completion**: 5 weeks
**Estimated total effort**: 25-30 hours

---

## NOTES

Use this space to track blockers, insights, or things to remember:

[Space for notes]

---

**Good luck! 🎓**
