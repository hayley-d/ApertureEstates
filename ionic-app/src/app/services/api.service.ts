import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface property {
  id: number
  title: string
  price: number
  bedrooms: number
  bathrooms: number
  parking_spaces: number
  location: string
  description: string
  images: string | string[]
  type: string
  amenities: string
  url: string
  agent: string
  createdAt: string
  updatedAt: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getListings() : Observable<property>{
    let params = {
      type:'GetAllListings',
      return: '*',
      apikey:'oUsBARLyO4bJfM7Y'
    }

    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('u21528790' + ':' + '345803Moo')
    });

    let paramsNew = JSON.stringify(params);

    return this.http.post<property>(environment.url, paramsNew, { headers: headers });
  }

  getListingsSearch(search:string) : Observable<property>{
    let params = {
      type:'GetAllListings',
      return: '*',
      apikey:'oUsBARLyO4bJfM7Y',
      search:{
      location: search
      }
    }

    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('u21528790' + ':' + '345803Moo')
    });

    let paramsNew = JSON.stringify(params);

    return this.http.post<property>(environment.url, paramsNew, { headers: headers });
  }


}
