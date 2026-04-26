/**
 * DerivationPanel.tsx
 * Right-side panel showing step-by-step derivations
 * Renders LaTeX formulas using react-katex
 */

'use client';

import React, { useMemo } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Distribution, FormulaWithDerivation } from '@/lib/types';

interface DerivationPanelProps {
  distribution: Distribution;
  column: string;
  onClose: () => void;
  onNextDistribution: () => void;
  onPrevDistribution: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function DerivationPanel({
  distribution,
  column,
  onClose,
  onNextDistribution,
  onPrevDistribution,
  hasNext,
  hasPrev,
}: DerivationPanelProps) {
  // Get the formula data based on column
  const formulaData = useMemo(() => {
    switch (column) {
      case 'mean':
        return distribution.mean;
      case 'variance':
        return distribution.variance;
      case 'cdf':
        return distribution.cdf;
      case 'mgf':
        return distribution.mgf;
      case 'pmfPdf':
        return distribution.pmfPdf as FormulaWithDerivation;
      default:
        return null;
    }
  }, [distribution, column]);

  if (!formulaData) return null;

  const columnLabel = {
    pmfPdf: 'PDF/PMF',
    mean: 'Mean E[X]',
    variance: 'Variance Var(X)',
    cdf: 'CDF',
    mgf: 'MGF',
  }[column] || column;

  // Parse derivation steps (split by "Step X:" pattern)
  const derivationSteps = formulaData.derivation
    .split(/(?=Step \d+:)/i)
    .filter((step) => step.trim());

  return (
    <div className="derivation-panel-overlay">
      <div className="derivation-panel">
        {/* Header */}
        <div className="derivation-header">
          <div className="derivation-title">
            <h3>{distribution.name}</h3>
            <span className="derivation-column-label">{columnLabel}</span>
          </div>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close derivation panel"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main formula */}
        {formulaData.latex && (
          <div className="derivation-main-formula">
            <BlockMath math={formulaData.latex} />
          </div>
        )}

        {/* Derivation steps */}
        <div className="derivation-content">
          {formulaData.derivation && (
            <div className="derivation-steps">
              {derivationSteps.map((step, idx) => (
                <div key={idx} className="derivation-step">
                  <p className="step-text">{step.trim()}</p>
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          {formulaData.notes && (
            <div className="derivation-notes">
              <h5>Notes</h5>
              <p>{formulaData.notes}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="derivation-navigation">
          <button
            className="nav-button prev-button"
            onClick={onPrevDistribution}
            disabled={!hasPrev}
            aria-label="Previous distribution"
          >
            <ChevronLeft size={18} />
            <span>Previous</span>
          </button>

          <span className="nav-separator">|</span>

          <button
            className="nav-button next-button"
            onClick={onNextDistribution}
            disabled={!hasNext}
            aria-label="Next distribution"
          >
            <span>Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
