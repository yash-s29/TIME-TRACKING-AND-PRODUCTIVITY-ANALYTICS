import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Chart from './chart.jsx'; // <-- Importing Chart directly
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Make sure your HTML file has a <div id='root'></div>");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <div>
      <App />
      <Chart /> {/* Rendering Chart directly below App */}
    </div>
  </StrictMode>
);
