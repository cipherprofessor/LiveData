import { Router } from 'express';

const router = Router();

// TODO: Implement auth controllers
// router.post('/register', register);
// router.post('/login', login);
// router.post('/refresh', refreshToken);
// router.post('/logout', authenticate, logout);
// router.post('/verify-email', verifyEmail);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);

// Placeholder routes
router.post('/register', (req, res) => {
  res.status(501).json({ message: 'Registration endpoint - Coming soon' });
});

router.post('/login', (req, res) => {
  res.status(501).json({ message: 'Login endpoint - Coming soon' });
});

export default router;
