import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain(car: ICar | null) {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar): Promise<Car | null> {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll(): Promise<(Car | null)[]> {
    const carODM = new CarODM();
    const allCars = await carODM.getAll();
    const resultCar = allCars.map((car) => this.createCarDomain(car));
    return resultCar;
  }

  public async getById(id: string): Promise<Car | null> {
    const carODM = new CarODM();
    const carId = await carODM.getById(id);
    return this.createCarDomain(carId);
  }

  public async update(id: string, input: ICar): Promise<Car | null> {
    const carODM = new CarODM();
    const updatedCar = await carODM.update(id, input);
    return this.createCarDomain(updatedCar);
  }
}
