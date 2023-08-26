import Users from '../models/models.js';

const indexView = (req, res) => {
    res.render('users/index')
};

const index = async (req, res) => {
    try {
        const users = await Users();

        if (!users || users.length === 0) {
            throw ({
                status: 404,
                message: 'No hay usuarios registrados aún.'
            })
        }

        return res.json(users);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
}

export {
    indexView,
    index
};