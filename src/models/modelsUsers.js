//Importar Sequelize y la configuración de la conexión a la base de datos
import { sequelize, DataTypes } from '../database/config.js';

// Definir el modelo para la entidad Usuario
const Users = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correoElectronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true,
    sequelize,
    paranoid: true,
    modelName: 'Usuario',
    tableName: 'usuarios',
    underscored: true
});

// Productos.sync()
Users.sync()

// Exportar el modelo
export default Users;