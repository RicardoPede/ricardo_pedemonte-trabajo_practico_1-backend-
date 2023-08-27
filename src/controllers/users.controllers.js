import Users from '../models/models.js';

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

const show = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await Users.findByPk(userId);

        if (!user) {
            throw {
                status: 404,
                message: "No existe el usuario con el id " + userId,
            };
        }

        return res.json(user);
    } catch (error) {
        return res
            .status(error.status || 500)
            .json(error.message || "Error interno del servidor");
    }
};


export {
    index,
    show
};