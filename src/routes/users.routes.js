import { Router } from 'express'

import { indexView, index } from '../controllers/users.controllers.js'

const router = Router()

// Vistas
router.get('/users', indexView)

// API
router.get('/api/users', index)

console.log(router.route)
export default router