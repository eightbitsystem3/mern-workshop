import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'mysecretkey';

export const createToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '7d' });
};

export const getUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, SECRET);
    } catch {
        return null;
    }
};
