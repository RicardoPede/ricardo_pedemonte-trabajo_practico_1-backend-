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
    }
}, {
    // Habilitar la creación automática de createdAt y updatedAt
    timestamps: true,
    sequelize,
    paranoid: true,
    modelName: 'Productos',
    tableName: 'productos',
    underscored: true
});

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
    }
}, {
    timestamps: true,
    sequelize,
    paranoid: true,
    modelName: 'Comentario',
    tableName: 'comentarios',
    underscored: true
});

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
    contraseña: {
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

// Definir relaciones entre entidades
Product.hasMany(Comment, { foreignKey: 'id_producto' });
Comment.belongsTo(Product, { foreignKey: 'id_producto' });
Comment.belongsTo(Users, { foreignKey: 'id_usuario' });

// Productos.sync()
Product.sync()
Comment.sync()
Users.sync()

// Exportar los modelos
export default {
    Product,
    Comment,
    Users
};