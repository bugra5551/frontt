import { Brand } from './brand.model';

export interface Model {
  modelId?: number;
  modelName: string;
  brandId: number;
  brand?: Brand;
  isDeleted: boolean;
}
