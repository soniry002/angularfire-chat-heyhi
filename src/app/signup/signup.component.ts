import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper/helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);


  constructor(private api: ApiService, private helper: HelperService, private router: Router, private auth: AuthService) { }

  register() {
    if (!this.nameFormControl.valid) {
      alert('Please enter Name')
      this.nameFormControl.reset()
      return
    }
    if (!this.emailFormControl.valid) {
      alert('Please enter correct email')
      this.emailFormControl.reset()
      return
    }

    if (!this.passwordFormControl.valid) {
      alert('Please enter correct password format')
      this.passwordFormControl.reset()
      return
    }

    this.auth.signup(this.emailFormControl.value, this.passwordFormControl.value).then(data => {

      this.api.createUser(data.user.uid, {
        name: this.nameFormControl.value,
        email: this.emailFormControl.value,
        uid: data.user.uid,
        conversations: []
      }).then(() => {
        localStorage.setItem('uid', data.user.uid)
        this.router.navigate(['/dashboard']).then(() => {
          // setTimeout(() => {
            this.helper.openSnackBar('Welcome to HeyHi', 'Close');

          // }, 300)
        })
      })
    }, err => {
      this.helper.openSnackBar(err.message, 'Close');
      this.emailFormControl.reset();
      this.passwordFormControl.reset();

    })
  }

}
