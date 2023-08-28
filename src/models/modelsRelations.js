import Users from "./modelsUsers.js";
import Product from "./modelsProducts.js";
import Comment from "./modelsComments.js";

const relaciones = () => {   
    // Definir relaciones entre entidades
    Users.hasMany(Product, { foreignKey: 'id_usuario' }); // Un usuario puede tener varios productos
    Product.belongsTo(Users, { foreignKey: 'id_usuario' }); // Un producto pertenece a un usuario
    
    Product.hasMany(Comment, { foreignKey: 'id_producto' }); // Un producto puede tener varios comentarios
    Comment.belongsTo(Product, { foreignKey: 'id_producto' }); // Un comentario pertenece a un producto
    
    Comment.belongsTo(Users, { foreignKey: 'id_usuario' }); // Un comentario pertenece a un usuario
    
    // Productos.sync()
    Product.sync()
    Comment.sync()
    Users.sync()
}

export default relaciones