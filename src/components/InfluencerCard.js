// src/components/InfluencerCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
`;

function InfluencerCard() {
  // Dummy data for influencer
  const influencer = { name: 'Fashionista', collection: ['Dress', 'Heels', 'Clutch'] };

  return (
    <Card>
      <h2>{influencer.name}</h2>
      <ul>
        {influencer.collection.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}

export default InfluencerCard;
