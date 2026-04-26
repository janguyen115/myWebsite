# Probability Theory Notation Reference

A comprehensive guide to the notation used throughout the probability theory materials on this site. This reference follows conventions standard in modern statistical learning, variational inference, and graduate-level probability theory.

---

## Random Variables & Realizations

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $X, Y, Z$ | `X, Y, Z` | Random variables (uppercase italic) |
| $x, y, z$ | `x, y, z` | Realizations / specific values (lowercase italic) |
| $X_1, X_2, \ldots, X_n$ | `X_1, X_2, \ldots, X_n` | Sequence of random variables |
| $\mathbf{X}$ | `\mathbf{X}` | Random vector |
| $\mathbf{x}$ | `\mathbf{x}` | Realization of a random vector |

---

## Spaces & Supports

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $\mathcal{X}$ | `\mathcal{X}` | Sample space / data space |
| $\mathcal{Y}$ | `\mathcal{Y}` | Output / label space |
| $\mathcal{Z}$ | `\mathcal{Z}` | Latent variable space |
| $\Theta$ | `\Theta` | Parameter space |
| $\mathrm{supp}(X)$ | `\mathrm{supp}(X)` | Support of $X$ (where PDF/PMF is nonzero) |
| $\Omega$ | `\Omega` | Sample space (probability space) |
| $\omega$ | `\omega` | Outcome / element of sample space |

---

## Number Sets

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $\mathbb{R}$ | `\mathbb{R}` | Real numbers |
| $\mathbb{R}^n$ | `\mathbb{R}^n` | $n$-dimensional real space |
| $\mathbb{R}_+$ | `\mathbb{R}_+` | Non-negative reals: $[0, \infty)$ |
| $\mathbb{R}_{>0}$ | `\mathbb{R}_{>0}` | Positive reals: $(0, \infty)$ |
| $\mathbb{N}$ | `\mathbb{N}` | Natural numbers: $\{1, 2, 3, \ldots\}$ |
| $\mathbb{N}_0$ | `\mathbb{N}_0` | Non-negative integers: $\{0, 1, 2, \ldots\}$ |
| $\mathbb{Z}$ | `\mathbb{Z}` | Integers |
| $\mathbb{Q}$ | `\mathbb{Q}` | Rational numbers |
| $\Delta^{k-1}$ | `\Delta^{k-1}` | $(k-1)$-simplex (probability vectors of length $k$) |

---

## Probability & Distributions

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $P(\cdot)$ | `P(\cdot)` | Probability of an event |
| $P(X = x)$ | `P(X = x)` | Probability that $X$ equals $x$ |
| $P(A \mid B)$ | `P(A \mid B)` | Conditional probability of $A$ given $B$ |
| $X \sim D$ | `X \sim D` | $X$ is distributed as $D$ |
| $X \stackrel{d}{=} Y$ | `X \stackrel{d}{=} Y` | $X$ and $Y$ are equal in distribution |
| $X \stackrel{\text{iid}}{\sim} D$ | `X \stackrel{\text{iid}}{\sim} D` | $X$'s are independent and identically distributed |
| $X \perp Y$ | `X \perp Y` | $X$ is independent of $Y$ |
| $X \perp Y \mid Z$ | `X \perp Y \mid Z` | $X$ is conditionally independent of $Y$ given $Z$ |

---

## Distribution Functions

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $F_X(x)$ | `F_X(x)` | Cumulative Distribution Function (CDF) of $X$ |
| $f_X(x)$ | `f_X(x)` | Probability Density Function (PDF) of $X$ |
| $p_X(x)$ or $P_X(x)$ | `p_X(x)` or `P_X(x)` | Probability Mass Function (PMF) of $X$ |
| $M_X(t)$ | `M_X(t)` | Moment Generating Function (MGF) of $X$ |
| $\varphi_X(t)$ | `\varphi_X(t)` | Characteristic function of $X$ |
| $\bar{F}_X(x)$ | `\bar{F}_X(x)` | Survival function: $P(X > x) = 1 - F_X(x)$ |
| $f_{X,Y}(x,y)$ | `f_{X,Y}(x,y)` | Joint PDF of $X$ and $Y$ |
| $f_{X \mid Y}(x \mid y)$ | `f_{X \mid Y}(x \mid y)` | Conditional PDF of $X$ given $Y$ |

---

