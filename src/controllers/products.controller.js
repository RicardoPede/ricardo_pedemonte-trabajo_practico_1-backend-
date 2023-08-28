import { Product, Users } from '../models/models.js';
import { Comment } from '../models/models.js';

const index = async (req, res) => {
    
    try {
        const products = await Product.findAll({
            include: {
                model: Comment,
                include: Users,
            },
            order: [[Comment, 'createdAt', 'DESC']],
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
        const product = await Product.findByPk(productId, {
            include: {
                model: Comment
            },
            order: [[Comment, 'createdAt', 'DESC']],
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
        id_usuario,
        id_comentario,
    } = req.body;

    try {
        const [product, created] = await Product.findOrCreate({
            where: { id_usuario: id_usuario, nombre: nombre, descripcion: descripcion },
            defaults: {
                nombre,
                descripcion,
                precio,
                id_usuario,
                id_comentario
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
        const product = await Product.findByPk(productId);
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
        return res.json({ product, message: 'producto eliminado correctamente.' });
    } catch (error) {
        return res
            .status(error.status || 500)
            .json(error.message || 'Error interno del servidor');
    }
};

export {
    index,
    show,
    store,
    update,
    destroy,
};