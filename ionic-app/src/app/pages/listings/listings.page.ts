import { Component, OnInit } from '@angular/core';
import {ApiService, property} from "../../services/api.service";
import {LoadingController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.page.html',
  styleUrls: ['./listings.page.scss'],
})
export class ListingsPage implements OnInit {
  listings: property[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 7;

  constructor(private apiService:ApiService,private toastController: ToastController, private loadingCtrl:LoadingController) { }



  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void>{
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    })
    await loading.present();

    try {
      const response = await this.apiService.getListings().toPromise();
      const jsonResponse = response as any; // Parse JSON response
      this.listings = jsonResponse.data; // Extract data property

      // Assuming listings is your array of objects
      this.listings.forEach(listing => {
        if (typeof listing.images === 'string') {
          // Split the string into an array of URLs
          let imageUrls = listing.images.split(',').map((url: string) => url.trim());
          // Assign the array of URLs back to the images property
          listing.images = imageUrls;
        }
      });

      const toast = await this.toastController.create({
        message: 'All Properties Loaded',
        duration: 2000 // Duration in milliseconds
      });
      await toast.present();
      console.log(this.listings[0]);
      loading.dismiss();
    } catch (error) {
      console.error('Error fetching data from API:', error);

      const toast = await this.toastController.create({
        message: 'Error fetching properties',
        duration: 2000, // Duration in milliseconds
        color: 'danger' // Customize toast color for errors
      });
      await toast.present();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.listings.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getDisplayedListings(): property[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.listings.slice(startIndex, endIndex);
  }

  async refreshData(event: any): Promise<void> {
    // Call API to refresh data
    await this.loadData();

    // Complete the refresh event
    event.target.complete();
  }
}

