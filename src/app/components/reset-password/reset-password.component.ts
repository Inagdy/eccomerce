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
  private _NgxSpinnerService =inject(NgxSpinnerService)

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
    this._NgxSpinnerService.show()

    this._AuthService.verifyEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.step += 1;
          this._NgxSpinnerService.hide()

        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  verifyCode(): void {
    this._NgxSpinnerService.show()

    this._AuthService.verifyCode(this.verfyCode.value).subscribe({
      next: (res) => {
        if ((res.status = 'Success')) {
          this.step += 1;
          let emailValue = this.verifyEmail.get('email')?.value;
          this.resetPassord.get('email')?.patchValue(emailValue)
          this._NgxSpinnerService.hide()

        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  resetPassword(): void {
    this._NgxSpinnerService.show()

    this._AuthService.setResetPassword(this.resetPassord.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData();
        this._NgxSpinnerService.hide()
        this._Route.navigate(['/home']);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
