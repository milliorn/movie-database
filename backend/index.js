// ESM Syntax
import dotenv from 'dotenv';
import express from 'express';

dotenv.config(); // Load environment variables from a .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3002; // Get the port from the environment variables

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Hello World running on http://localhost:${PORT}/hello`)
});
