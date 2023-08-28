import Comment from '../models/modelsComments.js';

const index = async (req, res) => {
    try {
        const comments = await Comment.findAll();

        if (!comments || comments.length === 0) {
            throw {
                status: 404,
                message: 'No hay comentarios registradas aún.',
            };
        }
        return res.json(comments);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor',
        });
    }
};

export {index};
