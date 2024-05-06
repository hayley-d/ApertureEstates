import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private authService: AuthService,private loadingController: LoadingController, private router: Router,) { }

  ngOnInit() {
    this.logout();
  }
  async logout(): Promise<void> {
    // Display loading spinner while logging out
    const loading = await this.loadingController.create({
      message: 'Logging out...',
      spinner: 'bubbles', // Choose the spinner type
      translucent: true, // Make the loading spinner translucent
      cssClass: 'custom-loading' // Optional CSS class for styling
    });
    await loading.present();

    // Simulate logout process
    setTimeout(() => {
      this.authService.logout(); // Call the logout method from AuthService
      loading.dismiss(); // Dismiss the loading spinner after logout process is complete
      this.router.navigate(['/login']);
    }, 2000); // Simulate 2 seconds delay (replace with actual logout delay)
  }
}
