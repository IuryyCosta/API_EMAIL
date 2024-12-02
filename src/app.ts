import express from 'express';
import bodyParser from 'body-parser';
import queryRoutes from './routes/queryRoutes';
import helmet from 'helmet';


const app = express();

app.use(helmet({
    contentSecurityPolicy: false, // Desativa o CSP (útil para ambientes de desenvolvimento)
    frameguard: { action: 'deny' }, // Impede a aplicação de ser carregada em iframes
    referrerPolicy: { policy: 'no-referrer' }, // Não envia cabeçalhos Referrer
    }
))
;

// Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}))
// Rotas
app.use('/', queryRoutes);


export default app;
