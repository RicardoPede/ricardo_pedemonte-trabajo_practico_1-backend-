import express from 'express';
import join from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import path from 'path';

const app = express();
const __dirname = path.dirname('.env');

//variables de entorno
// config({ path: '.env' });
import router from './routes/index.routes.js';

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
app.use('/', router);

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