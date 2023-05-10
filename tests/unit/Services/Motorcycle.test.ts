import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Motorcycles', function () {
  describe('GET/motorcycles', function () {
    describe('Buscando todas as motorcycles', function () {
      it('Testa se é possível buscar todas as motocycles', async function () {
        const motorcycleList: Motorcycle[] = [
          new Motorcycle({
            id: '6348513f34c397abcad040b2',
            model: 'Honda Cb 500f Hornet',
            year: 2005,
            color: 'Yellow',
            status: true,
            buyValue: 30.000,
            category: 'Street',
            engineCapacity: 600,
          }),
          new Motorcycle({
            id: '9348513f34c397abcad040b2',
            model: 'Yamaha MT-09',
            year: 2020,
            color: 'Black',
            status: true,
            buyValue: 40.000,
            category: 'Naked',
            engineCapacity: 847,
          }),
          new Motorcycle({
            id: '8348513f34c397abcad040b2',
            model: 'Ducati Panigale V4',
            year: 2018,
            color: 'Red',
            status: false,
            buyValue: 90.000,
            category: 'Sport',
            engineCapacity: 1103,
          }),
        ];
  
        sinon.stub(Model, 'find').resolves(motorcycleList);
  
        const service = new MotorcycleService();
        const result = await service.getAll();
  
        expect(result).to.be.deep.equal(motorcycleList);
      });
    });
  });
  
  describe('POST/motorcycles', function () {
    describe('Cadastrando um novo motorcycle', function () {
      it('Testa se é possivel cadastrar um  motorcycle e retornar o obj criado', async function () {
        const motorcycleInput: IMotorcycle = {
          model: 'Honda Cb 600f Hornet',
          year: 2005,
          color: 'Yellow',
          status: true,
          buyValue: 30.000,
          category: 'Street',
          engineCapacity: 600,
        };

        const motorcycleOutput: Motorcycle = new Motorcycle({
          id: '6348513f34c397abcad040b2',
          model: 'Honda Cb 600f Hornet',
          year: 2005,
          color: 'Yellow',
          status: true,
          buyValue: 30.000,
          category: 'Street',
          engineCapacity: 600,
        });

        sinon.stub(Model, 'create').resolves(motorcycleOutput);

        const service = new MotorcycleService();
        const result = await service.create(motorcycleInput);

        expect(result).to.be.deep.equal(motorcycleOutput);
      });
    });
    beforeEach(sinon.restore);

    describe('GET/motorcycles/:id', function () {
      describe('Buscando motorcycle pelo ID', function () {
        it('Testa se é possível buscar uma motocycle existente pelo ID', async function () {
          const motoId = '6348513f34c397abcad040b2';
          const motorcycleOutput: Motorcycle = new Motorcycle({
            id: motoId,
            model: 'Honda Cb 400f Hornet',
            year: 2005,
            color: 'Yellow',
            status: true,
            buyValue: 30.000,
            category: 'Street',
            engineCapacity: 600,
          });
    
          sinon.stub(Model, 'findById').resolves(motorcycleOutput);
    
          const service = new MotorcycleService();
          const result = await service.getById(motoId);
    
          expect(result).to.be.deep.equal(motorcycleOutput);
        });
      });
    });

    describe('PUT/motorcycles', function () {
      describe('Atualizando uma motocicleta existente', function () {
        it('Testa se é possível atualizar uma motocicleta', async function () {
          const motoId = '6348513f34c397abcad040b2';
          const updatedMotorcycleInput: IMotorcycle = {
            model: 'Honda Cb 300f Hornet',
            year: 2005,
            color: 'Orange',
            status: false,
            buyValue: 25.000,
            category: 'Street',
            engineCapacity: 400,
          };
    
          const updatedMotorcycleOutput: Motorcycle = new Motorcycle({
            id: motoId,
            model: 'Honda Cb 300f Hornet',
            year: 2005,
            color: 'Orange',
            status: false,
            buyValue: 25.000,
            category: 'Street',
            engineCapacity: 400,
          });
    
          sinon.stub(Model, 'findOneAndUpdate').resolves(updatedMotorcycleOutput);
    
          const service = new MotorcycleService();
          const result = await service.update(motoId, updatedMotorcycleInput);
    
          expect(result).to.be.deep.equal(updatedMotorcycleOutput);
        });
      });
    
      beforeEach(sinon.restore);
    });
  });
});