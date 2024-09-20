import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { log } from 'console';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _router = inject(Router);

  messagerError: string = '';
  loader: boolean = false;
  msgSucces: boolean = false;



  registerFrom: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),
    ]),
  });
  registerForm: any;

  registerSubmit() {
    if (this.registerFrom.valid) {
      this.loader = true;
      console.log(this.registerFrom.value);

      this._AuthService.setRegisterForm(this.registerFrom.value).subscribe({
        next: (res) => {
          //message suxess we will transfer the user for login component
          if (res.message == 'success') {
            this.msgSucces= true
            setTimeout(()=>{
              this._router.navigate(['/login'])

            },1000)


          }
          console.log(res);
          this.loader = false;
        },
        error: (err: HttpErrorResponse) => {
          //show error message for client
          console.log(err);
          this.loader = false;
          this.messagerError = err.error.message;
        },
      });
    } else {
      this.registerFrom.markAllAsTouched();
    }
  }
}
