// ─── Probability Distribution Data ───────────────────────────────────────────
//
// Add a new distribution by appending an object to this array.
//
// Field reference:
//   id          — unique string key (lowercase, no spaces)
//   type        — 'discrete' | 'continuous'
//   name        — display name shown in the table
//   parameters  — { notation: LaTeX string, params: [{ symbol, description }] }
//   pmfPdf      — LaTeX string for the PMF (discrete) or PDF (continuous)
//   cdf         — LaTeX string, or '' for "—"
//   mean        — LaTeX string, or ''
//   variance    — LaTeX string, or ''
//   mgf         — LaTeX string, or ''
//   description — plain text or HTML string shown when the Distribution cell is expanded, or ''
//   example     — plain text or HTML string shown when the Distribution cell is expanded, or ''
//   derivations — { pmfPdf, cdf, mean, variance, mgf } — LaTeX or text, or ''
//
// LaTeX is written without delimiters; the renderer wraps it automatically.
// HTML in narrative fields (description, example) is rendered directly — you
// can use <b>, <i>, <a>, etc.

// ─── Template (copy and fill to add a new distribution) ──────────────────────
//
// {
//   id: '',
//   type: '',
//   name: '',
//   parameters: {
//     notation: '',
//     params: [
//       { symbol: '', description: '' },
//     ],
//   },
//   support:   '',
//   pmfPdf:    '',
//   cdf:       '',
//   mean:      '',
//   variance:  '',
//   mgf:       '',
//   description: '',
//   example:     '',
//   derivations: {
//     pmfPdf:   '',
//     cdf:      '',
//     mean:     '',
//     variance: '',
//     mgf:      '',
//   },
// },

