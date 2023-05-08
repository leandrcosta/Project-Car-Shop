import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

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
          model: 'Honda Cb 300f Hornet',
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
});