import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  userInfo: any = undefined;
  user: any = undefined;
  compras: any[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        if (!this.userInfo) {
          
          this.router.navigate(['/login']);
        }
        this.userService.getUser().subscribe(
          userdata =>{
            this.user = userdata;
          }
        )
      },
      error => {
        console.error('Error al obtener la información del usuario', error);
        this.router.navigate(['/login']);
      }
    );
  }

  logout(): void {
    this.userService.logout('usuario').subscribe({
      next: () => {
        console.log('Usuario ha sido deslogueado');
        this.router.navigate(['/login']); 
      },
      error: err => {
        console.error('Error al intentar deslogear al usuario', err);
     
      }
    });
  }
}
