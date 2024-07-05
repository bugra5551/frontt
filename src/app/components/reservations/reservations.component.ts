import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/read/reservation.model';
import { ReservationService } from '../../services/reservation/reservation.service';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  userId!: number;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    this.loadReservations();
  }

  loadReservations(): void {
    console.log('user ıd: ' + this.userId);
    this.reservationService.getReservationsByUserId(this.userId).subscribe(reservations => {
      this.reservations = reservations;
    });
  }
}
