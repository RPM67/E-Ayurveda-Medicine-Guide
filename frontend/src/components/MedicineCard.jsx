import React, { useState } from 'react';
import FeedbackSection from './FeedbackSection';
import './MedicineCard.css';

const MedicineCard = ({ medicine }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const handlePurchaseClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="medicine-card">
      {medicine.image && (
        <img
          src={`http://localhost:5000${medicine.image}`}
          alt={medicine.name}
          className="medicine-image"
        />
      )}

      <div className="medicine-content">
        <h2>{medicine.name}</h2>
        <p className="description">{medicine.description}</p>

        <div className="details">
          <h3>Benefits:</h3>
          <ul>
            {medicine.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>

          <h3>Side Effects:</h3>
          <ul>
            {medicine.sideEffects.map((effect, index) => (
              <li key={index}>{effect}</li>
            ))}
          </ul>

          <p><strong>Dosage:</strong> {medicine.dosage}</p>

          {/* Simplified Purchase Section */}
          {medicine.purchaseLinks && medicine.purchaseLinks.length > 0 && (
            <div className="purchase-section">
              <h3>Best Purchase Link:</h3>
              <a
                href={medicine.purchaseLinks[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="purchase-link"
              >
                {medicine.purchaseLinks[0]}
              </a>
            </div>
          )}
        </div>

        <button
          className="feedback-toggle"
          onClick={() => setShowFeedback(!showFeedback)}
        >
          {showFeedback ? 'Hide Feedback' : 'Show Feedback'}
        </button>

        {showFeedback && (
          <FeedbackSection medicineName={medicine.name} />
        )}
      </div>
    </div>
  );
};

export default MedicineCard;