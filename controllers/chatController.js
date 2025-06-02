import Chat from '../models/Chat.js';
import { getSereniaResponse } from '../services/openaiService.js';

export async function sendMessage(req, res) {
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
    console.error(err);
    res.status(500).json({ error: 'Error al responder' });
  }
}
