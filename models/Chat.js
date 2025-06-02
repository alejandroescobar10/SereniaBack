import mongoose from 'mongoose';

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
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
