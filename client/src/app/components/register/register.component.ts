import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerData = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {}

  registerUser() {
    this.authService.registeruser(this.registerData).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
