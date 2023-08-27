import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

const app = express();
const __dirname = path.dirname('.env');

//variables de entorno
// dotenv.config({ path: '.env' });

import usersRoutes from './routes/users.routes.js';
import productsRoutes from './routes/products.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

//Se importa la instancia de conexión a la base de datos
import { sequelize } from './database/config.js';

//Middlewares
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuración del motor de plantillas
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

//Carpeta public para archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', usersRoutes);
app.use('/', productsRoutes);
app.use('/', commentsRoutes);
app.use('/', dashboardRoutes);

//Se ejecuta instancia de conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a base de datos exitosa');
    })
    .catch((error) => console.log('Error al conectar a base de datos', error));

// Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    return res.status(404).json({
        message: "pagina no encontrada"
    });   
})

// Starting the server
app.listen(8000, () => console.log('Server on port 8000'));