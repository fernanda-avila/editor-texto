import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 1%;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #f0f0f0;
  }

  textarea {
    width: 100%;
    height: 80vh;
    padding: 1rem;
    font-size: 1.1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    resize: none;
    background: white;
  }

  button {
    margin-right: 1rem;
    padding: 0.6rem 1rem;
    font-size: 1rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0055aa;
  }
`;
