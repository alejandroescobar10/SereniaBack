const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const connectDB = require('../lib/db');
require('dotenv').config();

const authRoutes = require('../controllers/authController');
const chatRoutes = require('../controllers/chatController');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta base
app.get('/', async (req, res) => {
  await connectDB();
  res.send('Funciona backend Serenia ✅');
});

app.post('/api/register', async (req, res) => {
  await connectDB();
  return authRoutes.register(req, res);
});

app.post('/api/login', async (req, res) => {
  await connectDB();
  return authRoutes.login(req, res);
});

app.post('/api/chat', async (req, res) => {
  await connectDB();
  return chatRoutes.sendMessage(req, res);
});

module.exports = serverless(app);
