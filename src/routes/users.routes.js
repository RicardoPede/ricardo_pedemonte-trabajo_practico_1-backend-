import { Router } from 'express'

import { index, show } from '../controllers/users.controllers.js'

const router = Router()

// API
router.get('/api/users', index)
router.get('/api/users/:id/show', show);

console.log(router.route)
export default router