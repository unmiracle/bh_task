import { Router } from 'express';

import { auth } from '../common/middlewares/auth.middleware';
import { authorizeRole } from '../common/middlewares/role.middleware';
import { ROLES } from '../users/consts/role.const';

import {
  createBook,
  deleteBookById,
  findBookById,
  findBooks,
  updateBookById,
} from './books.service';

const router = Router();

router.get('/books', findBooks);

router.get('/books/:id', findBookById);

router.post('/books', auth, authorizeRole(ROLES.ADMIN), createBook);

router.put('/books/:id', auth, authorizeRole(ROLES.ADMIN), updateBookById);

router.delete('/books/:id', auth, authorizeRole(ROLES.ADMIN), deleteBookById);

export default router;
