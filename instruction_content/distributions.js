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
    id: 'bernoulli',
    name: 'Bernoulli',
    parameters: {
      notation: 'X \\sim \\operatorname{Bernoulli}(p)',
      params: [
        { symbol: 'p', description: 'probability of success' },
      ],
    },
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
];
