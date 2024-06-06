/**
 * Entry point of the application.
 * Renders the App component inside the root element of the HTML document.
 */
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root"),
// );

import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') ?? document.createElement('div');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);