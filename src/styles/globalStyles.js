// src/styles/globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Didot', serif;
    background-color: #f5f5f5;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #333;
    font-weight: 600;
  }

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: 'Arial', sans-serif;
    font-size: 14px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #007bff;
      color: #fff;
    }
  }

  input, textarea {
    font-family: 'Arial', sans-serif;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

export default GlobalStyle;
