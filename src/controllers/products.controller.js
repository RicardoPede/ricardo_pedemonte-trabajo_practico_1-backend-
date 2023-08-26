import Products from '../models/models.js';
import Comments from '../models/models.js';
import Users from '../models/models.js';
import { Op } from 'sequelize';

import verify from 'jsonwebtoken';
import { promisify } from 'util';
import ProductsComments from '../models/models.js';

//VISTAS
const indexView = (_req, res) => {
    res.render('products/index');
};

const showView = (req, res) => {
    const productId = req.params.id;
    res.render('products/show', { id: productId });
};

const createView = (_req, res) => {
    res.render('products/create');
};

const editView = (req, res) => {
    const productId = req.params.id;
    res.render('products/edit', { id: productId });
};

//APIS
const index = async (req, res) => {
    const { nombre, descripcion, precio } = req.query;

    let whereClausule;

    if (Object.keys(req.query).length !== 0) {
        whereClausule = {
            nombre: {
                [Op.like]: `%${nombre}%`,
            },
            descripcion: {
                [Op.like]: `%${descripcion}%`,
            },
            precio,
        };
    }

    try {
        const products = await Product.findAll({
            where: whereClausule,
            include: {
                model: Comments,
            },
            order: [[Comments, ProductsComments, 'dateprecio', 'DESC']],
        });

        if (!products || products.length === 0) {
            throw {
                status: 404,
                message: 'No hay productos registrados aún.',
            };
        }
        return res.json(products);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor',
        });
    }
};

const show = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Products.findByPk(productId, {
            include: {
                model: Comments
            },
            order: [[Comments, ProductsComments, 'dateprecio', 'DESC']],
        });

        console.log(product);

        if (!product) {
            throw {
                status: 404,
                message: 'No existe el producto con el id ' + productId,
            };
        }

        return res.json(product);
    } catch (error) {
        console.log(error)
        return res
            .status(error.status || 500)
            .json(error.message || 'Error interno del servidor');
    }
};

const store = async (req, res) => {
    const {
        nombre,
        descripcion,
        precio,
        usuario,
        comentario,
    } = req.body;

    const jwtDecodificado = await promisify(verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
    );

    try {
        const [product, created] = await Product.findOrCreate({
            where: { dni: dni },
            defaults: {
                nombre,
                descripcion,
                precio,
                userId: jwtDecodificado.id,
            },
        });

        if (!product) {
            throw {
                status: 400,
                message: 'No se pudo crear el producto.',
            };
        }

        return res.json(product);
    } catch (error) {
        return res
            .status(error.status || 500)
            .json(error.message || 'Error interno del servidor');
    }
};

const update = async (req, res) => {
    const productId = req.params.id;
    const {
        nombre,
        descripcion,
        precio,
    } = req.body;
    try {
        const product = await Prodruct.findByPk(productId);
        product.update({
            nombre,
            descripcion,
            precio
        });
        return res.json(product);
    } catch (error) {
        return res
            .status(error.status || 500)
            .json(error.message || 'Error interno del servidor');
    }
};

const destroy = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.destroy({
            where: {
                id: productId,
            },
        });
        return res.json({ Product, message: 'producto eliminado correctamente.' });
    } catch (error) {
        return res
            .status(error.status || 500)
            .json(error.message || 'Error interno del servidor');
    }
};

export {
    indexView,
    showView,
    editView,
    createView,
    index,
    show,
    store,
    update,
    destroy,
};