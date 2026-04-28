/**
 * DistributionTable.tsx
 * Main container component that orchestrates the entire table
 */

'use client';

import React, { useState, useCallback } from 'react';
import { distributions } from '@/lib/distributions';
import { ColumnVisibility, ExpandedState } from '@/lib/types';
import { TableHeader } from './TableHeader';
import { DistributionRow } from './DistributionRow';
import { DerivationPanel } from './DerivationPanel';
import { ColumnToggle } from './ColumnToggle';
import '../styles/distributions.css';

export function DistributionTable() {
  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    mean: true,
    variance: true,
    cdf: false,
    mgf: false,
  });

  // Track which rows/columns are expanded
  const [expandedState, setExpandedState] = useState<ExpandedState>({});

  // Track which derivation panel is open
  const [activeDerivation, setActiveDerivation] = useState<{
    distributionId: string;
    column: string;
  } | null>(null);

  // Toggle column visibility
  const handleToggleColumn = useCallback((column: keyof ColumnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  }, []);

  // Toggle details panel for a distribution — accordion: only one open at a time
  const handleToggleDetails = useCallback((distributionId: string) => {
    setActiveDerivation(null);
    setExpandedState((prev) => {
      const isCurrentlyOpen = prev[distributionId]?.detailsOpen;
      const reset: ExpandedState = {};
      return isCurrentlyOpen
        ? reset
        : { [distributionId]: { detailsOpen: true } };
    });
  }, []);

  // Open derivation panel for a specific column — close any open details panel
  const handleOpenDerivation = useCallback(
    (distributionId: string, column: string) => {
      setExpandedState({});
      setActiveDerivation({ distributionId, column });
    },
    []
  );

  // Close derivation panel
  const handleCloseDerivation = useCallback(() => {
    setActiveDerivation(null);
  }, []);

  // Navigate to next distribution in derivation panel
  const handleNextDistribution = useCallback(() => {
    if (!activeDerivation) return;

    const currentIndex = distributions.findIndex(
      (d) => d.id === activeDerivation.distributionId
    );
    if (currentIndex < distributions.length - 1) {
      setActiveDerivation({
        ...activeDerivation,
        distributionId: distributions[currentIndex + 1].id,
      });
    }
  }, [activeDerivation]);

  // Navigate to previous distribution in derivation panel
  const handlePrevDistribution = useCallback(() => {
    if (!activeDerivation) return;

    const currentIndex = distributions.findIndex(
      (d) => d.id === activeDerivation.distributionId
    );
    if (currentIndex > 0) {
      setActiveDerivation({
        ...activeDerivation,
        distributionId: distributions[currentIndex - 1].id,
      });
    }
  }, [activeDerivation]);

  const currentDistribution = activeDerivation
    ? distributions.find((d) => d.id === activeDerivation.distributionId)
    : null;

  return (
    <div className="distribution-table-container">
      <div className="distribution-table-header-section">
        <h1>Probability Distributions Reference</h1>
        <p className="subtitle">
          Interactive guide with step-by-step derivations
        </p>
      </div>

      <div className="distribution-table-main">
        <ColumnToggle
          visibility={columnVisibility}
          onToggle={handleToggleColumn}
        />

        <div className="distribution-table-wrapper">
          <TableHeader visibility={columnVisibility} />

          <div className="distribution-rows-container">
            {distributions.map((distribution) => (
              <DistributionRow
                key={distribution.id}
                distribution={distribution}
                visibility={columnVisibility}
                isDetailsOpen={expandedState[distribution.id]?.detailsOpen || false}
                onToggleDetails={() => handleToggleDetails(distribution.id)}
                onOpenDerivation={handleOpenDerivation}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Derivation Panel */}
      {currentDistribution && activeDerivation && (
        <DerivationPanel
          distribution={currentDistribution}
          column={activeDerivation.column}
          onClose={handleCloseDerivation}
          onNextDistribution={handleNextDistribution}
          onPrevDistribution={handlePrevDistribution}
          hasNext={
            distributions.findIndex((d) => d.id === currentDistribution.id) <
            distributions.length - 1
          }
          hasPrev={
            distributions.findIndex((d) => d.id === currentDistribution.id) > 0
          }
        />
      )}

      {/* Progress indicator */}
      <div className="distribution-progress">
        <span>{distributions.length} distributions loaded</span>
      </div>
    </div>
  );
}
