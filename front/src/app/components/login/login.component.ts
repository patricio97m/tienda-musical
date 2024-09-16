import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        response => {
          localStorage.setItem('idToken', response.token);
          console.log('Login successful', response);
          this.router.navigate(['']);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        }
      );
    }
  }
}
