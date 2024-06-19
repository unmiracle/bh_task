import { Router } from 'express';

import { auth } from '../common/middlewares/auth.middleware';
import { authorizeRole } from '../common/middlewares/role.middleware';

import { ROLES } from './consts/role.const';
import { getCurrentUser, loginUser, registerUser, updateUserRole } from './users.service';

const router = Router();

router.get('/users/me', auth, getCurrentUser);

router.post('/users/register', registerUser);

router.post('/users/login', loginUser);

// почему не PATCH а PUT?
router.put('/users/:id/role', auth, authorizeRole(ROLES.ADMIN), updateUserRole);

export default router;
