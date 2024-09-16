import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  name: string = '';
  family_name: string = '';
  address: string = '';
  errorMessage: string = '';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, this.passwordValidator()]],
      confirmPassword: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      family_name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword) {
      return password === confirmPassword ? null : { 'mismatch': true };
    }

    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario válido', this.registerForm.value);
      this.userService.signUp(this.username, this.password, this.email, this.name, this.family_name, this.address).subscribe(
        response => {
          console.log('Sign up successful', response);
          this.router.navigate(['/validationEmail']);
        },
        error => {
          console.error('Sign up failed', error);
          this.errorMessage = 'Error al registrar usuario. Por favor, intenta nuevamente.';
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;

      if (!password) {
        return null;
      }

      const hasNumber = /\d/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isValidLength = password.length >= 8;

      const passwordValid = hasNumber && hasUpperCase && hasLowerCase && hasSpecialCharacter && isValidLength;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }
}
