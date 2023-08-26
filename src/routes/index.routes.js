import { Router } from 'express';
const rutas = Router();
import Controllers from '../controllers/rutas.controllers.js';

rutas.get('./', Controllers.index);

export default rutas