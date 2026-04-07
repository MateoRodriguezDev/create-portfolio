import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  validatePassword,
  getAuth,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { BackendResponse } from '../../profile/interfaces/userProfile.interface';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {


  isLoading = signal(false);

  constructor(
    private auth: Auth,
    private route: Router
  ) {
  }

  async loginWithGoogle() {
    try {
      this.isLoading.set(true);

      const provider = new GoogleAuthProvider();
      const authResponse = await signInWithPopup(this.auth, provider);
      const token = await authResponse.user.getIdToken();
      this.isLoading.set(false);

      this.redirectTo('/')


    } catch (error) {
      this.isLoading.set(false);
      if (error instanceof FirebaseError) {
        throw new Error(this.getErrorMessage(error.code));
      }
      throw new Error('Error inesperado');
    }
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      this.isLoading.set(true);

      const authResponse = await signInWithEmailAndPassword(this.auth, email, password);
      const token = await authResponse.user.getIdToken();
      this.isLoading.set(false);
      this.redirectTo('/')
    } catch (error) {
      this.isLoading.set(false);
      if (error instanceof FirebaseError) {
        throw new Error(this.getErrorMessage(error.code));
      }
      throw new Error('Error inesperado');
    }
  }

  async registerWithEmailAndPassword(email: string, password: string) {
    try {
      this.isLoading.set(true);

      //Reviso si la contraseña es valida
      this.checkPassword(password)

      const authResponse = await createUserWithEmailAndPassword(this.auth, email, password);
      const token = await authResponse.user.getIdToken();
      this.isLoading.set(false);
      this.redirectTo('/')
    } catch (error) {
      this.isLoading.set(false);
      if (error instanceof FirebaseError) {
        throw new Error(this.getErrorMessage(error.code));
      }
      throw new Error('Error inesperado');
    }
  }

  async checkPassword(password: string) {
    //Reviso si la contraseña es valida
      const status = await validatePassword(getAuth(), password);
      if (!status.isValid) {
        const needsLowerCase = status.containsLowercaseLetter !== true;
        const needsUpperCase = status.containsUppercaseLetter !== true;
        const needsNumericCharacter = status.containsNumericCharacter !== true;

        console.log({
          hasLowerCase: needsLowerCase, hasUpperCase: needsUpperCase, HasNumericCharacter: needsNumericCharacter
        })

      }
      return {}
  }

  async logout() {
    await signOut(this.auth);
    this.redirectTo('/auth/login')
  }

  redirectTo(path: string) {
    this.route.navigate([`${path}`])
  }

  private getErrorMessage(code: string): string {
    const errors: Record<string, string> = {
      'auth/user-not-found': 'No existe una cuenta con ese email',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/invalid-email': 'El email no es válido',
      'auth/user-disabled': 'Esta cuenta fue deshabilitada',
      'auth/too-many-requests': 'Demasiados intentos, intentá más tarde',
      'auth/popup-closed-by-user': 'Cerraste el popup antes de completar el login',
      'auth/cancelled-popup-request': 'El popup fue cancelado',
      'auth/invalid-credential': 'Credenciales inválidas',
      'auth/password-does-not-meet-requirements': 'Contraseña no válida'
    };

    return errors[code] ?? `Error de autenticación: ${code}`;
  }
}
