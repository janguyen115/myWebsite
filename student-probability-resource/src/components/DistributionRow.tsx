/**
 * DistributionRow.tsx
 * Renders a single row for a distribution with click handlers
 */

'use client';

import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Distribution, ColumnVisibility } from '@/lib/types';
import { DetailsPanel } from './DetailsPanel';
import { FormulaCell } from './FormulaCell';

interface DistributionRowProps {
  distribution: Distribution;
  visibility: ColumnVisibility;
  isDetailsOpen: boolean;
  onToggleDetails: () => void;
  onOpenDerivation: (distributionId: string, column: string) => void;
}

export function DistributionRow({
  distribution,
  visibility,
  isDetailsOpen,
  onToggleDetails,
  onOpenDerivation,
}: DistributionRowProps) {
  return (
    <>
      {/* Main Row */}
      <div className="distribution-row">
        {/* Name cell with expand button */}
        <div className="table-cell table-cell-name">
          <button
            className="expand-button"
            onClick={onToggleDetails}
            aria-label={`${isDetailsOpen ? 'Collapse' : 'Expand'} ${distribution.name} details`}
          >
            {isDetailsOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          <span className="distribution-name">{distribution.name}</span>
          <span className={`type-badge ${distribution.type}`}>
            {distribution.type}
          </span>
        </div>

        {/* Parameters */}
        <div className="table-cell table-cell-parameters">
          <div className="param-list">
            {distribution.parameters.map((param, idx) => (
              <div key={idx} className="param-item">
                <code>{param.symbol}</code>
                <span className="param-constraint">{param.constraints}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="table-cell table-cell-support">
          <code>{distribution.support}</code>
        </div>

        {/* PDF/PMF */}
        <FormulaCell
          label="PDF/PMF"
          formula={distribution.pmfPdf}
          onClick={() => onOpenDerivation(distribution.id, 'pmfPdf')}
        />

        {/* E[X] */}
        {visibility.mean && (
          <FormulaCell
            label="E[X]"
            formula={distribution.mean}
            onClick={() => onOpenDerivation(distribution.id, 'mean')}
          />
        )}

        {/* Var(X) */}
        {visibility.variance && (
          <FormulaCell
            label="Var(X)"
            formula={distribution.variance}
            onClick={() => onOpenDerivation(distribution.id, 'variance')}
          />
        )}

        {/* CDF */}
        {visibility.cdf && distribution.cdf && (
          <FormulaCell
            label="CDF"
            formula={distribution.cdf}
            onClick={() => onOpenDerivation(distribution.id, 'cdf')}
          />
        )}

        {visibility.cdf && !distribution.cdf && (
          <div className="table-cell table-cell-cdf">
            <span className="not-available">N/A</span>
          </div>
        )}

        {/* MGF */}
        {visibility.mgf && distribution.mgf && (
          <FormulaCell
            label="MGF"
            formula={distribution.mgf}
            onClick={() => onOpenDerivation(distribution.id, 'mgf')}
          />
        )}

        {visibility.mgf && !distribution.mgf && (
          <div className="table-cell table-cell-mgf">
            <span className="not-available">N/A</span>
          </div>
        )}
      </div>

      {/* Expanded Details Panel */}
      {isDetailsOpen && (
        <DetailsPanel
          distribution={distribution}
          onOpenDerivation={onOpenDerivation}
        />
      )}
    </>
  );
}
