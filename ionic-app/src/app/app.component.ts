import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from './services/auth.service';
import {  OnInit } from '@angular/core';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  isAuthenticated: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticatedUser();

  }
}
