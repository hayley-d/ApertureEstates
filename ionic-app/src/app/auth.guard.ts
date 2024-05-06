import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      console.log('Access granted')
      return true; // Allow access if user is authenticated
    } else {
      console.log('access denied')
      this.presentToast('Please login').then();
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
      return false;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds
      position: 'top' // Position of the toast message
    });
    toast.present();
  }
}
