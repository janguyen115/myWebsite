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
//   useCases    — plain text or HTML string, or ''
//   history     — plain text or HTML string, or ''
//   example     — plain text or HTML string, or ''
//   relationships — plain text or HTML string, or ''
//   derivations — { pmfPdf, cdf, mean, variance, mgf } — LaTeX or text, or ''
//
// LaTeX is written without delimiters; the renderer wraps it automatically.
// HTML in narrative fields (useCases, history, example, relationships) is
// rendered directly — you can use <b>, <i>, <a>, etc.

const DISTRIBUTIONS = [
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
    useCases:    '',
    history:     '',
    example:     '',
    relationships: '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '',
      variance: '',
      mgf:      '',
    },
  },
];
