const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    messages: [
        {
            sender: String, // 'user' o 'serenia'
            content: String,
            timestamp: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Chat', chatSchema);
