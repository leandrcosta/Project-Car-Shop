import express from 'express';
import CarRouter from './Routes/CarRoutes';
import MotocycleRouter from './Routes/MotocycleRoutes';

const app = express();
app.use(express.json());

app.use('/cars', CarRouter);
app.use('/motorcycles', MotocycleRouter);

export default app;
