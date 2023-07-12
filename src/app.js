import express from "express";
import cors from "cors";
import morgan from "morgan";

//LOGINS MOVIL AND WEB HOME
import admin from './routes/login.admin.routes.js';
import loginEmpresa from './routes/login.empresa.routes.js';
import loginNatural from './routes/login.natural.routes.js';
import loginConductor from './routes/login.conductor.routes.js';

//WEB HOME ADMIN
import solicitudes from './routes/solicitudes.routes.js';
import estado from './routes/estado.conductores.routes.js';
import conductores from './routes/datos.conductores.routes.js';
import natural from './routes/cliente.natural.routes.js';
import empresa from './routes/cliente.empresa.routes.js';

//MOVIL HOME CLIENTE NATURAL
import homenatural from './routes/home.natural.routes.js';
import conductor from './routes/home.conductor.routes.js';
import pedidos from './routes/pedidos.routes.js';

import homeempresa from './routes/home.empresa.routes.js';

//Web And Movile
import pqrs from './routes/pqrs.routes.js';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(admin);

// Inicios de sesión
app.use(loginEmpresa);
app.use(loginNatural);
app.use(loginConductor);

app.use(conductor);

app.use("/admin", solicitudes);
app.use("/admin", estado);
app.use("/admin", conductores);
app.use("/admin", natural);
app.use("/admin", empresa);

app.use(homenatural);
app.use("/natural", pedidos);

app.use(homeempresa)
app.use(pqrs)


export default app;
