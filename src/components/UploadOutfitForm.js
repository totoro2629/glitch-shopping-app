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
  margin-bottom: 10px;
`;

const Button = styled.button`
  align-self: flex-end;
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: grey;
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload here, such as uploading to a server or displaying preview
      // For simplicity, assuming you upload the file and get back a URL
      const imageUrl = URL.createObjectURL(file);
      setOutfit({ ...outfit, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOutfit(outfit);
    setOutfit({ name: '', description: '', image: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Outfit / Outfit Board Name</Label>
        <Input
          type="text"
          id="name"
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
          id="description"
          name="description"
          value={outfit.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          type="text"
          id="imageUrl"
          name="image"
          value={outfit.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="imageFile">Upload Image File</Label>
        <Input
          type="file"
          id="imageFile"
          name="imageFile"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
        />
      </FormGroup>
      <Button type="submit">Add Outfit</Button>
    </Form>
  );
};

export default UploadOutfitForm;