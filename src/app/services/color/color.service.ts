import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private colors: string[] = [
    "Kırmızı",
    "Mavi",
    "Yeşil",
    "Siyah",
    "Beyaz",
    "Gri",
    "Sarı",
    "Turuncu",
    "Mor",
    "Kahverengi",
    "Lacivert",
    "Pembe",
    "Bej",
    "Altın",
    "Gümüş",
    "Bordo",
    "Turkuaz",
    "Füme",
    "Zeytin Yeşili",
    "Açık Mavi",
    "Koyu Yeşil"
  ];

  constructor() {}

  getColors(): string[] {
    return this.colors;
  }
}
