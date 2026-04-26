/**
 * TableHeader.tsx
 * Renders table header with dynamic columns
 */

'use client';

import React from 'react';
import { ColumnVisibility } from '@/lib/types';

interface TableHeaderProps {
  visibility: ColumnVisibility;
}

export function TableHeader({ visibility }: TableHeaderProps) {
  return (
    <div className="distribution-table-header">
      <div className="table-cell table-cell-name">
        <span>Distribution</span>
      </div>
      <div className="table-cell table-cell-parameters">
        <span>Parameters</span>
      </div>
      <div className="table-cell table-cell-support">
        <span>Support</span>
      </div>
      <div className="table-cell table-cell-pdf">
        <span>PDF/PMF</span>
      </div>

      {visibility.mean && (
        <div className="table-cell table-cell-mean">
          <span>E[X]</span>
        </div>
      )}

      {visibility.variance && (
        <div className="table-cell table-cell-variance">
          <span>Var(X)</span>
        </div>
      )}

      {visibility.cdf && (
        <div className="table-cell table-cell-cdf">
          <span>CDF</span>
        </div>
      )}

      {visibility.mgf && (
        <div className="table-cell table-cell-mgf">
          <span>MGF</span>
        </div>
      )}
    </div>
  );
}
