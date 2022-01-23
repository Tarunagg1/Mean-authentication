import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  loginUser() {
    this.authService.loginuser(this.loginData).subscribe(
      (resp: any) => {
        let { token } = resp;
        if (token) {
          localStorage.setItem('token', token);
          this.route.navigate(['/dashboard']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
