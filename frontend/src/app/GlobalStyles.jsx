import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-primary: "Poppins", sans-serif;
    --font-secondary: "Inter", sans-serif;
    /* Light Theme */
    --primary-color: #007bff; /* Accent color (e.g., selected items) */
    --secondary-color: #666666; /* Supporting elements */
    --background-light: #ebeff5;
    --background-dark: #12121c;
    --text-light: #333333; /* Default text color for light mode */
    --text-dark: #f0f0f0; /* Default text color for dark mode */
    --heading-color: #111111; /* Color for headings */
    --primary-hover-color: #0056b3;
    --input-bg: #ffffff;
    --input-border: #ccc;
    --input-text: #333;
    --input-focus-border: var(--primary-color);
    --input-focus-shadow: rgba(0, 123, 255, 0.5);
  }

  body {
    background: var(--background-light);
    color: var(--text-light);
    font-family: var(--font-secondary);
    // font-family: "Arial", sans-serif;
    margin: 0;
    padding: 0;
  }

  /* Dark mode styling */
  [data-theme="dark"] {
    background: var(--background-dark);
    color: var(--text-dark);
  }

  /* Global text styles */
  h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-primary);
    color: var(--heading-color);
  }

  .table-row:hover {
  background-color: var(--primary-hover-color);
  color: #fff; /* Ensures text remains readable */
}

  p {
    color: var(--text-light);
  }

  a {
    color: var(--text-light);
    text-decoration: none;
  }

  a.active, a:hover {
    color: var(--primary-color);
    font-weight: bold;
  }

  button {
    color: var(--text-dark);
    background: var(--primary-color);
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
  &:has(img) {
    filter: invert(1);}
    background: var(--primary-hover-color);
    // color: var(--text-light)
  }

  input {
    width: 100%;
    padding: 10px 14px;
    font-size: 16px;
    border: 2px solid var(--input-border);
    border-radius: 6px;
    background-color: var(--input-bg);
    color: var(--input-text);
    outline: none;
    transition: border 0.3s, box-shadow 0.3s;
    max-width: 100px;
  }

  input:focus {
    border-color: var(--input-focus-border);
    box-shadow: 0 0 6px var(--input-focus-shadow);
  }

  select {
    width: 100%;
    padding: 10px 14px;
    font-size: 16px;
    border: 2px solid var(--input-border);
    border-radius: 6px;
    background-color: var(--input-bg);
    color: var(--input-text);
    outline: none;
    transition: border 0.3s, box-shadow 0.3s;
    appearance: none; /* Removes default browser styles */
    cursor: pointer;
  }

  /* Add a custom dropdown arrow */
  select::after {
    content: "▼";
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--input-text);
    pointer-events: none;
  }

  /* Focus & Hover Effects */
  select:focus,
  select:hover {
    border-color: var(--input-focus-border);
    box-shadow: 0 0 6px var(--input-focus-shadow);
  }
`;
