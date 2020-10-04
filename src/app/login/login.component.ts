import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HelperService } from '../services/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(private api: ApiService, private helper: HelperService, private router: Router, private auth: AuthService) { }

  login() {

    // login user  
    this.auth.login(this.emailFormControl.value, this.passwordFormControl.value).then(data => {
      // user login 
      this.router.navigate(['/dashboard']).then(() => {
        this.api.setCurrentUser(data.user.uid)
      })


    }, err => this.helper.openSnackBar(err.message, 'Close'))
  }

}
