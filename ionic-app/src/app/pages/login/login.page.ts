import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string = "";
  public password: string = "";

  constructor(private authService: AuthService, private toastController: ToastController,private router: Router) {}

  ngOnInit() {
  }

  async login() {
    // Check if the password is 8 characters long
    if (this.password.length < 8) {
      this.presentToast('Password must be 8 characters long');
      return;
    }

    // Check if the email is correct
    if (!this.validateEmail(this.email)) {
      this.presentToast('Invalid email');
      return;
    }

    // Call the authentication service
    const loginResult = await this.authService.loginUser(this.email, this.password).toPromise();

    if (loginResult) {
      this.presentToast('Login successful');
      this.router.navigateByUrl('/listings');
      // Redirect to another page or perform any additional actions for successful login
    } else {
      this.presentToast('Login failed');
      // Handle unsuccessful login (e.g., display an error message)
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  // Function to validate email format
  validateEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

}
