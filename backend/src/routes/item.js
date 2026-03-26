import { Router } from 'express';
import { getItems, createItem, updateItem, deleteItem } from '../controllers/item.js';
import { onlyLoggedInUser } from '../middlewares/auth.js';

const router = Router();

router.use(onlyLoggedInUser); // protect all item routes

router.get('/', getItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
