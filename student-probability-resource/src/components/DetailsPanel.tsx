/**
 * DetailsPanel.tsx
 * Expanded panel showing comments, examples, and related distributions
 */

'use client';

import React from 'react';
import { Distribution } from '@/lib/types';

interface DetailsPanelProps {
  distribution: Distribution;
  onOpenDerivation: (distributionId: string, column: string) => void;
}

export function DetailsPanel({
  distribution,
  onOpenDerivation,
}: DetailsPanelProps) {
  return (
    <div className="details-panel">
      {/* Comments Section */}
      {distribution.comments.length > 0 && (
        <div className="details-section">
          <h4 className="section-title">💡 Comments</h4>
          <ul className="comments-list">
            {distribution.comments.map((comment, idx) => (
              <li key={idx}>{comment}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Examples Section */}
      {distribution.examples.length > 0 && (
        <div className="details-section">
          <h4 className="section-title">📝 Examples</h4>
          <div className="examples-container">
            {distribution.examples.map((example, idx) => (
              <div key={idx} className="example-card">
                <h5 className="example-title">{example.title}</h5>
                <p className="example-description">{example.description}</p>

                {example.setup && (
                  <div className="example-part">
                    <strong>Setup:</strong>
                    <pre>{example.setup}</pre>
                  </div>
                )}

                {example.calculation && (
                  <div className="example-part">
                    <strong>Calculation:</strong>
                    <pre>{example.calculation}</pre>
                  </div>
                )}

                {example.answer && (
                  <div className="example-part answer">
                    <strong>Answer:</strong>
                    <p>{example.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Distributions */}
      {distribution.relatedDistributions.length > 0 && (
        <div className="details-section">
          <h4 className="section-title">🔗 Related Distributions</h4>
          <ul className="related-list">
            {distribution.relatedDistributions.map((related, idx) => (
              <li key={idx}>
                <span className="relationship-label">{related.relationship}:</span>
                <span className="related-name">{related.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
