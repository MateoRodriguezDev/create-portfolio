import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { FormErrorLabel } from '../../../shared/components/form-error-label/form-error-label';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  _authService = inject(AuthService);
  fb = inject(FormBuilder);
  route = inject(Router)


  isLoading = computed(() => this._authService.isLoading());

  async onGoogleLogin() {
     try {
    await this._authService.loginWithGoogle();
  } catch (error) {
    console.log((error as Error).message);
  };
  }

  async onEmailAndPasswordLogin(email: string, password: string) {
    try {
    await this._authService.loginWithEmailAndPassword(email, password);
  } catch (error) {
    console.log((error as Error).message);
  }
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) return;

    console.log(this.loginForm.value);
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.onEmailAndPasswordLogin(this.loginForm.value.email, this.loginForm.value.password);
    }



  }





  //Getters de mi formulario
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
