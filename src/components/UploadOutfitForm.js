// src/components/UploadOutfitForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  align-self: flex-end;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const UploadOutfitForm = ({ addOutfit }) => {
  const [outfit, setOutfit] = useState({
    name: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutfit({ ...outfit, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOutfit(outfit);
    setOutfit({ name: '', description: '', image: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Outfit Name</Label>
        <Input
          type="text"
          name="name"
          value={outfit.name}
          onChange={handleChange}
          placeholder="Outfit Name"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          name="description"
          value={outfit.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="image">Image URL</Label>
        <Input
          type="text"
          name="image"
          value={outfit.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
      </FormGroup>
      <Button type="submit">Add Outfit</Button>
    </Form>
  );
};

export default UploadOutfitForm;
