import { model, Model, models, Schema, UpdateQuery } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(input: T): Promise<T> {
    return this.model.create({ ...input });
  }

  public async update(_id: string, input: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      { _id },
      { ...input } as UpdateQuery<T>,
      { new: true },
    );
  }
}
// CODIGO AULA AO VIVO - Profº Will
// https://github.com/tryber/sd-025-b-live-lectures/blob/lecture/back/12.2/trix/src/Models/AbstractODM.ts