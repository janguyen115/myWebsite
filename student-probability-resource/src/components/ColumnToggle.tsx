/**
 * ColumnToggle.tsx
 * Sidebar for toggling column visibility
 */

'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ColumnVisibility } from '@/lib/types';

interface ColumnToggleProps {
  visibility: ColumnVisibility;
  onToggle: (column: keyof ColumnVisibility) => void;
}

export function ColumnToggle({ visibility, onToggle }: ColumnToggleProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`column-toggle-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button
        className="toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle column visibility panel"
      >
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="column-toggle-content">
          <h3>Columns</h3>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={visibility.mean}
              onChange={() => onToggle('mean')}
            />
            <span>E[X]</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={visibility.variance}
              onChange={() => onToggle('variance')}
            />
            <span>Var(X)</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={visibility.cdf}
              onChange={() => onToggle('cdf')}
            />
            <span>CDF</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={visibility.mgf}
              onChange={() => onToggle('mgf')}
            />
            <span>MGF</span>
          </label>

          <div className="column-toggle-hint">
            <p className="hint-text">
              💡 Click any cell to view derivation
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
