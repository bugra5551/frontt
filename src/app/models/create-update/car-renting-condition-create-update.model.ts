export interface CarRentingConditionCreateUpdate {
    carRentingConditionId?: number;
    carId: number;
    rentingConditionId: number;
    conditionValue: string;
    isDeleted: boolean;
}