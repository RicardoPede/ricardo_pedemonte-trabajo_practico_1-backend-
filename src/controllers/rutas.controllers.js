import { join } from 'path';
const Controllers = {};
// import { Productos } from '../models/models.js';

Controllers.index = (req, res) => {
    res.render('./index')
};

export default Controllers