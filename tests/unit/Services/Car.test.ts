import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

describe('POST/cars', function () {
  describe('GET/motorcycles', function () {
    describe('Buscando todas as motorcycles', function () {
      it('Testa se é possível buscar todas as motocycles', async function () {
        const motorcycleList: Car[] = [
          new Car({
            id: '6348513f34c397abcad040b2',
            model: 'Ford ka',
            year: 2005,
            color: 'Preto',
            status: true,
            buyValue: 24.0,
            doorsQty: 3,
            seatsQty: 2,
          }),
          new Car({
            id: '6348513f34c397abcad040b2',
            model: 'Versa',
            year: 2022,
            color: 'Prata',
            status: true,
            buyValue: 80.0,
            doorsQty: 2,
            seatsQty: 5,
          }),
        ];
  
        sinon.stub(Model, 'find').resolves(motorcycleList);
  
        const service = new CarService();
        const result = await service.getAll();
  
        expect(result).to.be.deep.equal(motorcycleList);
      });
    });
  });

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

  describe('PUT/cars', function () {
    describe('Atualizando um car existente', function () {
      it('Testa se é possível atualizar um carro existente e retornar', async function () {
        const carId = '6348513f34c397abcad040b2';
        const updatedCarInput: ICar = {
          model: 'Marea',
          year: 1992,
          color: 'Red',
          status: true,
          buyValue: 12.0,
          doorsQty: 2,
          seatsQty: 5,
        };

        const updatedCarOutput: Car = new Car({
          id: carId,
          model: 'Marea',
          year: 1992,
          color: 'Red',
          status: true,
          buyValue: 12.0,
          doorsQty: 2,
          seatsQty: 5,
        });

        sinon.stub(Model, 'findOneAndUpdate').resolves(updatedCarOutput);

        const service = new CarService();
        const result = await service.update(carId, updatedCarInput);

        expect(result).to.be.deep.equal(updatedCarOutput);
      });
    });

    beforeEach(sinon.restore);
  });

  describe('DELETE/cars', function () {
    describe('Deletando um carro', function () {
      it('Testa se é possível deletar um carro existente', async function () {
        const carId = '6348513f34c397abcad040b2';

        sinon.stub(Model, 'findByIdAndRemove').resolves(null);

        const service = new CarService();
        const result = await service.delete(carId);

        expect(result).to.be.deep.equal(null);
      });
    });
    beforeEach(sinon.restore);
  });
});
