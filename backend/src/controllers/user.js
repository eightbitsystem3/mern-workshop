import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../utils/jwt.js';

const handleRegister = async (req, res) => {
    const { fullname, email, mobile, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ fullname, email, mobile, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = createToken(user);
        res.cookie('JWT_TOKEN', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: 'Login successful', user: { id: user._id, fullname: user.fullname, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export { handleRegister, handleLogin }
