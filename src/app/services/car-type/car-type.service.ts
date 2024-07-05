import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarTypeService {
  private carTypes: string[] = [
    "Hatchback",
    "Sedan",
    "SUV",
    "Coupe",
    "Convertible",
    "Wagon",
    "Pickup",
    "Van",
    "Minivan",
    "Crossover",
    "Luxury",
    "Electric",
    "Hybrid"
  ];

  constructor() {}

  getCarTypes(): string[] {
    return this.carTypes;
  }
}