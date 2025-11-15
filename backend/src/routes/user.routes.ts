import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

// All user routes require authentication
router.use(authenticate);

// TODO: Implement user controllers
// router.get('/profile', getProfile);
// router.put('/profile', updateProfile);
// router.get('/search', searchUsers);
// router.get('/:id', getUserById);

// Placeholder routes
router.get('/profile', (req, res) => {
  res.status(501).json({ message: 'Get profile endpoint - Coming soon' });
});

export default router;
