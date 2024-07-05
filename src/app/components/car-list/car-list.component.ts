import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../../models/read/car.model';
import { AuthService } from '../../services/auth/auth.service';
import { CarCreateUpdate } from '../../models/create-update/car-create-update.model';
import { CarService } from '../../services/car/car.service';
import { CarClassService } from '../../services/car-class/car-class.service';
import { CarClass } from '../../models/read/car-class.model';
import { BrandService } from '../../services/brand/brand.service';
import { Brand } from '../../models/read/brand.model';
import { Model } from '../../models/read/model.model';
import { ModelService } from '../../services/model/model.service';
import { CarDamageDetailService } from '../../services/car-damage-detail/car-damage-detail.service';
import { CarDamageDetailCreateUpdate } from '../../models/create-update/car-damage-detail-create-update.model';
import { ChangeDetectorRef } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import { Location } from '../../models/read/location.model';
import { ColorService } from '../../services/color/color.service';
import { CarTypeService } from '../../services/car-type/car-type.service';
import { CarSpecificationService } from '../../services/car-specification/car-specification.service';
import { CarSpecificationCreateUpdate } from '../../models/create-update/car-specification-create-update.model';
import { SpecificationDescriptionService } from '../../services/specification-description/specification-description.service';
import { SpecificationDescription } from '../../models/read/specification-description.model';
import { RentingConditionService } from '../../services/renting-condition/renting-condition.service';
import { CarRentingConditionService } from '../../services/car-renting-condition/car-renting-condition.service';
import { RentingCondition } from '../../models/read/renting-condition.model';
import { CarRentingConditionCreateUpdate } from '../../models/create-update/car-renting-condition-create-update.model';
import { CarImage } from '../../models/read/car-image.model';
import { CarImageService } from '../../services/car-image/car-image.service';
import { HelpDeskService } from '../../services/help-desk/help-desk.service';
import { HelpDesk } from '../../models/read/help-desk.model';
import { HelpDeskCreateUpdate } from '../../models/create-update/help-desk-create-update.model';
import { filter } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation/reservation.service';
import { ReservationCreateUpdate } from '../../models/create-update/reservation-create-update.model';

