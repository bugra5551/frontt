export interface CarDamageDetailCreateUpdate{
    damageDetailId?: number;
    carId: number;
    damageDate: Date;
    description: string;
    repairCost: number;
    isDeleted: boolean;
}