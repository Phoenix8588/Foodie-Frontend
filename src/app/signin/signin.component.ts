import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SignInComponent implements OnInit {
  user: User;
  successFlag: boolean;
  errorFlag: boolean;
  constructor(public auth: AuthService) {
    this.user = new User();
    this.successFlag = false;
    this.errorFlag = false;
  }
  ngOnInit(): void {
    document.body.classList.add('selector');
  }
  ngOnDestroy(){
    document.body.classList.remove('selector');
  }

  signInSubmit(signInForm: any) {
    this.successFlag = false;
    this.errorFlag = false;

    this.auth.signIn(this.user).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.user = new User();
          signInForm.form.markAsPristine();
          this.auth.currentUser = res;
          this.successFlag = true;
        } else {
          this.errorFlag = true;
        }
      },
      (error) => {
        this.errorFlag = true;
      }
    );
  }
}