import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { register, login } from '../controllers/authController.js';
import { sendMessage } from '../controllers/chatController.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: 'serenia',
  });
  isConnected = true;
}

// Ruta de prueba
app.get('/', async (req, res) => {
  try {
    await connectDB();
    res.send('Funciona backend Serenia ✅');
  } catch (err) {
    res.status(500).send('Error de conexión');
  }
});

// Rutas API
app.post('/api/register', async (req, res) => {
  try {
    await connectDB();
    await register(req, res);
  } catch (err) {
    res.status(500).send('Error en /register');
  }
});

app.post('/api/login', async (req, res) => {
  try {
    await connectDB();
    await login(req, res);
  } catch (err) {
    res.status(500).send('Error en /login');
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    await connectDB();
    await sendMessage(req, res);
  } catch (err) {
    res.status(500).send('Error en /chat');
  }
});

export default app;
