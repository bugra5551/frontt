import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../services/brand/brand.service';
import { ModelService } from '../../services/model/model.service';
import { LocationService } from '../../services/location/location.service';
import { CarService } from '../../services/car/car.service';
import { CarClassService } from '../../services/car-class/car-class.service';
import { SpecificationDescriptionService } from '../../services/specification-description/specification-description.service';
import { RentingConditionService } from '../../services/renting-condition/renting-condition.service';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.css']
})
export class DataManagementComponent implements OnInit {
  brands: any[] = [];
  models: any[] = [];
  locations: any[] = [];
  carClasses: any[] = [];
  cars: any[] = [];
  specificationDescriptions: any[] = [];
  rentingConditions: any[] = [];

  filteredModels: any[] = [];

  brandForm: FormGroup;
  modelForm: FormGroup;
  locationForm: FormGroup;
  carClassForm: FormGroup;
  specificationDescriptionForm: FormGroup;
  rentingConditionForm: FormGroup;

  isBrandEdit = false;
  isModelEdit = false;
  isLocationEdit = false;
  isCarClassEdit = false;

  isSpecificationDescriptionEdit = false;
  isRentingConditionEdit = false;

  brandErrorMessage: string | undefined;
  modelErrorMessage: string | undefined;
  locationErrorMessage: string | undefined;
  carClassErrorMessage: string | undefined;
  carErrorMessage: string | undefined;
  specificationDescriptionErrorMessage: string | undefined;
  rentingConditionErrorMessage: string | undefined;

  brandLoadErrorMessage?: string;
  modelLoadErrorMessage?: string;
  locationLoadErrorMessage?: string;
  carClassLoadErrorMessage?: string;
  carLoadErrorMessage?: string;
  specificationDescriptionLoadErrorMessage?: string;
  rentingConditionLoadErrorMessage?: string;

  successMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private modelService: ModelService,
    private locationService: LocationService,
    private carService: CarService,
    private carClassService: CarClassService,
    private specificationDescriptionService: SpecificationDescriptionService,
    private rentingConditionService: RentingConditionService
  ) {
    this.brandForm = this.formBuilder.group({
      brandId: [null],
      brandName: ['', Validators.required]
    });

    this.modelForm = this.formBuilder.group({
      modelId: [null],
      brandId: ['', Validators.required],
      modelName: ['', Validators.required]
    });
    this.locationForm = this.formBuilder.group({
      locationId: [null],
      locationName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
    this.carClassForm = this.formBuilder.group({
      carClassId: [null],
      carClassDescription: ['', Validators.required]
    });
    this.specificationDescriptionForm = this.formBuilder.group({
      specificationDescriptionId: [null],
      description: ['', Validators.required]
    });
    this.rentingConditionForm = this.formBuilder.group({
      rentingConditionId: [null],
      rentingConditionName: ['', Validators.required],
      rentingConditionDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBrands();
    this.loadModels();
    this.loadLocations();
    this.loadCarClasses();
    this.loadCars();
    this.loadSpecificationDescription();
    this.loadRentingConditions();
  }

  //VERİLERİN GETİRİLMESİ --> CARS, BRAND, MODEL, LOCATION, SPECIFICATION, CARCLASSES, RENTING CONDITIONS
  loadCars(): void {
    try {
      this.carService.getCars().subscribe({
        next: (cars) => {
          this.cars = cars;
        },
        error: (error) => {
          this.carLoadErrorMessage = 'Arabalar yüklenirken bir hata oluştu';
          setTimeout(() => this.carLoadErrorMessage = undefined, 5000);
        }
      });
    }
    catch (error) {
      this.carLoadErrorMessage = 'Beklenmedik bir hata oluştu.';
      setTimeout(() => this.carLoadErrorMessage = undefined, 5000);
    }
  }

  loadSpecificationDescription(): void {
    try {
      this.specificationDescriptionService.getSpecificationDescriptions().subscribe({
        next: (specificationDescriptions) => {
          this.specificationDescriptions = specificationDescriptions;
        },
        error: (error) => {
          this.specificationDescriptionLoadErrorMessage = 'Araç özellikleri yüklenirken bir hata oluştu';
          setTimeout(() => this.specificationDescriptionLoadErrorMessage = undefined, 5000);
        }
      });
    }
    catch (error) {
      this.specificationDescriptionLoadErrorMessage = 'Beklenmedik bir hata oluştu.';
      setTimeout(() => this.specificationDescriptionLoadErrorMessage = undefined, 5000);
    }
  }

  loadRentingConditions(): void {
    try {
      this.rentingConditionService.getRentingConditions().subscribe({
        next: (rentingConditions) => {
          this.rentingConditions = rentingConditions;
        },
        error: (error) => {
          this.rentingConditionLoadErrorMessage = 'Kiralama koşulları yüklenirken bir hata oluştu';
          setTimeout(() => this.rentingConditionLoadErrorMessage = undefined, 5000);
        }
      });
    }
    catch (error) {
      this.rentingConditionLoadErrorMessage = 'Beklenmedik bir hata oluştu.';
      setTimeout(() => this.rentingConditionLoadErrorMessage = undefined, 5000);
    }
  }

  loadBrands(): void {
    try {
      this.brandService.getBrands().subscribe({
        next: (brands) => {
          this.brands = brands;
        },
        error: (error) => {
          this.brandLoadErrorMessage = 'Markalar yüklenirken bir hata oluştu. ' + error;
          setTimeout(() => this.brandLoadErrorMessage = undefined, 5000);
        }
      });
    } catch (error) {
      this.brandLoadErrorMessage = 'Beklenmedik bir hata oluştu. ' + error;
      setTimeout(() => this.brandLoadErrorMessage = undefined, 5000);
    }
  }

  loadModels(): void {
    try {
      this.modelService.getModels().subscribe({
        next: (models) => {
          this.models = models;
        },
        error: (error) => {
          this.modelLoadErrorMessage = 'Modeller yüklenirken bir hata oluştu. ' + error;
          setTimeout(() => this.modelLoadErrorMessage = undefined, 5000);
        }
      });
    } catch (error) {
      this.modelLoadErrorMessage = 'Beklenmedik bir hata oluştu. ' + error;
      setTimeout(() => this.modelLoadErrorMessage = undefined, 5000);
    }
  }

  loadLocations(): void {
    try {
      this.locationService.getLocations().subscribe({
        next: (locations) => {
          this.locations = locations;
        },
        error: (error) => {
          this.locationLoadErrorMessage = 'Lokasyonlar yüklenirken bir hata oluştu. ' + error;
          setTimeout(() => this.locationLoadErrorMessage = undefined, 5000);
        }
      });
    } catch (error) {
      this.locationLoadErrorMessage = 'Beklenmedik bir hata oluştu. ' + error;
      setTimeout(() => this.locationLoadErrorMessage = undefined, 5000);
    }
  }

  loadCarClasses(): void {
    try {
      this.carClassService.getCarClasses().subscribe({
        next: (carClasses) => { this.carClasses = carClasses },
        error: (error) => {
          this.carClassLoadErrorMessage = 'Araç sınıfları yüklenirken bir hata oluştu';
          setTimeout(() => this.carClassLoadErrorMessage = undefined, 5000);

        }
      });
    } catch (error) {
      this.carClassLoadErrorMessage = 'Beklenmedik bir hata oluştu. ' + error;
      setTimeout(() => this.carClassLoadErrorMessage = undefined, 5000);
    }
  }
  //VERİLERİN GETİRİLMESİ --> BRAND, MODEL, LOCATION, SPECIFICATION, CARCLASSES, RENTING CONDITIONS

  //LOKASYON EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ
  onLocationSubmit(): void {
    if (this.locationForm.valid) {

      const locationName = this.locationForm.get('locationName')?.value;
      const address = this.locationForm.get('address')?.value;
      const city = this.locationForm.get('city')?.value;
      const country = this.locationForm.get('country')?.value;

      const existingLocation = this.locations.find(location => location.locationName === locationName);

      if (existingLocation) {
        this.locationErrorMessage = 'Bu isimde bir lokasyon zaten var.';
      } else {
        const newLocation = { locationName, address, city, country, isDeleted: false };
        this.locationService.addLocation(newLocation).subscribe({
          next: () => {
            this.successMessage = 'Yeni lokasyon başarıyla eklendi.';
            this.loadLocations();
            this.locationForm.reset();
            setTimeout(() => this.successMessage = undefined, 5000);
          },
          error: (error) => {
            this.locationErrorMessage = 'Lokasyon eklenirken bir hata oluştu.' + error.message;
            setTimeout(() => this.locationErrorMessage = undefined, 5000);
          }
        });
      }
    }
    else {
      this.locationErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.locationErrorMessage = undefined, 5000);
    }
  }

  onLocationUpdate(): void {
    if (this.locationForm.valid) {
      const updatedLocation = { ...this.locationForm.value, isDeleted: false };
      this.locationService.updateLocation(updatedLocation).subscribe({
        next: () => {
          this.successMessage = 'Lokasyon başarıyla güncellendi.';
          this.loadLocations();
          this.isLocationEdit = false;
          this.locationForm.reset();
          setTimeout(() => this.successMessage = undefined, 5000);
        },
        error: (error) => {
          this.locationErrorMessage = 'Lokasyon güncellenirken bir hata oluştu.';
          setTimeout(() => this.locationErrorMessage = undefined, 3000);
        }
      });
    }
    else {
      this.locationErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.locationErrorMessage = undefined, 5000);
    }
  }

  editLocation(location: any): void {
    this.isLocationEdit = true;
    this.locationForm.patchValue(location);
  }

  deleteLocation(location: any): void {

    this.carService.getCars().subscribe(cars => {
      const carsInLocation = cars.some(car => car.locationId === location.locationId);

      if (carsInLocation) {
        this.locationErrorMessage = 'Lokasyona ait araç bulunduğundan silinemedi.';
        setTimeout(() => this.locationErrorMessage = undefined, 5000);
      }

      else {
        location.isDeleted = true;
        this.locationService.updateLocation(location).subscribe({
          next: () => {
            this.successMessage = 'Lokasyon başarıyla silindi.';
            setTimeout(() => this.successMessage = undefined, 5000);
            this.loadLocations();
          },
          error: (error) => {
            this.locationErrorMessage = 'Lokasyon silinirken bir hata oluştu.';
            setTimeout(() => this.locationErrorMessage = undefined, 5000);
            this.loadLocations();
          }
        });
      }
    });
  }

  restoreLocation(location: any): void {
    location.isDeleted = false;
    this.locationService.updateLocation(location).subscribe(() => {
      this.successMessage = 'Lokasyon başarıyla geri alındı.';
      this.loadLocations();
      setTimeout(() => this.successMessage = undefined, 5000);
    });
  }
  //LOKASYON EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ

  //MARKA EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ
  onBrandSubmit(): void {
    if (this.brandForm.valid) {
      const brandName = this.brandForm.get('brandName')?.value;
      const existingBrand = this.brands.find(brand => brand.brandName === brandName);

      if (existingBrand) {
        this.brandErrorMessage = 'Bu isimde bir marka zaten var.';
      } else {
        const newBrand = { brandName, isDeleted: false };
        this.brandService.addBrand(newBrand).subscribe({
          next: () => {
            this.successMessage = 'Marka başarıyla eklendi.';
            this.loadBrands();
            this.brandForm.reset();
            setTimeout(() => this.successMessage = undefined, 5000);
          },
          error: (error) => {
            this.brandErrorMessage = 'Marka eklenirken bir hata oluştu. ' + error.message;
            setTimeout(() => this.brandErrorMessage = undefined, 5000);
          }
        });
      }
    }
    else {
      this.brandErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.brandErrorMessage = undefined, 5000);
    }
  }

  onBrandUpdate(): void {
    if (this.brandForm.valid) {
      const updatedBrand = { ...this.brandForm.value, isDeleted: false };
      this.brandService.updateBrand(updatedBrand).subscribe({
        next: () => {
          this.successMessage = 'Marka başarıyla güncellendi.';
          this.loadBrands();
          this.isBrandEdit = false;
          this.brandForm.reset();
          setTimeout(() => this.successMessage = undefined, 5000);
        }

        , error: (error) => {
          this.brandErrorMessage = 'Marka güncellenirken bir hata oluştu.';
          setTimeout(() => this.brandErrorMessage = undefined, 5000);
        }
      });
    }
    else {
      this.brandErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.brandErrorMessage = undefined, 5000);
    }
  }

  editBrand(brand: any): void {
    this.isBrandEdit = true;
    this.brandForm.patchValue(brand);
  }

  deleteBrand(brand: any): void {
    if (this.models.some(model => model.brandId === brand.brandId && !model.isDeleted)) {
      this.brandErrorMessage = 'Bu markanın aktif modelleri var. Silinemez.';
      setTimeout(() => this.brandErrorMessage = undefined, 5000);
    } else {
      brand.isDeleted = true;
      this.brandService.updateBrand(brand).subscribe(() => {
        this.successMessage = 'Marka başarıyla silindi.';
        this.loadBrands();
        setTimeout(() => this.successMessage = undefined, 5000);
      });
    }
  }

  restoreBrand(brand: any): void {
    brand.isDeleted = false;
    this.brandService.updateBrand(brand).subscribe(() => {
      this.successMessage = 'Marka başarıyla geri alındı.';
      this.loadBrands();
      setTimeout(() => this.successMessage = undefined, 5000);
    });
  }
  //MARKA EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ

  //MODEL EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ
  onModelSubmit(): void {
    if (this.modelForm.valid) {
      const brandId = this.modelForm.get('brandId')?.value;
      const modelName = this.modelForm.get('modelName')?.value;
      const existingModel = this.models.find(model => model.modelName === modelName);

      if (existingModel) {
        this.modelErrorMessage = 'Bu isimde bir model zaten var.';
        setTimeout(() => this.modelErrorMessage = undefined, 5000);
      } else {
        const newModel = { brandId, modelName, isDeleted: false };
        this.modelService.addModel(newModel).subscribe({
          next: () => {
            this.successMessage = 'Model başarıyla eklendi.';
            this.loadModels();
            this.modelForm.reset();
            setTimeout(() => this.successMessage = undefined, 5000);
          },
          error: (error) => {
            this.modelErrorMessage = 'Model eklenirken bir hata oluştu.';
            setTimeout(() => this.modelErrorMessage = undefined, 5000);
          }
        });
      }
    } else {
      this.modelErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.modelErrorMessage = undefined, 5000);
    }
  }


  onModelUpdate(): void {
    if (this.modelForm.valid) {
      const updatedModel = { ...this.modelForm.value, isDeleted: false };
      this.modelService.updateModel(updatedModel).subscribe({
        next: () => {
          this.successMessage = 'Model başarıyla güncellendi.';
          this.loadModels();
          this.isModelEdit = false;
          this.modelForm.reset();
          setTimeout(() => this.successMessage = undefined, 5000);
        },
        error: (error) => {
          this.modelErrorMessage = 'Model güncellenirken bir hata oluştu.';
          setTimeout(() => this.modelErrorMessage = undefined, 5000);
        }
      });
    }
    else {
      this.modelErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.modelErrorMessage = undefined, 5000);
    }
  }

  editModel(model: any): void {
    this.isModelEdit = true;
    this.modelForm.patchValue(model);
  }

  deleteModel(model: any): void {
    const carsInLocation = this.cars.some(car => car.modelId === model.modelId);

    if (carsInLocation) {
      this.modelErrorMessage = 'Bu modele ait araç bulunduğundan silinemedi.';
      setTimeout(() => this.modelErrorMessage = undefined, 5000);
    } else {
      model.isDeleted = true;
      this.modelService.updateModel(model).subscribe({
        next: () => {
          this.successMessage = 'Model başarıyla silindi.';
          setTimeout(() => this.successMessage = undefined, 5000);
          this.loadModels();
        },
        error: (error) => {
          this.modelErrorMessage = 'Model silinirken bir hata oluştu.';
          setTimeout(() => this.modelErrorMessage = undefined, 5000);
          this.loadModels();
        }
      });
    }
  }

  restoreModel(model: any): void {
    model.isDeleted = false;
    this.modelService.updateModel(model).subscribe(() => {
      this.successMessage = 'Model başarıyla geri alındı.';
      this.loadModels();
      setTimeout(() => this.successMessage = undefined, 5000);
    });
  }

  onBrandChange(event: Event): void {
    const brandId = (event.target as HTMLSelectElement).value;
    this.filterModelsByBrand(+brandId);
  }

  filterModelsByBrand(brandId: number): void {
    this.filteredModels = this.models.filter(model => model.brandId === brandId);
  }
  //MODEL EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ

  //CAR CLASS EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ
  onCarClassSubmit(): void {
    if (this.carClassForm.valid) {

      const carClassDescription = this.carClassForm.get('carClassDescription')?.value;

      const existingcarClass = this.carClasses.find(carClass => carClass.carClassDescription === carClassDescription);

      if (existingcarClass) {
        this.carClassErrorMessage = 'Bu isimde bir araç sınıfı zaten var.';
      } else {
        const newCarClass = { carClassDescription, isDeleted: false };
        this.carClassService.addCarClass(newCarClass).subscribe({
          next: () => {
            this.successMessage = 'Yeni araç sınıfı başarıyla eklendi.';
            this.loadCarClasses();
            this.carClassForm.reset();
            setTimeout(() => this.successMessage = undefined, 5000);
          },
          error: (error) => {
            this.carClassErrorMessage = 'Araç sınıfı eklenirken bir hata oluştu.' + error.message;
            setTimeout(() => this.carClassErrorMessage = undefined, 5000);
          }
        });
      }
    }
    else {
      this.carClassErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.carClassErrorMessage = undefined, 5000);
    }
  }

  onCarClassUpdate(): void {
    if (this.carClassForm.valid) {
      const updatedCarClass = { ...this.carClassForm.value, isDeleted: false };
      this.carClassService.updateCarClass(updatedCarClass).subscribe({
        next: () => {
          this.successMessage = 'Araç sınıfı başarıyla güncellendi.';
          this.loadCarClasses();
          this.isCarClassEdit = false;
          this.carClassForm.reset();
          setTimeout(() => this.successMessage = undefined, 5000);
        },
        error: (error) => {
          this.carClassErrorMessage = 'Araç sınıfı güncellenirken bir hata oluştu.';
          setTimeout(() => this.carClassErrorMessage = undefined, 3000);
        }
      });
    }
    else {
      this.carClassErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.carClassErrorMessage = undefined, 5000);
    }
  }

  editCarClass(carClass: any): void {
    this.isCarClassEdit = true;
    this.carClassForm.patchValue(carClass);
  }

  deleteCarClass(carClass: any): void {

    const carsInCarClass = this.cars.some(car => car.carClassId === carClass.carClassId);

    console.log('araç sınıfı: ' + carClass.carClassId);
    console.log('araçtan gelen: ' + carsInCarClass);

    if (carsInCarClass) {
      this.carClassErrorMessage = 'Bu araç sınıfına ait araç bulunduğundan silinemedi.';
      setTimeout(() => this.carClassErrorMessage = undefined, 5000);
    } else {
      carClass.isDeleted = true;
      this.carClassService.updateCarClass(carClass).subscribe({
        next: () => {
          this.successMessage = 'Araç sınıfı başarıyla silindi.';
          setTimeout(() => this.successMessage = undefined, 5000);
          this.loadCarClasses();
        },
        error: (error) => {
          this.carClassErrorMessage = 'Araç sınıfı silinirken bir hata oluştu.';
          setTimeout(() => this.carClassErrorMessage = undefined, 5000);
          this.loadCarClasses();
        }
      });
    }
  }

  restoreCarClass(carClass: any): void {
    carClass.isDeleted = false;
    this.carClassService.updateCarClass(carClass).subscribe(() => {
      this.successMessage = 'Araç sınıfı başarıyla geri alındı.';
      this.loadCarClasses();
      setTimeout(() => this.successMessage = undefined, 5000);
    });
  }
  //CAR CLASS EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ

  //SPECIFICATION EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ
  onSpecificationDescriptionSubmit(): void {
    if (this.specificationDescriptionForm.valid) {

      const description = this.specificationDescriptionForm.get('description')?.value;

      const existingSpecificationDescription = this.specificationDescriptions.find(specificationDescription => specificationDescription.description === description);

      if (existingSpecificationDescription) {
        this.carClassErrorMessage = 'Bu isimde bir özellik zaten var.';
      } else {
        const newSpecificationDescription = { description, isDeleted: false };
        this.specificationDescriptionService.addSpecificationDescriptions(newSpecificationDescription).subscribe({
          next: () => {
            this.successMessage = 'Yeni özellik başarıyla eklendi.';
            this.loadSpecificationDescription();
            this.specificationDescriptionForm.reset();
            setTimeout(() => this.successMessage = undefined, 5000);
          },
          error: (error) => {
            this.specificationDescriptionErrorMessage = 'Özellik eklenirken bir hata oluştu.' + error.message;
            setTimeout(() => this.specificationDescriptionErrorMessage = undefined, 5000);
          }
        });
      }
    }
    else {
      this.specificationDescriptionErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.specificationDescriptionErrorMessage = undefined, 5000);
    }
  }

  onSpecificationDescriptionUpdate(): void {
    if (this.specificationDescriptionForm.valid) {
      const updatedSpecificationDescription = { ...this.specificationDescriptionForm.value, isDeleted: false };
      this.specificationDescriptionService.updateSpecificationDescriptions(updatedSpecificationDescription).subscribe({
        next: () => {
          this.successMessage = 'Özellik başarıyla güncellendi.';
          this.loadSpecificationDescription();
          this.isSpecificationDescriptionEdit = false;
          this.specificationDescriptionForm.reset();
          setTimeout(() => this.successMessage = undefined, 5000);
        },
        error: (error) => {
          this.specificationDescriptionErrorMessage = 'Özellik güncellenirken bir hata oluştu.';
          setTimeout(() => this.specificationDescriptionErrorMessage = undefined, 5000);
        }
      });
    }
    else {
      this.specificationDescriptionErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.specificationDescriptionErrorMessage = undefined, 5000);
    }
  }

  editSpecificationDescription(specificationDescription: any): void {
    this.isSpecificationDescriptionEdit = true;
    this.specificationDescriptionForm.patchValue(specificationDescription);
  }

  deleteSpecificationDescription(specificationDescription: any): void {

    const specificationDescriptionInCars = this.cars.some(car =>
      car.carSpecifications.some((spec: any) => spec.specificationDescriptionId === specificationDescription.specificationDescriptionId)
    );

    if (specificationDescriptionInCars) {
      this.specificationDescriptionErrorMessage = 'Bu özelliğe ait araç bulunduğundan silinemedi.';
      setTimeout(() => this.specificationDescriptionErrorMessage = undefined, 5000);
    } else {
      specificationDescription.isDeleted = true;
      this.specificationDescriptionService.updateSpecificationDescriptions(specificationDescription).subscribe({
        next: () => {
          this.successMessage = 'Özellik başarıyla silindi.';
          setTimeout(() => this.successMessage = undefined, 5000);
          this.loadSpecificationDescription();
        },
        error: (error) => {
          this.specificationDescriptionErrorMessage = 'Özellik silinirken bir hata oluştu.';
          setTimeout(() => this.specificationDescriptionErrorMessage = undefined, 5000);
          this.loadSpecificationDescription();
        }
      });
    }
  }

  restoreSpecificationDescription(specificationDescription: any): void {
    specificationDescription.isDeleted = false;
    this.specificationDescriptionService.updateSpecificationDescriptions(specificationDescription).subscribe(() => {
      this.successMessage = 'Özellik başarıyla geri alındı.';
      this.loadCarClasses();
      setTimeout(() => this.successMessage = undefined, 5000);
    });
  }
  //SPECIFICATION EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ

  // RENTINGCONDITION EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ
  onRentingConditionSubmit(): void {
    if (this.rentingConditionForm.valid) {

      const rentingConditionName = this.rentingConditionForm.get('rentingConditionName')?.value;
      const rentingConditionDescription = this.rentingConditionForm.get('rentingConditionDescription')?.value;

      const existingRentingCondition = this.rentingConditions.find(rentingCondition => rentingCondition.rentingConditionName === rentingConditionName);

      if (existingRentingCondition) {
        this.rentingConditionErrorMessage = 'Bu isimde bir kiralama koşulu zaten var.';
      } else {
        const newRentingCondition = { rentingConditionName, rentingConditionDescription, isDeleted: false };
        this.rentingConditionService.addRentingCondition(newRentingCondition).subscribe({
          next: () => {
            this.successMessage = 'Yeni kiralama koşulu başarıyla eklendi.';
            this.loadRentingConditions();
            this.rentingConditionForm.reset();
            setTimeout(() => this.successMessage = undefined, 5000);
          },
          error: (error) => {
            this.rentingConditionErrorMessage = 'Kiralama koşulu eklenirken bir hata oluştu.' + error.message;
            setTimeout(() => this.rentingConditionErrorMessage = undefined, 5000);
          }
        });
      }
    }
    else {
      this.rentingConditionErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.rentingConditionErrorMessage = undefined, 5000);
    }
  }

  onRentingConditionUpdate(): void {
    if (this.rentingConditionForm.valid) {
      const updatedRentingCondition = { ...this.rentingConditionForm.value, isDeleted: false };
      this.rentingConditionService.updateRentingCondition(updatedRentingCondition).subscribe({
        next: () => {
          this.successMessage = 'Kiralama koşulu başarıyla güncellendi.';
          this.loadRentingConditions();
          this.isRentingConditionEdit = false;
          this.rentingConditionForm.reset();
          setTimeout(() => this.successMessage = undefined, 5000);
        },
        error: (error) => {
          this.rentingConditionErrorMessage = 'Kiralama koşulu güncellenirken bir hata oluştu.';
          setTimeout(() => this.rentingConditionErrorMessage = undefined, 5000);
        }
      });
    }
    else {
      this.rentingConditionErrorMessage = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.rentingConditionErrorMessage = undefined, 5000);
    }
  }

  editRentingCondition(rentingCondition: any): void {
    this.isRentingConditionEdit = true;
    this.rentingConditionForm.patchValue(rentingCondition);
  }

  deleteRentingCondition(rentingCondition: any): void {

    const rentingConditionInCars = this.cars.some(car =>
      car.carRentingConditions.some((cond: any) => cond.rentingConditionId === rentingCondition.rentingConditionId)
    );

    if (rentingConditionInCars) {
      this.rentingConditionErrorMessage = 'Bu kiralama koşuluna ait araç bulunduğundan silinemedi.';
      setTimeout(() => this.rentingConditionErrorMessage = undefined, 5000);
    } else {
      rentingCondition.isDeleted = true;
      this.rentingConditionService.updateRentingCondition(rentingCondition).subscribe({
        next: () => {
          this.successMessage = 'Kiralama koşulu başarıyla silindi.';
          setTimeout(() => this.successMessage = undefined, 5000);
          this.loadRentingConditions();
        },
        error: (error) => {
          this.rentingConditionErrorMessage = 'Kiralama koşulu silinirken bir hata oluştu.';
          setTimeout(() => this.rentingConditionErrorMessage = undefined, 5000);
          this.loadRentingConditions();
        }
      });
    }
  }

  restoreRentingCondition(rentingCondition: any): void {
    rentingCondition.isDeleted = false;
    this.rentingConditionService.updateRentingCondition(rentingCondition).subscribe(() => {
      this.successMessage = 'Kiralama koşulu başarıyla geri alındı.';
      this.loadRentingConditions();
      setTimeout(() => this.successMessage = undefined, 5000);
    });
  }
  // RENTINGCONDITION EKLEME-GÜNCELLEME-SİLME (SOFT DELETE) İŞLEMLERİ

}