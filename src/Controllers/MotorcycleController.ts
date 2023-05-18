import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import MotocycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotocycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotocycleService;
  private messageInvalidId: string;
  private messageCarNotFound: string;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotocycleService();
    this.messageInvalidId = 'Invalid mongo id';
    this.messageCarNotFound = 'Motorcycle not found';
  }

  public async create() {
    try {
      const motocycle: IMotorcycle = this.req.body;
      const newMotocycle = await this.service.create(motocycle);
      // console.log(newMotocycle);
      return this.res.status(201).json(newMotocycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const allMotocycle = await this.service.getAll();
      return this.res.status(200).json(allMotocycle);
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
      const motorcycleId = await this.service.getById(id);
      // console.log(motorcycleId);
      if (!motorcycleId) return this.res.status(404).json({ message: 'Motorcycle not found' });
      return this.res.status(200).json(motorcycleId);
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
      const updatedMoto = await this.service.update(id, obj);
      // console.log('MOTO ATUALIZADA', updatedMoto);
      if (!updatedMoto) {
        return this.res.status(404).json({ message: this.messageCarNotFound });
      }
      return this.res.status(200).json(updatedMoto);
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
      const motoRemovedId = await this.service.delete(id);
      // console.log(motoRemovedId);
      if (!motoRemovedId) return this.res.status(404).json({ message: this.messageCarNotFound });
      return this.res.status(204).json({});
    } catch (error) {
      this.next(error);
    }
  }
}
