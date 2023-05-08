import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;
  private messageInvalidId: string;
  private messageCarNotFound: string;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
    this.messageInvalidId = 'Invalid mongo id';
    this.messageCarNotFound = 'Car not found';
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
        return this.res.status(422).json({ message: this.messageInvalidId });
      }
      const carId = await this.service.getById(id);
      // console.log(carId);
      if (!carId) return this.res.status(404).json({ message: this.messageCarNotFound });
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
        return this.res.status(422).json({ message: this.messageInvalidId });
      }

      const updatedCar = await this.service.update(id, obj);
      // console.log(updatedCar);
      if (!updatedCar) return this.res.status(404).json({ message: this.messageCarNotFound });
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async delete() {
    const { id } = this.req.params;
    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: this.messageInvalidId });
      }
      const carRemovedId = await this.service.delete(id);
      // console.log(carRemovedId);
      if (!carRemovedId) return this.res.status(404).json({ message: this.messageCarNotFound });
      return this.res.status(204).json({});
    } catch (error) {
      this.next(error);
    }
  }
}