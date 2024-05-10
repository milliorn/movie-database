// ESM Syntax
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';

dotenv.config(); // Load environment variables from a .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Get the port from the environment variables

app.get('/example', async (req, res) => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  res.send(data);
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
