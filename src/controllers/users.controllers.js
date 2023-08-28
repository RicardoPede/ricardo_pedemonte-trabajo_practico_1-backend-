import Users from '../models/modelsUsers.js';
import bcryptjs from 'bcryptjs';

const index = async (req, res) => {
    try {
        const users = await Users.findAll();

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

const store = async (req, res) => {
    const {
        nombre,
        correoElectronico,
        password
    } = req.body;

    let passHash = await bcryptjs.hash(password, 8);

    try {
        const existeUser = await Users.findOne({
            where: { correoElectronico }
        });
        if (existeUser) {
            throw ({
                status: 400,
                message: 'El correo electrónico ya existe con otro Usuario'
            })
        };

        const nuevoUsers = new Users({
            nombre,
            correoElectronico,
            password: passHash
        });

        const createUser = nuevoUsers.save();
        if (!createUser) {
            throw ({
                message: 'Error al crear el usuario'
            })
        }
        return res.status(201).json({
            message: 'Usuario creado correctamente'
        })
    }
    catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al crear el usuario'
        })
    }
}

export {
    index,
    show,
    store
};