import express from 'express';
import bodyParser from 'body-parser';
import queryRoutes from './routes/queryRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/', queryRoutes);

export default app;
