// ─── Probability Distribution Data ───────────────────────────────────────────
//
// Add a new distribution by appending an object to this array.
//
// Field reference:
//   id          — unique string key (lowercase, no spaces)
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
    name: 'Uniform (Discrete)',
    parameters: {
      notation: 'X \\sim \\operatorname{Uniform}(a, b)',
      params: [
        { symbol: 'a', description: 'Lower bound' },
        { symbol: 'b', description: 'Upper bound' },
      ],
    },
    support:   'a \\leq k \\leq b, \\quad k \\in \\mathbb{Z}',
    pmfPdf:    ' \\frac{1}{b-a+1} ',
    cdf:       ' \\frac{k-a+1}{b-a+1} \\quad ',
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
    name: 'Uniform (Continuous)',
    parameters: {
      notation: 'X \\sim \\operatorname{Uniform}(a, b)',
      params: [
        { symbol: 'a', description: 'Lower bound' },
        { symbol: 'b', description: 'Upper bound' },
      ],
    },
    support:   'a \\leq k \\leq b, \\quad k \\in \\mathbb{R}',
    pmfPdf:    ' \\frac{1}{b-a} ',
    cdf:       ' \\frac{k-a}{b-a} \\quad ',
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
    name: 'Bernoulli',
    parameters: {
      notation: 'X \\sim \\operatorname{Bernoulli}(p)',
      params: [
        { symbol: 'p', description: 'probability of success' },
      ],
    },
    support:   'k \\in \\{0,\\, 1\\}',
    pmfPdf:    ' p^{k}(1-p)^{1-k}',
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
    name: 'Binomial',
    parameters: {
      notation: 'X \\sim \\operatorname{Binomial}(n,\\, p)',
      params: [
        { symbol: 'n', description: 'number of independent trials' },
        { symbol: 'p', description: 'probability of success on each trial' },
      ],
    },
    support:   'k \\in \\{0,\\, 1,\\, \\ldots,\\, n\\}',
    pmfPdf:    '\\binom{n}{k} p^{k}(1-p)^{n-k}',
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
    name: 'Exponential',
    parameters: {
      notation: 'X \\sim \\operatorname{Exponential}(\\lambda)',
      params: [
        { symbol: '\\lambda', description: 'Rate' },
      ],
    },
    support:   '\\mathbb R_{>0}',
    pmfPdf:    '',
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
    name: 'Gamma',
    parameters: {
      notation: '',
      params: [
        { symbol: '', description: '' },
      ],
    },
    support:   '',
    pmfPdf:    '',
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
    name: 'Poisson',
    parameters: {
      notation: '',
      params: [
        { symbol: '', description: '' },
      ],
    },
    support:   '',
    pmfPdf:    '',
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
    name: 'Geometric',
    parameters: {
      notation: '',
      params: [
        { symbol: '', description: '' },
      ],
    },
    support:   '',
    pmfPdf:    '',
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
    id: 'negative binomial',
    name: 'Negative Binomial',
    parameters: {
      notation: '',
      params: [
        { symbol: '', description: '' },
      ],
    },
    support:   '',
    pmfPdf:    '',
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
    name: 'Hypergeometric',
    parameters: {
      notation: '',
      params: [
        { symbol: '', description: '' },
      ],
    },
    support:   '',
    pmfPdf:    '',
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
    name: 'Normal (Gaussian)',
    parameters: {
      notation: '',
      params: [
        { symbol: '', description: '' },
      ],
    },
    support:   '',
    pmfPdf:    '',
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
    name: 'Chi-Square',
    parameters: {
      notation: '',
      params: [
        { symbol: '', description: '' },
      ],
    },
    support:   '',
    pmfPdf:    '',
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
    id: 't-distribution',
    name: 'T-Distribution',
    parameters: {
      notation: '',
      params: [
        { symbol: '', description: '' },
      ],
    },
    support:   '',
    pmfPdf:    '',
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
    id: 'f-dsitribution',
    name: 'F-Distribution',
    parameters: {
      notation: '',
      params: [
        { symbol: '', description: '' },
      ],
    },
    support:   '',
    pmfPdf:    '',
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
    name: 'Beta',
    parameters: {
      notation: '',
      params: [
        { symbol: '', description: '' },
      ],
    },
    support:   '',
    pmfPdf:    '',
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
