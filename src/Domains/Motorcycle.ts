import Vehicle from './Vehicle';
import IMotorcycles from '../Interfaces/IMotorcycle';

export default class Motorcycles extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motocycle: IMotorcycles) {
    super(motocycle);
    this.id = motocycle.id;
    this.model = motocycle.model;
    this.year = motocycle.year;
    this.color = motocycle.color;
    this.status = motocycle.status || false;
    this.buyValue = motocycle.buyValue;
    this.category = motocycle.category;
    this.engineCapacity = motocycle.engineCapacity;
  }

  public setCategory(motocycle: IMotorcycles) {
    this.category = motocycle.category;
  }

  public getCategory() {
    return this.category;
  }

  public setEngineCapacity(motocycle: IMotorcycles) {
    this.engineCapacity = motocycle.engineCapacity;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }
}