declare var bootstrap: any;

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  rentedCars: Car[] = [];
  maintenanceCars: Car[] = [];
  carClasses: CarClass[] = [];
  brands: Brand[] = [];
  models: Model[] = [];
  locations: Location[] = [];
  specificationDescriptions: SpecificationDescription[] = [];
  rentingConditions: RentingCondition[] = [];
  selectedRentingConditionId: number | null = null;
  newConditionValue: string = '';
  colors: string[] = [];
  carTypes: string[] = [];
  selectedSpecificationDescriptions: number[] = [];
  selectedCar: Car | null = null;
  selectedNewCar: Car | null = null;
  newCar: CarCreateUpdate = this.getEmptyCar();
  newDamageDetail: CarDamageDetailCreateUpdate = this.getEmptyCarDamageDetail();
  newCarSpecification: CarSpecificationCreateUpdate = this.getEmptyCarSpecificationDetail();
  newCarRentingCondition: CarRentingConditionCreateUpdate = this.getEmptyCarRentingCondition();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  activeTab: string = 'details-tab'; // Default olarak ilk tab aktif
  images: CarImage[] = [];
  carImages: CarImage[] = [];
  selectedFiles: File[] = [];
  carId!: number;
  userId!: number; // JWT'den alınacak
  messages: HelpDesk[] = [];
  newMessage: string = '';
  userRole!: string;
  replyUserId!: number;
  groupedMessages: { [key: number]: HelpDesk[] } = {};
  receiveCarForm: FormGroup;
  updatedCar: any;
  tempCar: any;

  constructor(
    protected authService: AuthService,
    private carService: CarService,
    private carClassService: CarClassService,
    private brandService: BrandService,
    private modelService: ModelService,
    private carDamageDetailService: CarDamageDetailService,
    private locationService: LocationService,
    private colorService: ColorService,
    private carTypeService: CarTypeService,
    private carSpecificationService: CarSpecificationService,
    private specificationDescription: SpecificationDescriptionService,
    private rentingConditionService: RentingConditionService,
    private carRentingConditionService: CarRentingConditionService,
    private changeDetectorRef: ChangeDetectorRef,
    private carImagesService: CarImageService,
    private helpDeskService: HelpDeskService,
    private reservationService: ReservationService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.receiveCarForm = this.formBuilder.group({
      carStatus: ['', Validators.required],
      currentKm: ['', Validators.required],
      damageDate: [''],
      description: [''],
      repairCost: ['']
    });

  }


  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken(); // JWT'den userId'yi al
    this.userRole = this.authService.getRole();
    console.log('userId  ' + this.userId);
    console.log('role  ' + this.userRole);
    this.loadCars();
    this.setupModalCloseListener();
    this.receiveCarForm.controls['currentKm'].setValidators([Validators.required, this.kmValidator.bind(this)]);

  }

  loadReceivingCarDetails(car: Car): void {
    this.selectedCar = car; // Set the selected car

    // Set validators for currentKm
    this.receiveCarForm.controls['currentKm'].updateValueAndValidity();
  }

  kmValidator(control: AbstractControl): { [key: string]: any } | null {
    if (this.selectedCar && control.value < this.selectedCar.km) {
      return { 'invalidKm': true };
    }
    return null;
  }

  /*loadCars(): void {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
    });
  }
    */

  setReplyUserId(userId: number): void {
    this.replyUserId = userId;
  }

  loadMessages(): void {

    this.helpDeskService.getAllMessagesByCarId(this.carId).subscribe(messages => {
      this.messages = messages;
      this.groupMessages();
    });

    /*this.helpDeskService.getAllMessagesByCarId(this.carId).subscribe(messages => {
        this.messages = messages});
*/
    /*this.helpDeskService.getMessagesByCarIdAndUserId(this.carId, this.userId).subscribe(messages => {
      this.messages = messages;
    });*/
  }

  groupMessagesByUserId(messages: HelpDesk[]): { [key: number]: HelpDesk[] } {
    return messages.reduce((acc: { [key: number]: HelpDesk[] }, message: HelpDesk) => {
      const userId = message.userId;
      if (!acc[userId]) {
        acc[userId] = [];
      }
      acc[userId].push(message);
      return acc;
    }, {});
  }

  groupMessages(): void {
    this.groupedMessages = this.groupMessagesByUserId(this.messages);
  }

  getUserName(userId: number): string {
    const selectedUserMessage = this.messages.find(message => message.userId === userId);
    if (selectedUserMessage && selectedUserMessage.user) {
      return `${selectedUserMessage.user.firstName} ${selectedUserMessage.user.lastName}`;
    }
    return `Kullanıcı: ${userId}`;
  }

  sendMessage(): void {

    const targetUserId = this.replyUserId;

    console.log('userId  ' + this.userId);
    console.log('role  ' + this.userRole);

    const message: HelpDeskCreateUpdate = {
      userId: targetUserId,
      carId: this.carId,
      messageId: 1, //this.userRole  === 'Customer' ? 0 : 1, // Müşteri mesajı
      message: this.newMessage,
      messageDate: new Date()
    };

    this.helpDeskService.addMessage(message).subscribe(addedMessage => {
      this.messages.unshift(addedMessage);
      this.newMessage = '';
      this.loadMessages();
    });
  }

  daysUntilDropOff(dropOffDate: Date): number {
    const currentDate = new Date();
    const dropOff = new Date(dropOffDate);
    const diffTime = dropOff.getTime() - currentDate.getTime();
    console.log('dropOff nedir: ' + dropOff.getTime());
    console.log('currentDate nedir: ' + currentDate.getTime());
    console.log('tar,h nedir: ' + Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }



  loadCars(): void {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars.filter(car => car.status === 'Aktif');
      this.cars.forEach(car => {
        this.carImagesService.getFirstCarImage(car.carId).subscribe(img => {
          car.firstImage = img;
        });
      });
    });

    this.carService.getCars().subscribe(maintenanceCars => {
      this.maintenanceCars = maintenanceCars.filter(car => car.status === 'Bakımda');
      this.maintenanceCars.forEach(maintenanceCar => {
        this.carImagesService.getFirstCarImage(maintenanceCar.carId).subscribe(img => {
          maintenanceCar.firstImage = img;
        });
      });
    });


    // Kiradaki araçları yükle
    this.carService.getCars().subscribe(rentedCars => {
      console.log('Tüm kiradaki araçlar:', rentedCars);
      this.rentedCars = rentedCars
        .filter(car => car.status === 'Kirada' && car.reservations.find(reservation => !reservation.isDeleted))
        .sort((a, b) => {
          const dateA = new Date(a.reservations[0].dropOffDate).getTime();
          const dateB = new Date(b.reservations[0].dropOffDate).getTime();
          return dateA - dateB;
        });

      console.log('Filtrelenmiş ve sıralanmış araçlar:', this.rentedCars);
      this.rentedCars.forEach(rentedCar => {
        this.carImagesService.getFirstCarImage(rentedCar.carId).subscribe(img => {
          rentedCar.firstImage = img;
        });
      });
    });


  }

  loadCarClasses(): void {
    this.carClassService.getCarClasses().subscribe(carClasses => {
      this.carClasses = carClasses;
    });

  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  loadModels(brandId: number): void {
    this.modelService.getModelsByBrandId(brandId).subscribe(models => {
      this.models = models;
    });
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe(locations => { this.locations = locations; });
  }

  loadSpecificationDescriptions(): void {
    this.specificationDescription.getSpecificationDescriptions().subscribe(specificationDescriptions => { this.specificationDescriptions = specificationDescriptions; });
  }

  loadCarTypes(): void {
    this.carTypes = this.carTypeService.getCarTypes();
  }

  loadColors(): void {
    this.colors = this.colorService.getColors();
  }

  loadRentingConditions(): void {
    this.rentingConditionService.getRentingConditions().subscribe(rentingConditions => { this.rentingConditions = rentingConditions });
  }

  onBrandChange(event: any): void {
    const brandId = event.target.value;
    this.loadModels(brandId);
  }

  openCarDetails(car: Car): void {
    this.carId = car.carId;
    this.loadCarImages(car.carId);
    this.loadMessages();
    this.changeDetectorRef.detectChanges();
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.selectedCar = car;
    console.log('Selected Car:', this.selectedCar.carDamageDetails);
    const modalElement = document.getElementById('carDetailsModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Model bulunamadı');
    }
  }

  openAddCarModal(): void {
    this.loadCarClasses();
    this.loadBrands();
    this.loadLocations();
    this.loadColors();
    this.loadCarTypes();
    this.loadRentingConditions();
    this.newCar = this.getEmptyCar();
    const modalElement = document.getElementById('addCarModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addCar(): void {

    this.carService.addCar(this.newCar).subscribe(
      () => {
        this.loadCars();
        const modalElement = document.getElementById('addCarModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        } this.successMessage = 'Araç başarıyla eklendi.';
        setTimeout(() => {
          this.successMessage = null;
        }, 10000);
      },
      error => {
        alert('Araç eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    );
  }

  openAddDamageModal(): void {
    if (this.selectedCar && this.selectedCar.carId) {
      this.newDamageDetail.carId = this.selectedCar.carId;
      console.log('nedirrr  ' + this.newDamageDetail.carId);
    } else {
      this.successMessage = 'Araç bulunamadı.';
      setTimeout(() => {
        this.successMessage = null;
      }, 10000);
      console.error('Araç bulunamadı');
    }
  }

  addDamageDetail(): void {
    if (!this.newDamageDetail.carId) {
      this.successMessage = 'Araç bulunamadı.';
      setTimeout(() => {
        this.successMessage = null;
      }, 10000);
      console.error('Araç bulunamadı');
      return;
    }

    if (!this.newDamageDetail.carId || !this.newDamageDetail.description || !this.newDamageDetail.repairCost) {
      alert('Lütfen gerekli alanları doldurun.');
      return;
    }

    this.carDamageDetailService.addCarDamageDetail(this.newDamageDetail).subscribe(
      () => {
        const modalElement = document.getElementById('addDamageModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
        this.successMessage = 'Hasar kaydı başarıyla eklendi.';
        console.log('MESAJ: ' + this.successMessage);
        this.loadCars();
        setTimeout(() => {
          if (this.selectedCar) {
            this.openCarDetails(this.selectedCar);
          }
          this.successMessage = null;
        }, 1000);
      },
      error => {
        alert('Hasar kaydı eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    );
  }

  openAddSpecificationModal(): void {
    this.loadSpecificationDescriptions();
    if (this.selectedCar && this.selectedCar.carId) {
      this.newCarSpecification.carId = this.selectedCar.carId;
      console.log('nedirrr  ' + this.newCarSpecification.carId);
    } else {
      this.successMessage = 'Araç bulunamadı.';
      setTimeout(() => {
        this.successMessage = null;
      }, 10000);
      console.error('Araç bulunamadı');
    }
  }

  addCarSpecifications(): void {
    if (this.selectedSpecificationDescriptions.length === 0) {
      console.error('Lütfen özellik seçiniz.');
      return;
    }

    this.selectedSpecificationDescriptions.forEach(specId => {
      const newSpec: CarSpecificationCreateUpdate = {
        carId: this.newCarSpecification.carId,
        specificationDescriptionId: specId,
        isDeleted: false
      };

      this.carSpecificationService.addCarSpecification(newSpec).subscribe(
        () => {
          this.successMessage = 'Özellik(ler) başarıyla eklendi.';
          this.loadCars();
          setTimeout(() => {
            if (this.selectedCar) {
              this.openCarDetails(this.selectedCar);
            }
            this.successMessage = null;
          }, 1000);
        },
        error => {
          alert('Özellik eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
      );
    });

    const modalElement = document.getElementById('addSpecificationModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  openAddRentingConditionModal(): void {
    this.loadRentingConditions();
    if (this.selectedCar && this.selectedCar.carId) {
      this.selectedRentingConditionId = null;
      this.newConditionValue = '';
    } else {
      this.successMessage = 'Araç bulunamadı.';
      setTimeout(() => {
        this.successMessage = null;
      }, 10000);
      console.error('Araç bulunamadı');
    }
  }

  addCarRentingCondition(): void {
    if (!this.selectedCar || !this.selectedRentingConditionId || !this.newConditionValue.trim()) {
      alert('Lütfen gerekli alanları doldurun.');
      return;
    }

    const newCondition: CarRentingConditionCreateUpdate = {
      carId: this.selectedCar.carId,
      rentingConditionId: this.selectedRentingConditionId,
      conditionValue: this.newConditionValue,
      isDeleted: false
    };

    this.carRentingConditionService.addCarRentingConditions(newCondition).subscribe(
      () => {
        const modalElement = document.getElementById('addCarRentingConditionsModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
        this.successMessage = 'Kiralama koşulu başarıyla eklendi.';
        this.loadCars();
        setTimeout(() => {
          if (this.selectedCar) {
            this.openCarDetails(this.selectedCar);
          }
          this.successMessage = null;
        }, 1000);
      },
      error => {
        alert('Kiralama koşulu eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    );
  }

  loadCarImages(carId: number): void {
    this.carImagesService.getCarImages(carId).subscribe(carImages => {
      this.carImages = carImages;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onImageChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.images = Array.from(event.target.files);
    }
  }

  getImageUrl(image: string): string {
    return `data:image/png;base64,${image}`;
  }

  addImages(): void {
    this.selectedNewCar = this.selectedCar;
    if (this.selectedCar) {
      const formData = new FormData();
      formData.append('carId', this.selectedCar.carId.toString());
      for (let file of this.selectedFiles) {
        formData.append('file', file, file.name);
      }
      // FormData içeriğini kontrol etmek için console.log
      console.log('FormData içeriği:');
      formData.forEach((value, key) => {
        console.log(key + ':', value);
      });

      this.carImagesService.addCarImages(formData).subscribe(
        response => {
          this.successMessage = 'Resim başarıyla yüklendi.';
          this.loadCars();
          setTimeout(() => {
            this.successMessage = null;
            const fileInput = document.getElementById('imageFiles') as HTMLInputElement;
            if (fileInput) {
              fileInput.value = '';
            };
          }, 5000);
        },

        error => {
          alert('Resim yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
      );
    }
  }

  openAddImageModal(): void {
    this.images = []; // Yeni fotoğraf ekleme modalı açıldığında önceki seçimleri temizle
    const modalElement = document.getElementById('addImageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  setActiveTab(tabName: string): void {

    this.activeTab = tabName;
    this.changeDetectorRef.detectChanges();
    const tabTriggerEl = document.querySelector(`#${tabName}`);
    if (tabTriggerEl) {
      const tab = new bootstrap.Tab(tabTriggerEl);
      tab.show();
    }
    console.log('MESAJ: ' + this.activeTab);
  }

  clearCarImages(): void {

    this.carImages = [];
  }

  completeMaintenance(car: Car): void {
    if (car) {
      const updatedCar = {
        ...car,
        status: 'Aktif'
      };

      this.carService.updateCar(updatedCar).subscribe(() => {
        this.successMessage = 'Aracın bakımı başarıyla tamamlandı ve durumu "Aktif" olarak güncellendi.';
        this.loadCars(); // Araç listesini yeniden yüklemek için
      }, error => {
        console.error('Aracın durumu güncellenirken bir hata oluştu.', error);
      });
    }
  }


  openReceiveCarModal(car: Car): void {
    this.selectedCar = car;
    this.receiveCarForm.reset();
    const modalElement = document.getElementById('receiveCarModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onReceiveCarSubmit(): void {
    if (this.receiveCarForm.valid && this.selectedCar) {
      const updatedCar = {
        ...this.selectedCar,
        status: this.receiveCarForm.value.carStatus,
        km: this.receiveCarForm.value.currentKm
      };

      this.carService.updateCar(updatedCar).subscribe(() => {
        // Rezervasyonun isDeleted alanını güncelleme
        const currentReservation = this.selectedCar?.reservations?.find(res => !res.isDeleted);

        if (currentReservation) {
          console.log('Rezervasyon bilgisi: ' + currentReservation.reservationId);
          currentReservation.isDeleted = true;
          this.reservationService.updateReservation(currentReservation).subscribe(() => {
            console.log('Rezervasyon başarıyla güncellendi.');
          }, error => {
            console.error('Rezervasyon güncellenirken bir hata oluştu.', error);
          });
        }

        this.successMessage = 'Araç başarıyla teslim alındı.';
        this.loadCars();

        // Hasar kaydı ekleme
        if (this.receiveCarForm.value.damageDate && this.receiveCarForm.value.description && this.receiveCarForm.value.repairCost) {
          const newDamageDetail: CarDamageDetailCreateUpdate = {
            carId: this.selectedCar?.carId ?? 0,
            damageDate: this.receiveCarForm.value.damageDate,
            description: this.receiveCarForm.value.description,
            repairCost: this.receiveCarForm.value.repairCost,
            isDeleted: false
          };
          this.carDamageDetailService.addCarDamageDetail(newDamageDetail).subscribe(() => {
            console.log('Hasar kaydı başarıyla eklendi.');
          });
        }

        const modalElement = document.getElementById('receiveCarModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
        setTimeout(() => {
          this.successMessage = 'Araç başarıyla teslim alındı.';
        }, 3000);
      });
    }
  }


  setupModalCloseListener(): void {
    const modalElement = document.getElementById('carDetailsModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.setActiveTab('details-tab');
      });
    }
  }
  closeUpdateCarModal(): void {
    this.selectedCar = null;
    this.tempCar = {};
  }

  openUpdateCarModal(car: Car | null): void {
    if (car) {
      this.selectedCar = car;
      this.tempCar = {
        model: {
          brandId: car.model?.brandId || 0,
          modelId: car.model?.modelId || 0,
        },
        location: {
          locationId: car.location?.locationId || 0,
          locationName: car.location?.locationName || '',
        },
        carClass: {
          carClassId: car.carClass?.carClassId || 0,
          carClassDescription: car.carClass?.carClassDescription || '',
        },
        color: car.color || '',
        licensePlate: car.licensePlate || '',
        gearshift: car.gearshift ?? false,
        passengers: car.passengers || 0,
        bags: car.bags || 0,
        doors: car.doors || 0,
        year: car.year || 0,
        dailyPrice: car.dailyPrice || 0,
        status: car.status || '',
        fuelType: car.fuelType || '',
        carType: car.carType || '',
        km: car.km || 0,
        chassisNo: car.chassisNo || '',
        isDeleted: car.isDeleted ?? false,
      };

      this.loadDropdownData();
    } else {
      console.error('Seçilen araç bulunamadı.');
    }
  }

  loadDropdownData(): void {
    this.brandService.getBrands().subscribe((brands) => {
      this.brands = brands;

      if (this.tempCar.model.brandId) {
        this.onBrandChange({ target: { value: this.tempCar.model.brandId } });
      }
    });

    this.carClassService.getCarClasses().subscribe((carClasses) => {
      this.carClasses = carClasses;
    });

    this.colors = this.colorService.getColors();

    this.locationService.getLocations().subscribe((locations) => {
      this.locations = locations;
    });

  }

  updateCar(): void {
    if (!this.selectedCar) {
      return;
    }
    const updatedCar = {
      ...this.selectedCar,
      ...this.tempCar,
      model: {
        ...this.selectedCar.model,
        brandId: this.tempCar.model.brandId,
        modelId: this.tempCar.model.modelId,
      },
      carClass: {
        ...this.selectedCar.carClass,
        carClassId: this.tempCar.carClass.carClassId,
      },
      location: {
        ...this.selectedCar.location,
        locationId: this.tempCar.location.locationId,
      },
    };

    this.carService.updateCar(updatedCar).subscribe({
      next: () => {
        this.successMessage = 'Araç başarıyla güncellendi!';
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
        this.loadCars(); // Araç listesini güncelleyin
      },
      error: (err) => {
        console.error('Güncelleme hatası:', err);
      }
    });

    const modalElement = document.getElementById('updateCarModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  private getEmptyCar(): CarCreateUpdate {
    return {
      licensePlate: '',
      carClassId: 0,
      gearshift: false,
      passengers: 0,
      bags: 0,
      modelId: 0,
      doors: 0,
      year: 0,
      color: '',
      dailyPrice: 0,
      status: '',
      fuelType: '',
      carType: '',
      km: 0,
      chassisNo: '',
      locationId: 0,
      isDeleted: false
    };
  }

  private getEmptyCarDamageDetail(): CarDamageDetailCreateUpdate {
    return {
      carId: 0,
      damageDate: new Date(),
      description: '',
      repairCost: 0,
      isDeleted: false
    };
  }

  private getEmptyCarSpecificationDetail(): CarSpecificationCreateUpdate {
    return {
      carId: 0,
      specificationDescriptionId: 0,
      isDeleted: false
    };
  }

  private getEmptyCarRentingCondition(): CarRentingConditionCreateUpdate {
    return {
      carId: 0,
      rentingConditionId: 0,
      conditionValue: '',
      isDeleted: false
    };
  }
}