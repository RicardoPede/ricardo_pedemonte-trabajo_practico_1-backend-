import { Router } from 'express'

import { index, show, store } from '../controllers/users.controllers.js'
import { userValidation } from '../validation/checkUsers.js';
import { validationSchema } from '../validation/validation.js';

const router = Router()

// API
router.get('/api/users', index)
router.get('/api/users/:id/show', show);
router.post("/api/users", userValidation, validationSchema, store);

console.log(router.route)
export default router