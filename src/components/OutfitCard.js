// src/components/OutfitCard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const LikeButton = styled.button`
  background-color: ${(props) => (props.isLiked ? '#007bff' : '#ced4da')};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isLiked ? '#0056b3' : '#b1b7bd')};
  }
`;

const Icon = styled.span`
  margin-right: 5px;
`;

const CommentSection = styled.div`
  padding: 10px;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-bottom: 10px;
`;

const CommentForm = styled.form`
  display: flex;
  margin-top: 10px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 5px;
  margin-right: 10px;
`;

const CommentButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const OutfitCard = ({ outfit, onDelete, onLike, onComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      onComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Card>
      <Image src={outfit.imageUrl} alt={outfit.description} />
      <Actions>
        <LikeButton onClick={onLike} isLiked={outfit.isLiked}>
          <Icon>{outfit.isLiked ? <FaThumbsDown /> : <FaThumbsUp />}</Icon>
          {outfit.isLiked ? 'Unlike' : 'Like'} ({outfit.likes})
        </LikeButton>
        <button onClick={onDelete}>Delete</button>
      </Actions>
      <CommentSection>
        <CommentList>
          {outfit.comments.map((comment, index) => (
            <CommentItem key={index}>{comment}</CommentItem>
          ))}
        </CommentList>
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInput
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleCommentChange}
          />
          <CommentButton type="submit">Add</CommentButton>
        </CommentForm>
      </CommentSection>
    </Card>
  );
};

export default OutfitCard;