var DISTRIBUTIONS = [
  {
    id: 'uniform-discrete',
    type: 'discrete',
    name: 'Uniform (Discrete)',
    parameters: {
      notation: 'X \\sim \\operatorname{Uniform}(a, b)',
      params: [
        { symbol: 'a', description: 'Lower bound' },
        { symbol: 'b', description: 'Upper bound' },
      ],
    },
    support:   'a \\leq k \\leq b, \\quad k \\in \\mathbb{Z}',
    pmfPdf:    ' f(k) = \\frac{1}{b-a+1} ',
    cdf:       ' F(k) = \\frac{k-a+1}{b-a+1} \\quad ',
    mean:      ' \\frac{a+b}{2}',
    variance:  ' \\frac{(b-a+1)^2-1}{12}',
    mgf:       ' \\frac{e^{at}-e^{(b+1)t}}{(b-a+1)(1-e^{t})} \\quad \\text{for } t \\neq 0',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '\\begin{align*} \\mathbb{E}[X] &= \\sum_{k=a}^b k \\left(\\frac{1}{b-a+1}\\right) \\\\ &= \\left(\\frac{1}{b-a+1}\\right) \\sum_{k=a}^b k \\\\ &= \\left(\\frac{1}{b-a+1}\\right) \\left( \\sum_{k=1}^b - \\sum_{k=1}^{a-1} \\right) \\\\ &= \\left(\\frac{1}{b-a+1}\\right)\\left( \\frac{b(b+1)}{2} - \\frac{(a-1)(a)}{2} \\right) \\\\ &= \\left(\\frac{1}{b-a+1}\\right) \\frac{b^2 + b - a^2 + a}{2} \\\\ &= \\frac{b^2 - a^2 + ab - ab + a + b}{2(b-a+1)} \\\\ &= \\frac{(a+b)(b-a+1)}{2(b-a+1)} \\\\ &= \\frac{a+b}{2}           \\end{align*}',
      variance: 'Note that the random variable \\( X \\sim \\text{Uniform}(a, b) \\) is equal to \\(Y = X - (a-1)\\) for random variable \\(Y \\sim \\text{Uniform}(1,b-a+1)\\). <br> Since the variance of a distribution is shift-invariant, i.e. Var(X) = Var(X+c), we can instead find the equivalent variance of the random variable Y. <br> For simplified derivation, we substitute \\(n = b-a+1\\) for th width of the Uniform distribution.\\begin{align*} Var[X] &= \\mathbb{E}[Y^2] - \\mathbb{E}^2[Y] \\\\ &= \\sum_{k=1}^n k^2 \\left(\\frac{1}{n}\\right)- \\left[ \\sum_{k=1}^n k\\left( \\frac{1}{n} \\right) \\right] \\\\ &= \\frac{1}{n}\\left( \\frac{n(n+1)(2n+1)}{6} \\right) - \\left[\\frac{1}{n}\\left( \\frac{n(n+1)}{2} \\right)\\right]^2 \\\\ &= \\frac{2(n+1)(2n+1)}{12} - \\frac{3(n+1)^2}{12} \\\\ &= \\frac{n^2-1}{12} \\\\ &= \\frac{(b-a+1)^2-1}{12} \\end{align*} ',
      mgf:      '',
    },
  },
  {
    id: 'uniform-continuous',
    type: 'continuous',
    name: 'Uniform (Continuous)',
    parameters: {
      notation: 'X \\sim \\operatorname{Uniform}(a, b)',
      params: [
        { symbol: 'a', description: 'Lower bound' },
        { symbol: 'b', description: 'Upper bound' },
      ],
    },
    support:   'a \\leq k \\leq b, \\quad k \\in \\mathbb{R}',
    pmfPdf:    ' f(x) = \\frac{1}{b-a} ',
    cdf:       ' F(x) = \\frac{k-a}{b-a} \\quad ',
    mean:      ' \\frac{a+b}{2}',
    variance:  ' \\frac{(b-a)^2-1}{12}',
    mgf:       ' \\frac{e^{at}-e^{(b+1)t}}{(b-a)(1-e^{t})} \\quad \\text{for } t \\neq 0',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '',
      variance: '',
      mgf:      '',
    },
  },
  {
    id: 'bernoulli',
    type: 'discrete',
    name: 'Bernoulli',
    parameters: {
      notation: 'X \\sim \\operatorname{Bernoulli}(p)',
      params: [
        { symbol: 'p', description: 'probability of success' },
      ],
    },
    support:   'k \\in \\{0,\\, 1\\}',
    pmfPdf:    'f(k) = p^{k}(1-p)^{1-k}',
    cdf:       ' F(k) = \\begin{cases} (1-p), & k \\in [0,1) \\\\ 1, & k = 1 \\end{cases}',
    mean:      'p',
    variance:  'p(1-p)',
    mgf:       '1-p+pe^{t}',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean: `\\[\\begin{align*}
  \\mathbb{E}[X] &= \\sum_{k=0}^1 k \\cdot P(X=k) \\\\
  &= 0 \\cdot p^0(1-p)^{1-0} + 1 \\cdot p^1(1-p)^{1-1} \\\\
  &= 0(1-p) + 1(p) \\\\
  &= p
\\end{align*}\\]`,
      variance: '\\begin{align*} \\text{Var}[X] & = \\mathbb{E}[X^2] - \\mathbb{E}^2[X] \\\\ &= [\\sum_{k=0}^1 k^2P(X=k)] - (\\mathbb{E}[x])^2 \\\\ &= [0^2(1-p) + 1^2(p)] - p^2 \\\\ &= p-p^2  \\\\ &= p(1-p) \\end{align*}',
      mgf:      '\\begin{align*} M_X(t) &= \\mathbb{E}[e^{tX}] \\\\ &= \\sum_{k=0}^1 e^{tk} P(X=k) \\\\ &= e^{t(0)}P(X=0) + e^{t(1)}P(X=1) \\\\ &= (1-p) + pe^t \\end{align*} \\begin{align*} & \\implies M_X\'(t) = pe^t, \\hspace{1em} M_X\'\'(t) = pe^t \\\\ & \\implies M_X\'(0) = p, \\hspace{1em} M_X\'\'(0) = p \\end{align*}',
    },
  },
  {
    id: 'binomial',
    type: 'discrete',
    name: 'Binomial',
    parameters: {
      notation: 'X \\sim \\operatorname{Binomial}(n,\\, p)',
      params: [
        { symbol: 'n', description: 'number of independent trials' },
        { symbol: 'p', description: 'probability of success on each trial' },
      ],
    },
    support:   'k \\in \\{0,\\, 1,\\, \\ldots,\\, n\\}',
    pmfPdf:    'f(k) = \\binom{n}{k} p^{k}(1-p)^{n-k}',
    cdf:       'F(k) = \\sum_{k=0}^n \\binom{n}{k}p^k(1-p)^n-k',
    mean:      'np',
    variance:  'np(1-p)',
    mgf:       '(1-p+pe^{t})^{n}',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     `\\begin{align*} \\mathbb{E}[X] &= \\sum_{k = 0}^n k \\binom{n}{k}p^k (1-p)^{n-k} \\\\ &= \\sum_{k=1}^n k \\left[\\frac{n!}{(n-k)!k!}\\right] p^k (1-p)^{n-k} \\\\ &= 0 + \\sum_{k=1}^n \\left[\\frac{\\frac{n!n}{n}}{(n-k+1-1)!(\\frac{k!}{k})}\\right] p^{k -1}p(1-p)^{n-k+1-1} \\\\ &= \\sum{k=1}^n np\\left[\\frac{(n-1)!}{(n-1 - (k-1))!(k-1)!}\\right]p^{k-1}(1-p)^{n-1-(k-1)} \\\\ &= np \\sum_{k=0}^n\\left[\\frac{(n-1)!}{(n-1-k)!k!}\\right]p^k(1-p)^{n-1-k} \\\\ &= np[p + (1-p)]^{n-1} \\quad \\text{by Binomial Theorem}\\\\ &= np(1)^{n-1} \\\\ &= np \\end{align*}`,
      variance: 'Note that \\(X \\sim Binomial(n,p)\\) can be represented by the sum \\(X\\) of iid random Bernoulli variables \\(X_1, \\dots, X_n\\): \\[\\quad X = X_1 + X_2 + \\dots + X_n, \\] where \\(X_i \\sim Bernoulli(p)\\) for \\(i \\in \\{1, \\dots, n\\}\\). <br> Since \\( X_i, X_j, i \\neq j \\) are iid, we can use the property that states that the variance of the sum of independent variables is equal to the sum of the variances for each iid variabe: \\begin{align*} \\implies Var(X) &=  Var(X_1 + X_2 + \\dots X_n) \\\\ \\quad &= Var(X_1) + Var(X_2) + \\dots + Var(X_n) \\\\ &= \\sum_{i=1}^n Var(X_i) \\\\ &= nVar(X_i) \\\\ &= np(p-1)\\end{align*}',
      mgf:      '',
    },
  },
  {
    id: 'exponential',
    type: 'continuous',
    name: 'Exponential',
    parameters: {
      notation: 'X \\sim \\operatorname{Exponential}(\\lambda)',
      params: [
        { symbol: '\\lambda', description: 'Rate' },
      ],
    },
    support:   'x \\in \\mathbb R_{>0}',
    pmfPdf:    'f(x) = \\lambda e^{-\\lambda x}',
    cdf:       'F(x) = 1-e^{-\\lambda x}',
    mean:      '\\frac{1}{\\lambda}',
    variance:  '\\frac{1}{\\lambda^2}',
    mgf:       '\\frac{\\lambda}{\\lambda-t}',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '\\begin{align*} \\mathbb{E}[X] & = \\int_0^\\infty \\lambda x e^{ -\\lambda x } \\text{d}x \\\\  &= uv \\Big|_0^\\infty - \\int_0^\\infty v du, \\hspace{8em} \\text{Where } u = x, \\quad dv = \\lambda e^{-\\lambda x }dx \\implies du = dx, \\quad v = -e^{ -\\lambda x } \\\\ &= -xe^{-\\lambda x}\\Big|_0^\\infty + \\int_0^\\infty e^{-\\lambda x} dx \\\\ &= [ (\\underset{x \\rightarrow \\infty}{\\lim} -xe^{- \\lambda x }) + 0e^{-\\lambda(0)}] - \\frac{1}{\\lambda}e^{ -\\lambda x }\\Big|_0^\\infty \\\\ &= 0 + \\left[\\left(\\underset{x \\rightarrow \\infty}{\\lim} \\frac{1}{\\lambda}e^{-\\lambda x}\\right) + \\frac{1}{\\lambda} e^{-\\lambda(0)}\\right] \\\\ &= 0 + \\frac{1}{\\lambda}(1) \\\\ &= \\frac{1}{\\lambda}  \\end{align*}',
      variance: '\\begin{align*} Var[X] &= \\mathbb{E}[X^2] - \\mathbb{E}^2[X] \\\\ &= \\left( \\int_0^\\infty \\lambda x^2 e^{-\\lambda x} dx \\right) - \\left(\\frac{1}{\\lambda}\\right)^2 \\\\ &= [uv\\Big|_0^\\infty - \\int_0^\\infty vdu - \\frac{1}{\\lambda^2}, \\hspace{8em} \\text{Where } u = x^2, \\quad dv = \\lambda e^{ - \\lambda x }dx \\implies du = 2xdx, \\quad v = -e^{-\\lambda x}  \\\\ &= [x^2(-e^{-\\lambda x}) \\Big|_0^\\infty + \\int_0^\\infty e^{ - \\lambda x } 2xdx - \\frac{1}{\\lambda^2} \\\\ &= [(\\underset{x \\rightarrow \\infty}{\\lim}-x^2e^{-\\lambda x}) + (0)^2e^{-\\lambda(0)}] + \\int_0^\\infty 2\\left(\\frac{\\lambda}{\\lambda}\\right)xe^{ - \\lambda x }dx - \\frac{1}{\\lambda^2} \\\\ &= 0 + 2\\left(\\frac{1}{\\lambda}\\right) \\int_0^\\infty \\lambda x e^{ -\\lambda x } \\text{d}x - \\frac{1}{\\lambda^2} \\\\ &= \\frac{2}{\\lambda}\\mathbb{E}[X] - \\frac{1}{\\lambda^2}, \\hspace{8em} \\text{Recall that: } \\mathbb{E}[X] = \\int_0^\\infty \\lambda x e^{ -\\lambda x } \\text{d}x \\\\ &= \\frac{2}{\\lambda^2} - \\frac{1}{\\lambda^2} \\\\ &= \\frac{1}{\\lambda^2} \\end{align*}',
      mgf:      '\\begin{align*} M_X(t) &= \\mathbb{E}[e^{tX}] \\\\ &= \\int_0^\\infty e^{tx}(\\lambda e^{-\\lambda x}) dx \\\\ &= \\int_0^\\infty \\lambda e^{ (t-\\lambda) x} dx \\\\ &= \\left(\\frac{\\lambda}{t-\\lambda}\\right)e^{(t-\\lambda)x}\\Big|_0^\\infty \\\\ &= \\frac{\\lambda}{t-\\lambda}\\left[ (\\underset{x \\rightarrow \\infty}{\\lim} e^{(t-\\lambda)x }) - e^{(t-\\lambda)(0)} \\right] \\\\ &= \\begin{cases} \\frac{\\lambda}{\\lambda-t}, & t< \\lambda \\\\ \\infty, & t \\geq \\lambda \\end{cases} \\\\ & \\implies M_X\'(t) = -\\frac{\\lambda}{(t-\\lambda)^2}, \\quad M_X\'\'(t) = -\\frac{2\\lambda}{(t-\\lambda)^3} \\\\ & \\implies M_X\'(0) = \\frac{1}{\\lambda}, \\quad M_X\'\'(0) = \\frac{2}{\\lambda^2} \\end{align*}',
    },
  },
  {
    id: 'gamma',
    type: 'continuous',
    name: 'Gamma',
    parameters: {
      notation: 'X \\sim \\operatorname{Gamma}(\\alpha, \\beta)',
      params: [
        { symbol: '\\alpha', description: '' },
        { symbol: '\\beta', description: '' },
      ],
    },
    support:   'x \\in \\mathbb R_{>0}',
    pmfPdf:    'f(x) = \\frac{\\beta ^\\alpha}{\\Gamma (\\alpha)} x^{\\alpha - 1} e^{-x/\\beta}',
    cdf:       'F(x) = \\frac{\\gamma(\\alpha, \\beta x)}{\\Gamma(\\alpha)}',
    mean:      '\\frac{\\alpha}{\\beta}',
    variance:  '\\frac{\\alpha}{\\beta^2}',
    mgf:       '\\left( 1-\\frac{t}{\\beta} \\right)^{-\\alpha}',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '',
      variance: '',
      mgf:      '',
    },
  },
  {
    id: 'poisson',
    type: 'discrete',
    name: 'Poisson',
    parameters: {
      notation: 'X \\sim \\operatorname{Poisson}(\\lambda)',
      params: [
        { symbol: '\\lambda', description: 'Rate' },
      ],
    },
    support:   'k \\in \\mathbb N',
    pmfPdf:    'f(k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}',
    cdf:       'F(k) = \\sum_{k=0}^x\\frac{e^{-\\lambda} \\lambda^k}{k!}',
    mean:      '\\lambda',
    variance:  '\\lambda',
    mgf:       'e^{\\lambda(e^t-1)}',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '\\begin{align*} \\mathbb{E}[X] &= \\sum_{k=0}^\\infty k\\left( \\frac{\\lambda^k e^{-\\lambda}}{k!} \\right) \\\\ &= 0 + \\sum_{k=1}^\\infty k\\left( \\frac{\\lambda^k e^{-\\lambda}}{k!} \\right) \\\\ &= \\sum_{k=1}^\\infty  \\frac{\\lambda^{k-1}(\\lambda) e^{-\\lambda}}{k!(\\frac{1}{k})} \\\\ &= \\lambda e^{-\\lambda} \\sum_{k=1}^\\infty \\frac{\\lambda^{k-1}}{(k-1)!} \\\\ &=\\lambda e^{-\\lambda} \\sum_{k\'=0}^\\infty \\frac{\\lambda^{k\'}}{k\'!}, \\hspace{8em} \\text{Where } k\' = k-1 \\\\ &= \\lambda e^{-\\lambda}(e^\\lambda), \\hspace{8em} \\text{By definition of } e^x = \\sum_{k=0}^\\infty \\frac{x^k}{k!}\\text{ for } x = \\lambda \\\\ &= \\lambda e^0 \\\\ &= \\lambda \\end{align*}',
      variance: '\\( Var[X] = \\mathbb{E}[X^2] - \\mathbb{E}^2[X] \\) \\begin{align*} \\hspace{4em} \\text{First solving for } \\mathbb{E}[X^2]&: \\\\ \\mathbb{E}[X^2] &= \\sum_{k=0}^\\infty (k^2)\\frac{\\lambda^k e^{-\\lambda}}{k!} \\\\ &= e^{-\\lambda} \\sum_{k=1}^\\infty k(\\frac{ \\lambda^{k-1}(\\lambda) }{ k!\\left( \\frac{1}{k} \\right) }) \\\\ &= \\lambda e^{-\\lambda} \\left( 0 + \\sum_{k=1}^\\infty (k-1 + 1)\\frac{ \\lambda^{k-1} }{ (k-1)! } \\right) & \\text{"Extract 0th term from series"} \\\\ &= \\lambda e^{-\\lambda} \\left( \\sum_{k\'=0}^\\infty (k\' + 1) \\frac{ \\lambda^{k\'} }{(k\')!} \\right), & \\text{Where, } k\' = k-1 \\\\ &= \\lambda e^{-\\lambda} \\left[ 1\\left( \\frac{\\lambda^0}{1} \\right) + \\sum_{k\' = 1}^\\infty (k\'+1)\\frac{ \\lambda^{k\'} }{ (k\')! }  \\right] & \\text{"Extract 0th term from series"} \\\\ &= \\lambda e^{-\\lambda} \\left[ 1 + \\left( \\sum_{k\'=1}^\\infty (k\') \\frac{\\lambda^{k\'}}{(k\')!}\\right) + \\left( \\sum_{k\' = 1}^\\infty \\frac{\\lambda^{k\'}}{(k\')!} \\right) \\right] \\\\ &= \\lambda e^{-\\lambda} \\left[ 1 + \\lambda \\left( \\sum_{k\' =1}^\\infty \\frac{\\lambda^{k\'-1}}{(k\'-1)!} \\right) + (e^{\\lambda} - 1) \\right] \\\\ &= \\lambda e^{-\\lambda} \\left[ \\lambda \\left(\\sum_{k\'\' = 0}^\\infty \\frac{\\lambda^{k\'\'}}{(k\'\')!} \\right)  + e^{\\lambda}\\right], & \\text{Where } k\'\' = k\'-1 \\\\ &= \\lambda e^{-\\lambda} [\\lambda e^\\lambda + e^\\lambda] \\\\ &= \\lambda^2 e^0 + \\lambda e^0 \\\\ &= \\lambda^2 + \\lambda \\end{align*} \\begin{align*} \\implies \\mathbb{E}[X^2] - \\mathbb{E}^2[X] &= (\\lambda^2 + \\lambda) - (\\lambda)^2 \\\\ &= \\lambda \\end{align*}',
      mgf:      '',
    },
  },
  {
    id: 'geometric',
    type: 'discrete',
    name: 'Geometric',
    parameters: {
      notation: 'X \\sim \\operatorname{Geom}(p)',
      params: [
        { symbol: 'p', description: 'Probability of success' },
      ],
    },
    support:   'k \\in \\mathbb N_{>1}',
    pmfPdf:    'f(k) = (1-p)^{k-1}p',
    cdf:       'F(k) = 1-(1-p)^k',
    mean:      '\\frac{1}{p}',
    variance:  '\\frac{1-p}{p^2}',
    mgf:       '\\frac{pe^t}{1-(1-p)e^t}',
    description: 'Probability of the number X of Bernoulli trials needed to obtain one success.',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '',
      variance: '',
      mgf:      '',
    },
  },
  {
    id: 'negative binomial',
    type: 'discrete',
    name: 'Negative Binomial',
    parameters: {
      notation: 'X \\sim \\operatorname{NegBinom}(r, p)',
      params: [
        { symbol: 'r', description: 'Number of total successes in an experiment' },
        { symbol: 'p', description: 'Probability of success of an event' },
      ],
    },
    support:   'r \\in \\mathbb N',
    pmfPdf:    'f(k) = \\binom{k + r - 1}{k} \\cdot (1-p)^k p^r',
    cdf:       'F(k) = \\sum{i=r}^k \\binom{k-1}{r-1}p^r(1-p)^{i-r}',
    mean:      '\\frac{r}{p}',
    variance:  '\\frac{r(1-p)}{p^2}',
    mgf:       '\\left( \\frac{pe^t}{1-(1-p)e^t} \\right)^r',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '',
      variance: '',
      mgf:      '',
    },
  },
  {
    id: 'hypergeometric',
    type: 'discrete',
    name: 'Hypergeometric',
    parameters: {
      notation: 'X \\sim \\operatorname{HyperGeom}(N, K, n)',
      params: [
        { symbol: 'N', description: 'Population size' },
        { symbol: 'K', description: 'Number of success states in population' },
        { symbol: 'n', description: 'Number of draws' },
      ],
    },
    support:   'k \\in \\{ \\text{max}(0, n + K - N), \\dots, \\text{min} (n,, K)\\}',
    pmfPdf:    'f(k) = \\frac{\\binom{K}{k} \\binom{N-n}{K-k-1}}{\\binom{N}{n}}',
    cdf:       'F(k) = \\sum_{i=1}^k \\frac{\\binom{K}{i} \\binom{N-K}{n-i}}{\\binom{N}{n}}',
    mean:      '\\frac{nK}{N}',
    variance:  'n \\left( \\frac{K}{N} \\right) \\left( \\frac{N-K}{N} \\right) \\left( \\frac{N-n}{N-1} \\right)',
    mgf:       '',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '',
      variance: '',
      mgf:      '',
    },
  },
  {
    id: 'normal',
    type: 'continuous',
    name: 'Normal (Gaussian)',
    parameters: {
      notation: 'X \\sim \\operatorname{Norm}(\\mu, \\sigma^2)',
      params: [
        { symbol: '\\mu', description: 'Mean' },
        { symbol: '\\sigma^2', description: 'Variance (Squared StdDev)' },
      ],
    },
    support:   'x \\in \\mathbb R',
    pmfPdf:    'f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^-\\frac{(x-\\mu)^2}{2\\sigma^2}',
    cdf:       'F(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\int_{-\\infty}^x e^{-\\frac{(u-\\mu)^2}{2\\sigma^2}}\\text{d}u',
    mean:      '\\mu',
    variance:  '\\sigma^2',
    mgf:       'e^{ \\mu t + \\frac{1}{2}\\sigma^2 t^2 }',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '',
      variance: '',
      mgf:      '',
    },
  },
  {
    id: 'chi-square',
    type: 'continuous',
    name: 'Chi-Square',
    parameters: {
      notation: 'X \\sim \\chi^2(k)',
      params: [
        { symbol: 'k', description: 'Degrees of freedom' },
      ],
    },
    support:   'x \\in \\mathbb N',
    pmfPdf:    'f(k) = \\frac{1}{\\Gamma(k/2)}x^{(k/2)-1} e^{-x/2}',
    cdf:       'F(k) = \\frac{\\gamma(\\frac{k}{2}, \\frac{x}{2})}{\\Gamma(\\frac{k}{2})}',
    mean:      'k',
    variance:  '2k',
    mgf:       '(1-2t)^{-\\frac{k}{2}}, \\quad t < \\frac{1}{2}',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '',
      variance: '',
      mgf:      '',
    },
  },
  {
    id: 'beta',
    type: 'continuous',
    name: 'Beta',
    parameters: {
      notation: 'X \\sim \\operatorname{Beta}(\\alpha, \\beta)',
      params: [
        { symbol: '\\alpha', description: 'Shape' },
        { symbol: '\\beta', description: 'Shape' },
      ],
    },
    support:   'x \\in \\mathbb R_{[0,1]}',
    pmfPdf:    'f(x) = \\frac{x^{\\alpha -1}(1-x)^{\\beta - 1 }}{\\text B (\\alpha, \\beta)}',
    cdf:       'F(x) = \\int_0^x \\frac{t^{\\alpha-1}(1-t)^{\\beta-1}}{\\text{B}(\\alpha, \\beta)}\\text{d}t',
    mean:      '\\frac{\\alpha}{\\alpha + \\beta}',
    variance:  '\\frac{\\alpha \\beta}{(\\alpha + \\beta)^2(\\alpha+\\beta+1)}',
    mgf:       '',
    description: '',
    example:     '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '',
      variance: '',
      mgf:      '',
    },
  },
];
