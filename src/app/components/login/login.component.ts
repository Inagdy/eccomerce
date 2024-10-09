import { NgxSpinnerService } from 'ngx-spinner';
import { Component, inject } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _router = inject(Router);
  private _NgxSpinnerService =inject(NgxSpinnerService)

  messagerError: string = '';
  loader: boolean = false;
  msgSucces: boolean = false;



  loginIn: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.pattern(/^\w{6,}$/),]),
  });


  logIn() {
    if (this.loginIn.valid) {
      this._NgxSpinnerService.show()
      this.loader = true;
      this._AuthService.loginFrom(this.loginIn.value).subscribe({
        next: (res) => {
          //message suxess we will transfer the user for login component
          if (res.message == 'success') {
            this.msgSucces= true
             console.log(res);
             this._AuthService.saveUserData()
             console.log(this._AuthService.userData);
             
            setTimeout(()=>{
              localStorage.setItem('userToken', res.token)
              this._NgxSpinnerService.hide()
              this._router.navigate(['/home'])


            },1000)


          }
          this.loader = false;
        },
        error: (err: HttpErrorResponse) => {
          //show error message for client
          this._NgxSpinnerService.hide()
          console.log(err);
          this.loader = false;
          this.messagerError = err.error.message;
        },
      });
    }
  }
}


