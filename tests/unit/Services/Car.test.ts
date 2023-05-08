import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

describe('POST/cars', function () {
  describe('Cadastrando um novo carro', function () {
    it('Testa se é possivel cadastrar um novo carro e retornar o obj criado', async function () {
      const carInput: ICar = {
        model: 'Marea',
        year: 1992,
        color: 'Red',
        status: true,
        buyValue: 12.0,
        doorsQty: 2,
        seatsQty: 5,
      };

      const carOutput: Car = new Car({
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 1992,
        color: 'Red',
        status: true,
        buyValue: 12.0,
        doorsQty: 2,
        seatsQty: 5,
      });

      sinon.stub(Model, 'create').resolves(carOutput);

      const service = new CarService();
      const result = await service.create(carInput);

      expect(result).to.be.deep.equal(carOutput);
    });
  });

  describe('GET/cars/:id', function () {
    describe('Buscando um carro pelo ID', function () {
      it('Testa se é possível buscar um carro existente pelo ID', async function () {
        const carId = '6348513f34c397abcad040b2';
        const carOutput: Car = new Car({
          id: carId,
          model: 'Marea',
          year: 1992,
          color: 'Red',
          status: true,
          buyValue: 12.0,
          doorsQty: 2,
          seatsQty: 5,
        });
  
        sinon.stub(Model, 'findById').resolves(carOutput);
  
        const service = new CarService();
        const result = await service.getById(carId);
  
        expect(result).to.be.deep.equal(carOutput);
      });
    });
  });
});