## Expectation, Variance & Moments

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $E[X]$ | `E[X]` | Expected value of $X$ |
| $E[X \mid Y]$ | `E[X \mid Y]` | Conditional expectation |
| $\text{Var}(X)$ | `\text{Var}(X)` | Variance of $X$ |
| $\text{SD}(X)$ | `\text{SD}(X)` | Standard deviation: $\sqrt{\text{Var}(X)}$ |
| $\text{Cov}(X, Y)$ | `\text{Cov}(X, Y)` | Covariance of $X$ and $Y$ |
| $\rho(X, Y)$ | `\rho(X, Y)` | Correlation: $\text{Cov}(X,Y) / (\text{SD}(X)\text{SD}(Y))$ |
| $\mu$ | `\mu` | Mean (often $E[X] = \mu$) |
| $\sigma^2$ | `\sigma^2` | Variance (often $\text{Var}(X) = \sigma^2$) |
| $\sigma$ | `\sigma` | Standard deviation |
| $\mu_k = E[X^k]$ | `\mu_k = E[X^k]` | $k$-th raw moment |
| $\mu'_k = E[(X - \mu)^k]$ | `\mu'_k = E[(X - \mu)^k]` | $k$-th central moment |

---

## Common Distribution Notation

| Distribution | Notation | Parameters |
|--------------|----------|------------|
| Bernoulli | $X \sim \text{Bern}(p)$ | $p \in [0,1]$ |
| Binomial | $X \sim \text{Bin}(n, p)$ | $n \in \mathbb{N}$, $p \in [0,1]$ |
| Geometric | $X \sim \text{Geom}(p)$ | $p \in (0, 1]$ |
| Negative Binomial | $X \sim \text{NB}(r, p)$ | $r > 0$, $p \in (0, 1]$ |
| Poisson | $X \sim \text{Pois}(\lambda)$ | $\lambda > 0$ |
| Hypergeometric | $X \sim \text{Hyp}(N, K, n)$ | $N, K, n \in \mathbb{N}$ |
| Discrete Uniform | $X \sim \mathcal{U}\{a, \ldots, b\}$ | $a \leq b$, integers |
| Continuous Uniform | $X \sim \mathcal{U}(a, b)$ | $a < b$ |
| Normal | $X \sim \mathcal{N}(\mu, \sigma^2)$ | $\mu \in \mathbb{R}$, $\sigma^2 > 0$ |
| Exponential | $X \sim \text{Exp}(\lambda)$ | $\lambda > 0$ (rate) |
| Gamma | $X \sim \text{Gamma}(\alpha, \beta)$ | $\alpha, \beta > 0$ |
| Beta | $X \sim \text{Beta}(\alpha, \beta)$ | $\alpha, \beta > 0$ |
| Chi-square | $X \sim \chi^2_k$ | $k \in \mathbb{N}$ (df) |
| Student's $t$ | $X \sim t_\nu$ | $\nu > 0$ (df) |
| F-distribution | $X \sim F_{d_1, d_2}$ | $d_1, d_2 > 0$ (df) |
| Lognormal | $X \sim \text{LogN}(\mu, \sigma^2)$ | $\mu \in \mathbb{R}$, $\sigma^2 > 0$ |
| Multivariate Normal | $\mathbf{X} \sim \mathcal{N}_d(\boldsymbol{\mu}, \boldsymbol{\Sigma})$ | $\boldsymbol{\mu} \in \mathbb{R}^d$, $\boldsymbol{\Sigma} \succ 0$ |
| Dirichlet | $\mathbf{X} \sim \text{Dir}(\boldsymbol{\alpha})$ | $\boldsymbol{\alpha} \in \mathbb{R}^k_{>0}$ |
| Categorical | $X \sim \text{Cat}(\boldsymbol{\pi})$ | $\boldsymbol{\pi} \in \Delta^{k-1}$ |
| Multinomial | $\mathbf{X} \sim \text{Mult}(n, \boldsymbol{\pi})$ | $n \in \mathbb{N}$, $\boldsymbol{\pi} \in \Delta^{k-1}$ |

---

## Convergence

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $X_n \xrightarrow{p} X$ | `X_n \xrightarrow{p} X` | Convergence in probability |
| $X_n \xrightarrow{d} X$ | `X_n \xrightarrow{d} X` | Convergence in distribution |
| $X_n \xrightarrow{a.s.} X$ | `X_n \xrightarrow{a.s.} X` | Almost sure convergence |
| $X_n \xrightarrow{L^p} X$ | `X_n \xrightarrow{L^p} X` | Convergence in $L^p$ norm |
| $X_n \xrightarrow{m.s.} X$ | `X_n \xrightarrow{m.s.} X` | Mean square convergence ($L^2$) |

---

## Information Theory & Divergences

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $H(X)$ | `H(X)` | Entropy of $X$ |
| $H(X \mid Y)$ | `H(X \mid Y)` | Conditional entropy |
| $I(X; Y)$ | `I(X; Y)` | Mutual information |
| $D_{\text{KL}}(P \| Q)$ | `D_{\text{KL}}(P \| Q)` | Kullback-Leibler divergence |
| $D_{\text{JS}}(P \| Q)$ | `D_{\text{JS}}(P \| Q)` | Jensen-Shannon divergence |
| $\text{TV}(P, Q)$ | `\text{TV}(P, Q)` | Total variation distance |

---

## Statistical Inference

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $\theta$ | `\theta` | Parameter |
| $\hat{\theta}$ | `\hat{\theta}` | Estimator of $\theta$ |
| $\hat{\theta}_{\text{MLE}}$ | `\hat{\theta}_{\text{MLE}}` | Maximum likelihood estimator |
| $\hat{\theta}_{\text{MAP}}$ | `\hat{\theta}_{\text{MAP}}` | Maximum a posteriori estimator |
| $\bar{X}$ | `\bar{X}` | Sample mean: $\frac{1}{n}\sum X_i$ |
| $S^2$ | `S^2` | Sample variance |
| $\mathcal{L}(\theta)$ | `\mathcal{L}(\theta)` | Likelihood function |
| $\ell(\theta)$ | `\ell(\theta)` | Log-likelihood: $\log \mathcal{L}(\theta)$ |
| $\mathcal{I}(\theta)$ | `\mathcal{I}(\theta)` | Fisher information |
| $\pi(\theta)$ | `\pi(\theta)` | Prior distribution |
| $\pi(\theta \mid x)$ | `\pi(\theta \mid x)` | Posterior distribution |

---

## Variational Inference & Machine Learning

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $q_\phi(z \mid x)$ | `q_\phi(z \mid x)` | Variational/encoder distribution |
| $p_\theta(x \mid z)$ | `p_\theta(x \mid z)` | Generative/decoder distribution |
| $p(z)$ | `p(z)` | Prior over latent variables |
| $\mathcal{Q}$ | `\mathcal{Q}` | Variational family |
| $\mathcal{F}(q)$ or $\mathcal{L}(q)$ | `\mathcal{L}(q)` | ELBO (Evidence Lower Bound) |
| $\phi$ | `\phi` | Variational parameters |
| $\theta$ | `\theta` | Generative model parameters |

---

## Set & Logic Notation

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $\in$ | `\in` | Element of |
| $\notin$ | `\notin` | Not an element of |
| $\subseteq$ | `\subseteq` | Subset of |
| $\subset$ | `\subset` | Proper subset |
| $\cup$ | `\cup` | Union |
| $\cap$ | `\cap` | Intersection |
| $\emptyset$ | `\emptyset` | Empty set |
| $A^c$ | `A^c` | Complement of $A$ |
| $\forall$ | `\forall` | For all |
| $\exists$ | `\exists` | There exists |
| $\implies$ | `\implies` | Implies |
| $\iff$ | `\iff` | If and only if |
| $\equiv$ | `\equiv` | Equivalent / equal by definition |

---

## Operators & Functions

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $\sum$ | `\sum` | Summation |
| $\prod$ | `\prod` | Product |
| $\int$ | `\int` | Integral |
| $\lim$ | `\lim` | Limit |
| $\sup, \inf$ | `\sup, \inf` | Supremum, infimum |
| $\max, \min$ | `\max, \min` | Maximum, minimum |
| $\arg\max$ | `\arg\max` | Argument of the maximum |
| $\arg\min$ | `\arg\min` | Argument of the minimum |
| $\mathbb{1}_A$ | `\mathbb{1}_A` | Indicator function of set $A$ |
| $\Gamma(z)$ | `\Gamma(z)` | Gamma function |
| $B(\alpha, \beta)$ | `B(\alpha, \beta)` | Beta function |
| $\binom{n}{k}$ | `\binom{n}{k}` | Binomial coefficient |
| $n!$ | `n!` | Factorial |
| $\propto$ | `\propto` | Proportional to |
| $\approx$ | `\approx` | Approximately equal |
| $\sim$ | `\sim` | Distributed as / asymptotically equivalent |

---

## Greek Letters (Common Statistical Use)

| Symbol | LaTeX | Common Use |
|--------|-------|------------|
| $\alpha, \beta$ | `\alpha, \beta` | Shape parameters; Type I/II error rates |
| $\gamma$ | `\gamma` | Often a generic parameter |
| $\delta$ | `\delta` | Small quantity; Dirac delta |
| $\epsilon$ | `\epsilon` | Error term; small quantity |
| $\eta$ | `\eta` | Natural parameter (exponential family) |
| $\theta$ | `\theta` | Parameter |
| $\lambda$ | `\lambda` | Rate parameter; eigenvalue; regularization |
| $\mu$ | `\mu` | Mean |
| $\nu$ | `\nu` | Degrees of freedom |
| $\pi$ | `\pi` | Probability vector; prior; mixing weight |
| $\rho$ | `\rho` | Correlation |
| $\sigma$ | `\sigma` | Standard deviation |
| $\tau$ | `\tau` | Precision ($1/\sigma^2$); time |
| $\phi, \varphi$ | `\phi, \varphi` | Variational parameters; characteristic function |
| $\chi$ | `\chi` | Used in $\chi^2$ distribution |
| $\psi$ | `\psi` | Digamma function; cumulant generating function |
| $\omega$ | `\omega` | Outcome of sample space |
| $\Sigma$ | `\Sigma` | Covariance matrix |
| $\Lambda$ | `\Lambda` | Precision matrix; eigenvalue matrix |
| $\Phi$ | `\Phi` | Standard normal CDF |
| $\Omega$ | `\Omega` | Sample space |

---

## Linear Algebra (when needed)

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $\mathbf{A}$ | `\mathbf{A}` | Matrix |
| $\mathbf{a}$ | `\mathbf{a}` | Vector |
| $\mathbf{A}^T$ | `\mathbf{A}^T` | Transpose |
| $\mathbf{A}^{-1}$ | `\mathbf{A}^{-1}` | Inverse |
| $\mathbf{I}$ | `\mathbf{I}` | Identity matrix |
| $\det(\mathbf{A})$ | `\det(\mathbf{A})` | Determinant |
| $\text{tr}(\mathbf{A})$ | `\text{tr}(\mathbf{A})` | Trace |
| $\|\mathbf{x}\|$ | `\|\mathbf{x}\|` | Norm of vector |
| $\langle \mathbf{x}, \mathbf{y} \rangle$ | `\langle \mathbf{x}, \mathbf{y} \rangle` | Inner product |
| $\mathbf{A} \succ 0$ | `\mathbf{A} \succ 0` | Positive definite |
| $\mathbf{A} \succeq 0$ | `\mathbf{A} \succeq 0` | Positive semi-definite |

---

## Common Abbreviations

| Abbreviation | Meaning |
|--------------|---------|
| iid | independent and identically distributed |
| pdf | probability density function |
| pmf | probability mass function |
| cdf | cumulative distribution function |
| mgf | moment generating function |
| MLE | maximum likelihood estimator |
| MAP | maximum a posteriori |
| BLUE | best linear unbiased estimator |
| LLN | Law of Large Numbers |
| CLT | Central Limit Theorem |
| ELBO | Evidence Lower Bound |
| KL | Kullback-Leibler |
| MCMC | Markov Chain Monte Carlo |
| HMC | Hamiltonian Monte Carlo |
| VI | Variational Inference |
| EM | Expectation-Maximization |
| ANOVA | Analysis of Variance |
| GLM | Generalized Linear Model |

---

## Style Conventions Used in This Site

1. **Random variables** are uppercase italic: $X, Y, Z$
2. **Realizations** are lowercase italic: $x, y, z$
3. **Vectors** are bold lowercase: $\mathbf{x}$
4. **Matrices** are bold uppercase: $\mathbf{A}, \boldsymbol{\Sigma}$
5. **Spaces and sets** use calligraphic: $\mathcal{X}, \mathcal{Y}, \mathcal{Z}$
6. **Number sets** use blackboard bold: $\mathbb{R}, \mathbb{N}, \mathbb{Z}$
7. **Distribution names** use roman text: $\text{Bin}, \text{Pois}, \mathcal{N}$
8. **Parameters** typically use Greek letters
9. **Operators** use roman text: $\mathrm{Var}, \mathrm{Cov}, \mathrm{supp}$
10. **Probability $P$** uses italic capital (not blackboard bold)
