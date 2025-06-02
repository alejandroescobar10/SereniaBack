const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = new User({ email, password, name });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (err) {
        res.status(400).json({ error: 'Error al registrar' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        res.json({ message: 'Login exitoso', userId: user._id, name: user.name });
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
