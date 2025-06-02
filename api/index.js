const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('../controllers/authController');
const chatRoutes = require('../controllers/chatController');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/register', authRoutes.register);
app.post('/api/login', authRoutes.login);
app.post('/api/chat', chatRoutes.sendMessage);
app.get('/', (req, res) => {
  res.send('Funciona backend Serenia ✅');
});

// Exporta como handler para Vercel
module.exports = app;
