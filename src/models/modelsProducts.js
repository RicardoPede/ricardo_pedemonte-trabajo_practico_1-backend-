//Importar Sequelize y la configuración de la conexión a la base de datos
import { sequelize, DataTypes } from '../database/config.js';

//Definir el modelo para la entidad Producto
const Product = sequelize.define('Productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
// Habilitar la creación automática de createdAt y updatedAt
    timestamps: true,
    sequelize,
    paranoid: true,
    modelName: 'Productos',
    tableName: 'productos',
    underscored: true
});

// Productos.sync()
Product.sync()

// Exportar el modelo
export default Product