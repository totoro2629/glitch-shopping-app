import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  /* Your styles here */
`;

const ImageCard = ({ outfit, onDelete }) => {
  if (!outfit || !outfit.id) {
    // Handle case where outfit or outfit.id is undefined
    return null; // Or render a placeholder or loading state
  }

  return (
    <CardContainer>
      {/* Render your card content using outfit.id and other properties */}
      <img src={outfit.imageUrl} alt={outfit.name} />
      <button onClick={onDelete}>Delete</button>
      {/* Additional card content */}
    </CardContainer>
  );
};

export default ImageCard;