import { Model } from "./model.model";

export interface Brand {
    brandId?: number;
    brandName: string;
    brandModels?: Model[];
    isDeleted: boolean;
  }