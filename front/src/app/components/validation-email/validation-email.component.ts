import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation-email',
  templateUrl: './validation-email.component.html',
  styleUrl: './validation-email.component.css'
})
export class ValidationEmailComponent {
  confirmForm: FormGroup;
  errorMessage: string = '';


  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.confirmForm = this.fb.group({
      username: ['', Validators.required],
      confirmationCode: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.confirmForm.valid) {
      const { username, confirmationCode } = this.confirmForm.value;
      this.userService.confirmAccount(username, confirmationCode).subscribe(
        response => {
          console.log('Account confirmed successfully', response);
          this.router.navigate(['/login']); // Redirigir al login después de confirmar la cuenta
        },
        error => {
          console.error('Account confirmation failed', error);
          this.errorMessage = 'Error al confirmar la cuenta. Por favor, intenta nuevamente.';
        }
      );
    } else {
      console.log('Formulario inválido');
      this.errorMessage = 'Error al confirmar la cuenta. Por favor, intenta nuevamente.';
    }
  }
}
