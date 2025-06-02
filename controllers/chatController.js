const Chat = require('../models/Chat');
const { getSereniaResponse } = require('../services/openaiService');

export async function sendMessage (req, res) {
    const { userId, message } = req.body;

    try {
        const sereniaReply = await getSereniaResponse(message);

        const chat = await Chat.findOneAndUpdate(
            { user: userId },
            {
                $push: {
                    messages: [
                        { sender: 'user', content: message },
                        { sender: 'serenia', content: sereniaReply }
                    ]
                }
            },
            { new: true, upsert: true }
        );

        res.json({ reply: sereniaReply, chat });
    } catch (err) {
        res.status(500).json({ error: 'Error al responder' });
    }
};
