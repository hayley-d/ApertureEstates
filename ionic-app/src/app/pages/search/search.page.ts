import { Component, OnInit } from '@angular/core';
import {ApiService, property} from "../../services/api.service";
import {LoadingController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  listings: property[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 7;
  searchTerm: string = '';


  constructor(private apiService:ApiService,private toastController: ToastController, private loadingCtrl:LoadingController) { }



  ngOnInit(): void {

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

  async search(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Searching...',
      spinner: 'bubbles',
    })
    await loading.present();

    try {
      // Make API call with search term
      const response = await this.apiService.getListings().toPromise();
      const jsonResponse = response as any; // Parse JSON response
       var filteredListings: property[] = jsonResponse.data; // Extract data property

      this.listings = filteredListings.filter(listing => {
        return listing.location.toLowerCase().includes(this.searchTerm.toLowerCase());
      });

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
        message: 'Search complete',
        duration: 2000
      });

      await toast.present();
      loading.dismiss();
    }
    catch (error)
    {
      console.error('Error searching:', error);

      const toast = await this.toastController.create({
        message: 'Error searching',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      loading.dismiss();
    }
  }

}
