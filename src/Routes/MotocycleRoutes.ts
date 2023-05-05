import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const MotocycleRouter = Router();

MotocycleRouter.post(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);
MotocycleRouter.get('/', (req, res, next) => new MotorcycleController(req, res, next).getAll());
MotocycleRouter.get('/:id', (req, res, next) => new MotorcycleController(req, res, next).getById());

export default MotocycleRouter;