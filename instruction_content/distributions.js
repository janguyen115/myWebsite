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
      mean:     '',
      variance: '',
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
    pmfPdf:    ' f(k) \\frac{1}{b-a} ',
    cdf:       ' F(k) \\frac{k-a}{b-a} \\quad ',
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
    cdf:       '',
    mean:      'p',
    variance:  'p(1-p)',
    mgf:       '1-p+pe^{t}',
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
    cdf:       '',
    mean:      'np',
    variance:  'np(1-p)',
    mgf:       '(1-p+pe^{t})^{n}',
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
    cdf:       '',
    mean:      '',
    variance:  '',
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
    pmfPdf:    'f(x) = \\frac{1}{\\beta ^\\alpha \\Gamma (\\alpha)} x^{\\alpha - 1} e^{-x/\\beta}',
    cdf:       '',
    mean:      '',
    variance:  '',
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
    cdf:       '',
    mean:      '',
    variance:  '',
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
    cdf:       '',
    mean:      '',
    variance:  '',
    mgf:       '',
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
    cdf:       '',
    mean:      '',
    variance:  '',
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
    pmfPdf:    'f(k) \\frac{\\binom{K}{k} \\binom{N-n}{K-k-1}}{\\binom{N}{n}}',
    cdf:       '',
    mean:      '',
    variance:  '',
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
    pmfPdf:    'f(x) \\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^-\\frac{(x-\\mu)^2}{2\\sigma^2}',
    cdf:       '',
    mean:      '',
    variance:  '',
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
    cdf:       '',
    mean:      '',
    variance:  '',
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
    cdf:       '',
    mean:      '',
    variance:  '',
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
