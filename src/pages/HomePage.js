// src/pages/HomePage.js
import React from 'react';
import styled from 'styled-components';
import ImageCard from '../components/ImageCard';

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

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const HomePage = () => {
  const images = [
    {
      imageUrl: 'https://example.com/image1.jpg',
      description: 'Description for image 1',
    },
    {
      imageUrl: 'https://example.com/image2.jpg',
      description: 'Description for image 2',
    },
    {
      imageUrl: 'https://example.com/image3.jpg',
      description: 'Description for image 3',
    },
    {
      imageUrl: 'https://example.com/image4.jpg',
      description: 'Description for image 4',
    },
    {
      imageUrl: 'https://example.com/image5.jpg',
      description: 'Description for image 5',
    },
    {
      imageUrl: 'https://example.com/image6.jpg',
      description: 'Description for image 6',
    },
  ];

  return (
    <Container>
      <Title>Welcome to My Shopping App</Title>
      <ImageGrid>
        {images.map((image, index) => (
          <ImageCard key={index} imageUrl={image.imageUrl} description={image.description} />
        ))}
      </ImageGrid>
    </Container>
  );
};

export default HomePage;