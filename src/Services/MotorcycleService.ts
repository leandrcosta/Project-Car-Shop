import Motocycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleDOM';

export default class CarService {
  private createCarDomain(motocycle: IMotorcycle | null) {
    if (motocycle) {
      return new Motocycle(motocycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle): Promise<Motocycle | null> {
    const motocycleODM = new MotorcycleODM();
    const motorcycleCar = await motocycleODM.create(motorcycle);
    return this.createCarDomain(motorcycleCar);
  }

  public async getAll(): Promise<(Motocycle | null)[]> {
    const motocycleODM = new MotorcycleODM();
    const allMotocycle = await motocycleODM.getAll();
    const resultMotocycle = allMotocycle.map((moto) => this.createCarDomain(moto));
    return resultMotocycle;
  }

  public async getById(id: string): Promise<Motocycle | null> {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleId = await motorcycleODM.getById(id);
    return this.createCarDomain(motorcycleId);
  }

  public async update(id: string, motorInput: IMotorcycle): Promise<Motocycle | null> {
    const motoODM = new MotorcycleODM();
    const motorcycleUpdate = await motoODM.update(id, motorInput);
    // console.log(motorcycleUpdate);
    return this.createCarDomain(motorcycleUpdate);
  }

  public async delete(id: string): Promise<Motocycle | null> {
    const motoODM = new MotorcycleODM();
    const removedId = await motoODM.delete(id);
    // console.log(removedId);
    return this.createCarDomain(removedId);
  }
}