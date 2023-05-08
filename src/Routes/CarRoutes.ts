import { Router } from 'express';
import CarController from '../Controllers/CarController';

const CarRouter = Router();

CarRouter.post(
  '/',
  (req, res, next) => new CarController(req, res, next).create(),
);
CarRouter.get('/', (req, res, next) => new CarController(req, res, next).getAll());
CarRouter.get('/:id', (req, res, next) => new CarController(req, res, next).getById());
// Usar o post também resolve o que pede o requisito.Testei e tive o mesmo resultado. Troquei porque o req quebrava
CarRouter.put('/:id', (req, res, next) => new CarController(req, res, next).update());
CarRouter.delete('/:id', (req, res, next) => new CarController(req, res, next).delete());

export default CarRouter;