//Importar Sequelize y la configuración de la conexión a la base de datos
import { sequelize, DataTypes } from '../database/config.js';

// Definir el modelo para la entidad Comentario
const Comment = sequelize.define('Comentario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
}
},{
    timestamps: true,
    sequelize,
    paranoid: true,
    modelName: 'Comentario',
    tableName: 'comentarios',
    underscored: true
});

// Productos.sync()
Comment.sync()

// Exportar el modelo
export default Comment