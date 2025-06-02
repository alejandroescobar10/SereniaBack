const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', chatRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Servidor en http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => console.error(err));

