import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = this.req.body;
    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const allCars = await this.service.getAll();
      return this.res.status(200).json(allCars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      const carId = await this.service.getById(id);
      // console.log(carId);
      if (!carId) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(carId);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const obj = this.req.body;
    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }

      const updatedCar = await this.service.update(id, obj);
      // console.log(updatedCar);
      if (!updatedCar) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      this.next(error);
    }
  }
}