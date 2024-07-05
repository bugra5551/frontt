import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../models/read/car.model';
import { HelpDeskService } from '../../services/help-desk/help-desk.service';
import { HelpDesk } from '../../models/read/help-desk.model';
import { HelpDeskCreateUpdate } from '../../models/create-update/help-desk-create-update.model';
import { CarImageService } from '../../services/car-image/car-image.service';
import { CarImage } from '../../models/read/car-image.model';
import { AuthService } from '../../services/auth/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LocationService } from '../../services/location/location.service';
import { Location } from '../../models/read/location.model';
import { ReservationService } from '../../services/reservation/reservation.service';
import { PaymentService } from '../../services/payment/payment.service';
import { Reservation } from '../../models/read/reservation.model';
import { Payment } from '../../models/read/payment.model';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrl: './make-reservation.component.css'
})
export class MakeReservationComponent implements OnInit {
  car: Car | undefined;
  userRole: string = '';
  carId!: number;
  userId!: number; // JWT'den alınacak
  messages: HelpDesk[] = [];
  newMessage: string = '';
  carImages: CarImage[] = [];
  startDate!: string;
  endDate!: string;
  totalPrice: number = 0;
  rentalForm!: FormGroup;
  locations: Location[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService,
    private helpDeskService: HelpDeskService,
    private carImagesService: CarImageService,
    private authService: AuthService,
    private locationService: LocationService,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {

    this.rentalForm = this.fb.group({
      startDate: ['', [Validators.required, this.minDateValidator(new Date())]],
      endDate: ['', [Validators.required, this.minEndDateValidator()]],
      paymentMethod: ['', [Validators.required]],
      dropOffLocation: ['', [Validators.required]]
    });

    this.userId = this.authService.getUserIdFromToken();
    const carId = this.route.snapshot.paramMap.get('carId');
    if (carId) {
      this.carService.getByCarId(+carId).subscribe(car => {
        this.car = car;
        this.loadCarImages(car.carId);
        this.loadMessages(car.carId, this.userId);
        this.loadLocations()
      });
    }

    this.rentalForm.controls['startDate'].valueChanges.subscribe(() => {
      this.rentalForm.controls['endDate'].updateValueAndValidity();
      this.calculateTotalPrice();
    });

    this.rentalForm.controls['endDate'].valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
  }

  addReservationAndPayment(): void {
    if (this.rentalForm.valid) {
      const payment: Payment = {
        paymentDate: new Date(),
        amount: this.totalPrice,
        paymentMethod: this.rentalForm.get('paymentMethod')?.value,
        paymentStatus: 'Tamamlandı',
        isDeleted: false
      };

      this.paymentService.addPayment(payment).subscribe(addedPayment => {
        const reservation: Reservation = {
          customerId: this.userId,
          carId: this.car?.carId || 0, // Güvenli erişim operatörü
          reservationDate: new Date(),
          pickUpDate: this.rentalForm.get('startDate')?.value,
          pickUpLocation: this.car?.locationId || 0, // Güvenli erişim operatörü
          dropOffDate: this.rentalForm.get('endDate')?.value,
          dropOffLocation: this.rentalForm.get('dropOffLocation')?.value, // Ekrandan gelen teslim etme lokasyonu
          totalPrice: this.totalPrice,
          status: 'Tamamlandı',
          paymentId: addedPayment.paymentId || 0, // Ödeme ID'si
          isDeleted: false
        };

        this.reservationService.addReservation(reservation).subscribe(() => {
          this.car!.status = 'Kirada';
          this.car!.locationId = this.rentalForm.get('dropOffLocation')?.value;
          this.carService.updateCar(this.car!).subscribe(() => {
            alert('Rezervasyon ve ödeme başarıyla tamamlandı.');
            this.router.navigate(['/reservations']); // Rezervasyonlar sayfasına yönlendirme
          }, error => {
            alert('Araç durumu güncellenirken bir hata oluştu.');
          });
        }, error => {
          alert('Ödeme işlemi sırasında bir hata oluştu.');
        });
      }, error => {
        alert('Rezervasyon işlemi sırasında bir hata oluştu.');
      });
    }
  }

  minDateValidator(minDate: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const controlDate = new Date(control.value);
      return controlDate >= minDate ? null : { min: true };
    };
  }

  minEndDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const startDate = new Date(this.rentalForm?.controls['startDate'].value);
      const endDate = new Date(control.value);
      return endDate >= startDate ? null : { min: true };
    };
  }


  loadCarImages(carId: number): void {
    this.carImagesService.getCarImages(carId).subscribe(carImages => {
      this.carImages = carImages;
    });
  }

  getImageUrl(imageData: string): string {
    return `data:image/png;base64,${imageData}`;
  }

  //YARDIM MASASI
  loadMessages(carId: number, userId: number): void {
    console.log('userId  ' + this.userId);
    this.helpDeskService.getMessagesByCarIdAndUserId(carId, userId).subscribe(messages => {
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

  calculateTotalPrice(): void {
    const startDateValue = this.rentalForm.controls['startDate'].value;
    const endDateValue = this.rentalForm.controls['endDate'].value;

    if (startDateValue && endDateValue) {
      const start = new Date(startDateValue);
      const end = new Date(endDateValue);
      const diffInTime = end.getTime() - start.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      this.totalPrice = diffInDays * (this.car?.dailyPrice || 0);
    } else {
      this.totalPrice = 0;
    }
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe(locations => { this.locations = locations; });
  }

  onSubmit(): void {
    if (this.rentalForm.valid) {
      // Handle the form submission
      console.log('Form submitted');
    }
  }

}
