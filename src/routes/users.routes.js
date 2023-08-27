import { Router } from 'express'

import { indexView, index, showView, show } from '../controllers/users.controllers.js'

const router = Router()

// Vistas
router.get('/users', indexView)
router.get("/users/:id/show", showView);

// API
router.get('/api/users', index)
router.get('/api/users/:id/show', show);

console.log(router.route)
export default router