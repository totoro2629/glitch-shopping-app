// src/pages/MyStylistPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OutfitCard from '../components/OutfitCard';
import UploadOutfitForm from '../components/UploadOutfitForm';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
`;

const OutfitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const MyStylistPage = () => {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    // Load outfits from local storage on component mount
    const storedOutfits = localStorage.getItem('myStylistOutfits');
    if (storedOutfits) {
      setOutfits(JSON.parse(storedOutfits));
    }
  }, []);

  useEffect(() => {
    // Save outfits to local storage whenever outfits state changes
    localStorage.setItem('myStylistOutfits', JSON.stringify(outfits));
  }, [outfits]);

  const addOutfit = (outfit) => {
    setOutfits([...outfits, { ...outfit, id: Date.now(), likes: 0, comments: [] }]);
  };

  const deleteOutfit = (id) => {
    const updatedOutfits = outfits.filter((outfit) => outfit.id !== id);
    setOutfits(updatedOutfits);
  };

  const handleLike = (id) => {
    const updatedOutfits = outfits.map((outfit) => {
      if (outfit.id === id) {
        if (!outfit.isLiked) {
          return { ...outfit, likes: outfit.likes + 1, isLiked: true };
        } else {
          return { ...outfit, likes: outfit.likes - 1, isLiked: false };
        }
      }
      return outfit;
    });
    setOutfits(updatedOutfits);
  };

  const handleComment = (id, newComment) => {
    const updatedOutfits = outfits.map((outfit) => {
      if (outfit.id === id) {
        const updatedComments = [...outfit.comments, newComment];
        return { ...outfit, comments: updatedComments };
      }
      return outfit;
    });
    setOutfits(updatedOutfits);
  };

  return (
    <Container>
      <Title>My Stylist</Title>
      <UploadOutfitForm addOutfit={addOutfit} />
      <OutfitGrid>
        {outfits.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            outfit={outfit}
            onDelete={() => deleteOutfit(outfit.id)}
            onLike={() => handleLike(outfit.id)}
            onComment={(newComment) => handleComment(outfit.id, newComment)}
          />
        ))}
      </OutfitGrid>
    </Container>
  );
};

export default MyStylistPage;
