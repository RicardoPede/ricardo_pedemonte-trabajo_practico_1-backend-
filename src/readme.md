# Plataforma de Gestión de Productos

*Este proyecto se trata de crear una plataforma en línea para gestionar productos y sus comentarios asociados. Los usuarios podrán tener uno o más productos asociados, y cada producto podrá tener uno o más comentarios. Se busca permitir operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en estas entidades, así como también registrar usuarios en el servidor. Se utilizará el sistema ORM Sequelize para interactuar con una base de datos MySQL.*

        +----------+      1     n      +----------+
        |  Usuario  |------------------|  Producto|
        +----------+                   +----------+
            |                                  |
            |             1     n              |
            +----------------------------------+
                            |
                            |
                            v
                       +-----------+
                       | Comentario|
                       +-----------+

>> ## Dentro del directorio del proyecto se ejecuta:
```bash
npm install
```

>> ## Requiere de una base de datos MySQL.

### Variables de entorno:
```bash
PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DIALECT=
```

Configurar en el package.json
```bash
 "scripts": {
    "dev" : "nodemon app.js"
  }
```

Y para ejecutar el proyecto en modo desarrollo:
```bash
npm run dev
```

## Servidor HTTP y CRUD

1.	Se crea un proyecto Node.js.
2.	Instala las dependencias necesarias, incluyendo Express y Sequelize.
3.	Configura la conexión a la base de datos MySQL utilizando Sequelize.
4.	Define los modelos (Usuarios, Productos, Comentarios) utilizando Sequelize.
5.	Crea los controladores para realizar las operaciones CRUD en cada entidad.
6.	Implementa las rutas HTTP para cada operación (POST, GET, PUT, DELETE) en los controladores.
7.	Implementa la validación de campos de entrada utilizando bibliotecas como express-validator.
8.	Configura el servidor HTTP utilizando Express y asociar las rutas a los controladores.