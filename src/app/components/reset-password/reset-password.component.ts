import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Route = inject(Router);

  step: number = 1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verfyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  resetPassord: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  verifyEmailSubmit(): void {

    this._AuthService.verifyEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.step += 1;

        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  verifyCode(): void {

    this._AuthService.verifyCode(this.verfyCode.value).subscribe({
      next: (res) => {
        if ((res.status = 'Success')) {
          this.step += 1;
          let emailValue = this.verifyEmail.get('email')?.value;
          this.resetPassord.get('email')?.patchValue(emailValue)

        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  resetPassword(): void {

    this._AuthService.setResetPassword(this.resetPassord.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData();
        this._Route.navigate(['/home']);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
