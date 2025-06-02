const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const connectDB = require('../lib/db');
const authController = require('../controllers/authController');
const chatController = require('../controllers/chatController');

const app = express();
app.use(cors());
app.use(express.json());

// Middleware para conectar a DB antes de cada request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).send('Error conectando a MongoDB');
  }
});

// Ruta test
app.get('/', (req, res) => {
  res.send('Funciona backend Serenia ✅');
});

// Rutas reales
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.post('/api/chat', chatController.sendMessage);

module.exports = serverless(app);
