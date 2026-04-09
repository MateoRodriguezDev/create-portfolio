import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormUtils } from '../../../utils/form-utils';
import { FormErrorLabel } from '../../../shared/components/form-error-label/form-error-label';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  _authService = inject(AuthService);
  fb = inject(FormBuilder);
  formUtils = FormUtils;
  route = inject(Router)


  isLoading = computed(() => this._authService.isLoading());

  async onGoogleLogin() {
    try {
      await this._authService.loginWithGoogle();
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  async onEmailAndPasswordRegister(email: string, password: string) {
    try {
      await this._authService.registerWithEmailAndPassword(email, password);
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  registerForm = this.fb.group(
    {
      email: [null, [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern(this.formUtils.passwordPattern),
        ],
      ],
      password2: [null, Validators.required],
    },
    {
      validators: [this.formUtils.isFieldOneEqualFieldTwo('password', 'password2')],
    },
  );

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid) return;

    console.log(this.registerForm.value);
    if (this.registerForm.value.email && this.registerForm.value.password) {
      this.onEmailAndPasswordRegister(
        this.registerForm.value.email,
        this.registerForm.value.password,
      );
    }


  }

  //Getters de mi formulario
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  get password2() {
    return this.registerForm.get('password2');
  }
}
