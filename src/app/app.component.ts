import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User Management';
  loginStatus = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginStatus = this.authenticationService.getLoginStatus();
  }


}
