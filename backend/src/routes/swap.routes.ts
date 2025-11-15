import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

// All swap routes require authentication
router.use(authenticate);

// TODO: Implement swap controllers
// router.post('/', createSwap);
// router.get('/', getSwaps);
// router.get('/:id', getSwapById);
// router.patch('/:id/accept', acceptSwap);
// router.patch('/:id/reject', rejectSwap);
// router.patch('/:id/complete', completeSwap);
// router.patch('/:id/cancel', cancelSwap);

// Placeholder routes
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Get swaps - Coming soon' });
});

export default router;
