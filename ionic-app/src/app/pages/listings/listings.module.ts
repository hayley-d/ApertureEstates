import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingsPageRoutingModule } from './listings-routing.module';

import { ListingsPage } from './listings.page';

import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingsPageRoutingModule
  ],
  declarations: [ListingsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListingsPageModule {}
