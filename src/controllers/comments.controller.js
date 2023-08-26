import Comment from '../models/models.js';
import Op from 'sequelize';

//VISTAS
const indexView = (_req, res) => {
    res.render('comments/index');
};

//APIS
const index = async (req, res) => {

    const { name } = req.query;

    try {
        const comments = await Comment.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });

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

// const show = async (req, res) => {
//     const commentId = req.params.id;

//     try {
//         const comment = await Comment.findByPk(commentId);


//         if (!comment) {
//             throw {
//                 status: 404,
//                 message: 'No existe el comentario con el id ' + commentId,
//             };
//         }

//         return res.json(comment);
//     } catch (error) {
//         return res
//             .status(error.status || 500)
//             .json(error.message || 'Error interno del servidor');
//     }
// };

// const store = async (req, res) => {
//     const {
//         name, permanency
//     } = req.body;

//     console.log(req.body);

//     try {
//         const [comment, created] = await Comment.findOrCreate({
//             where: { name },
//             defaults: {
//                 permanency
//             },
//         });

//         if (!comment) {
//             throw {
//                 status: 400,
//                 message: 'No se pudo crear el comentario.',
//             };
//         }

//         return res.status(201).json({ comment, message: 'Comentario creado correctamente.' });

//     } catch (error) {
//         return res
//             .status(error.status || 500)
//             .json(error.message || 'Error interno del servidor');
//     }
// };

// const update = async (req, res) => {
//     const commentId = req.params.id;
//     const {
//         name, permanency
//     } = req.body;
//     try {
//         const comment = await Comment.findByPk(commentId);
//         comment.update({
//             name, permanency
//         });
//         return res.json({ comment, message: 'Comentario so editó correctamente.' });
//     } catch (error) {
//         return res
//             .status(error.status || 500)
//             .json(error.message || 'Error interno del servidor');
//     }
// };

// const destroy = async (req, res) => {
//     const commentId = req.params.id;
//     try {
//         const comment = await Comment.destroy({
//             where: {
//                 id: commentId
//             }
//         });
//         return res.json({ comment, message: 'comentario eliminada correctamente.' });
//     } catch (error) {
//         return res
//             .status(error.status || 500)
//             .json(error.message || 'Error interno del servidor');
//     }
// };

export {
    indexView,
    index
};