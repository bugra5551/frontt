import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage?: string;
  errorMessage?: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      identityNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      driverLicenseNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registrationData = {
        ...this.registerForm.value,
        registrationDate: new Date().toISOString(),
        userTypeId: 3
      };

      this.userService.registerCustomer(registrationData).subscribe({
        next: (response) => {
          this.successMessage = 'Kayıt başarılı!';
          this.registerForm.reset();
          setTimeout(() => {
            this.successMessage = undefined;
            this.router.navigate(['/login']);
          }, 5000);
        },
        error: (error) => {
          this.errorMessage = `Kayıt başarısız: ${error.message}`;
          setTimeout(() => this.errorMessage = undefined, 5000);
        }
      });
    } else {
      this.errorMessage = 'Lütfen tüm alanları eksiksiz doldurun.';
      setTimeout(() => this.errorMessage = undefined, 5000);
    }
  }
}
