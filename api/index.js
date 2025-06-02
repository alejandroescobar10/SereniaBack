const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
require('dotenv').config();

const authRoutes = require('../controllers/authController');
const chatRoutes = require('../controllers/chatController');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('Funciona backend Serenia ✅');
});

// Rutas reales
app.post('/api/register', authRoutes.register);
app.post('/api/login', authRoutes.login);
app.post('/api/chat', chatRoutes.sendMessage);

// Exportar como función serverless
module.exports = serverless(app);
