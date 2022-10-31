// =========================
// Pre-Config for .env file
// =========================
const path = require('path');
const rootDir = path.resolve(__dirname, '.');
const env = require('dotenv').config( { path: `${rootDir}/.env` } ).parsed;

if(!env) {
  throw new Error('Environment variables file not found');
}

const server_port = env['PORT'] || 5000;

// if .env file loaded properly, this should print 3000, else it will print 5000
console.log(`Server configured for port ${server_port}`); 

// ==========================
// General Require Statements
// ==========================
const express = require('express');
const { readFile } = require('fs');

const app = express();

// =================================
// Configure Express Endpoints Here
// =================================

// GET for root directory (default)
app.get('/', (req, res) => {
  readFile('./index.html', (err, data) => {
    if(err) {
      res.status(500).send('Error loading index.html');
    } else {
      res.send(data);
    }
  });
});

// This comes at the end as this starts the server
app.listen(server_port, () => {
  console.log(`Server listening on port ${server_port}`);
});