import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

// TODO: Implement skill controllers
// router.get('/categories', getCategories);
// router.get('/', getSkills);
// router.post('/', authenticate, addUserSkill);
// router.put('/:id', authenticate, updateUserSkill);
// router.delete('/:id', authenticate, deleteUserSkill);

// Placeholder routes
router.get('/categories', (req, res) => {
  res.status(501).json({ message: 'Get skill categories - Coming soon' });
});

router.get('/', (req, res) => {
  res.status(501).json({ message: 'Get skills - Coming soon' });
});

export default router;
