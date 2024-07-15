// src/components/OutfitBoard.js
import React from 'react';
import OutfitCard from './OutfitCard';

function OutfitBoard() {
  // Dummy data for outfits
  const outfits = [
    { id: 1, name: 'Summer Vibes', items: ['Shirt', 'Shorts', 'Sunglasses'] },
    { id: 2, name: 'Winter Warmth', items: ['Jacket', 'Jeans', 'Scarf'] },
  ];

  return (
    <div>
      {outfits.map(outfit => (
        <OutfitCard key={outfit.id} outfit={outfit} />
      ))}
    </div>
  );
}

export default OutfitBoard;