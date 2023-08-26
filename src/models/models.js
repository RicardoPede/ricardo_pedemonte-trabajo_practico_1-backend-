//Importar Sequelize y la configuración de la conexión a la base de datos
import { sequelize, DataTypes } from '../database/config.js';

//Definir el modelo para la entidad Producto
const Productos = sequelize.define('Productos', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize.TEXT,
        allowNull: false
    },
    precio: {
        type: sequelize.DECIMAL(10, 2),
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
const Comentario = sequelize.define('Comentario', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contenido: {
        type: sequelize.TEXT,
        allowNull: false
    },
    fechaHora: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
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
const Usuario = sequelize.define('Usuario', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize.STRING,
        allowNull: false
    },
    correoElectronico: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: sequelize.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
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
Productos.hasMany(Comentario, { foreignKey: 'id_producto' });
Comentario.belongsTo(Productos, { foreignKey: 'id_producto' });
Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Productos.sync()
Productos.sync()
Comentario.sync()
Usuario.sync()
// Exportar los modelos
export default {
    Productos,
    Comentario,
    Usuario
};