import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


export interface apicall {
  status: string
  timestamp: number
  data: user | string
}

export interface user {
  id: number
  name: string
  surname: string
  email: string
  password: string
  apikey: string
  salt: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private http: HttpClient,private router: Router,private loadingController: LoadingController) { }

  login() {
    this.isAuthenticated = true;
  }

  // Simulate logout functionality
  logout() {
    this.isAuthenticated = false;
    environment.apikey = 'oUsBARLyO4bJfM7Y';
  }


  // Check if the user is authenticated
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  loginUser(email: string, password: string)
  {
    let params = {
      type:'Login2',
      email: email,
      password: password
    }

    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('u21528790' + ':' + '345803Moo')
    });

    let paramsNew = JSON.stringify(params);

    return this.http.post(environment.url, paramsNew, { headers: headers }).pipe(
      map((res: any) => {
        if (res.status === 'Fail') {
          this.isAuthenticated = false;
          return false; // Login failed
        } else {
          this.isAuthenticated = true;
          environment.apikey = res.data.apikey;
          return true; // Login successful
        }
      }),
      catchError((error) => {
        this.isAuthenticated = false;
        return of(false); // Login failed due to error
      })
    );

  }

  checkAuthAndRedirect(pathName:string): void
  {
    if (this.isAuthenticated) {
      this.router.navigate([`/${pathName}`]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
