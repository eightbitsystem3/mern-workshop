import { Router } from 'express';
import { handleRegister, handleLogin } from '../controllers/user.js';

const router = Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/logout', (req, res) => {
    res.clearCookie('JWT_TOKEN');
    res.json({ message: 'Logged out' });
});

export default router;
