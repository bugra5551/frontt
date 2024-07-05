import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../../models/read/car.model';
import { AuthService } from '../../services/auth/auth.service';
import { CarService } from '../../services/car/car.service';
import { ChangeDetectorRef } from '@angular/core';
import { CarImage } from '../../models/read/car-image.model';
import { CarImageService } from '../../services/car-image/car-image.service';
import { HelpDesk } from '../../models/read/help-desk.model';
import { HelpDeskService } from '../../services/help-desk/help-desk.service';
import { HelpDeskCreateUpdate } from '../../models/create-update/help-desk-create-update.model';

declare var bootstrap: any;

@Component({
  selector: 'app-car-list-public',
  templateUrl: './car-list-public.component.html',
  styleUrl: './car-list-public.component.css'
})
export class CarListPublicComponent implements OnInit{

  cars: Car[] = [];
  selectedCar: Car | null = null;
  filteredCars: Car[] = [];
  activeTab: string = 'details-tab'; // Default olarak ilk tab aktif
  images: CarImage[] = [];
  carImages: CarImage[] = [];
  searchCriteria = {
    brand: '',
    model: '',
    minPrice: null,
    maxPrice: null,
    color: '',
    fuelType: '',
    carType: ''
  };
  carId!: number;
  userId!: number; // JWT'den alınacak
  messages: HelpDesk[] = [];
  newMessage: string = '';
  userRole!: string;

  constructor(
    public carService: CarService, 
    public authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private carImagesService: CarImageService,
    private helpDeskService: HelpDeskService,
    private router: Router) { }

    ngOnInit(): void {
      this.userId = this.authService.getUserIdFromToken();
      this.userRole = this.authService.getRole(); 
      console.log('userId  ' + this.userId);
      console.log('role  ' + this.userRole);
      this.loadCars();
    }

    //ARAÇ KİRALA
    rentCar(car: Car): void {
      this.router.navigate(['/make-reservation', car.carId]);
    }
    //ARAÇ KİRALA

    //YARDIM MASASI
    loadMessages(): void {
      console.log('userId  ' + this.userId);
      this.helpDeskService.getMessagesByCarIdAndUserId(this.carId, this.userId).subscribe(messages => {
        this.messages = messages;
      });
    }
  
    sendMessage(): void {
  
      console.log('userId  ' + this.userId);
      console.log('role  ' + this.userRole);
      
      const message: HelpDeskCreateUpdate = {
        userId: this.userId,
        carId: this.carId,
        messageId: 0, //this.userRole  === 'Customer' ? 0 : 1,
        message: this.newMessage,
        messageDate: new Date()
      };
  
      this.helpDeskService.addMessage(message).subscribe(addedMessage => {
        this.messages.unshift(addedMessage);
        this.newMessage = '';
      });
    }
    //YARDIM MASASI

    //ARAÇ LİSTELEME, ARAÇ DETAY GETİRME
    loadCars(): void {
      this.carService.getCars().subscribe(cars => {
        this.cars = cars.filter(car => car.status === 'Aktif');
        this.cars.forEach(car => {
          this.carImagesService.getFirstCarImage(car.carId).subscribe(img => {
            car.firstImage = img;
          });
        });
      });
    }
  
    openCarDetails(car: Car): void {
      this.carId = car.carId;
      this.loadMessages();
      this.loadCarImages(car.carId);
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
        console.error('Modal element not found');
      }
    }
    //ARAÇ LİSTELEME, ARAÇ DETAY GETİRME

    //RESİM İŞLEMLERİ
    loadCarImages(carId: number): void {
      this.carImagesService.getCarImages(carId).subscribe(carImages => {
        this.carImages = carImages;
      });
    }

    onImageChange(event: any): void {
      if (event.target.files && event.target.files.length) {
        this.images = Array.from(event.target.files);
      }
    }

    getImageUrl(image: string): string {
      return `data:image/png;base64,${image}`;
    }

    clearCarImages(): void {
      this.carImages = [];
    }
    //RESİM İŞLEMLERİ

    //ARAÇ FİLTRELEME
    onSearch(form: any): void {
      if (form.invalid) {
        return;
      }
      console.log('Search Criteria:', this.searchCriteria);
  
      this.cars = this.cars.filter(car => {
        const matchesBrand = car.model.brand?.brandName.includes(this.searchCriteria.brand);
        const matchesModel = car.model.modelName.toLowerCase().includes(this.searchCriteria.model.toLowerCase());
        const matchesPrice = (!this.searchCriteria.minPrice || car.dailyPrice >= this.searchCriteria.minPrice) &&
                             (!this.searchCriteria.maxPrice || car.dailyPrice <= this.searchCriteria.maxPrice);
        const matchesColor = car.color.toLowerCase().includes(this.searchCriteria.color.toLowerCase());
        const matchesFuelType = car.fuelType.toLowerCase().includes(this.searchCriteria.fuelType.toLowerCase());
        const matchesCarType = car.carType.toLowerCase().includes(this.searchCriteria.carType.toLowerCase());
  
        return matchesBrand && matchesModel && matchesPrice && matchesColor && matchesFuelType && matchesCarType;
      });
      console.log('Filtered Cars:', this.cars);
    }

    clearFilters(): void {
      this.searchCriteria = {
        brand: '',
        model: '',
        minPrice: null,
        maxPrice: null,
        color: '',
        fuelType: '',
        carType: ''
      };
      this.loadCars();
      this.changeDetectorRef.detectChanges();
    }
    //ARAÇ FİLTRELEME

    //AKTİF TAB SET ETME
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
    //AKTİF TAB SET ETME
}
