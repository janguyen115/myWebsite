/**
 * FormulaCell.tsx
 * Reusable cell for displaying formulas with click handler
 */

'use client';

import React from 'react';
import { Formula } from '@/lib/types';

interface FormulaCellProps {
  label: string;
  formula: Formula;
  onClick: () => void;
}

export function FormulaCell({ label, formula, onClick }: FormulaCellProps) {
  return (
    <div className="table-cell formula-cell">
      <button
        className="formula-button"
        onClick={onClick}
        title={`Click to view ${label} derivation`}
      >
        <code className="formula-code">{formula.formula}</code>
      </button>
    </div>
  );
}
