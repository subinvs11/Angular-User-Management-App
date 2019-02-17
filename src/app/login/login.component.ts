import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }


  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onLogin() {
    if (this.loginForm.valid) {
      console.log('login form is valid');//zzz
      this.authenticationService.authenticateUser(this.loginForm.value).subscribe(
        response => {
          console.log('login success');//zzz
        },
        error => {
          console.log('login failed');//zzz
        }
      );
      
    } else {
      console.log('login form is invalid');//zzz
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
