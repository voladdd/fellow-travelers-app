import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToursPageComponent } from './components/tours-page/tours-page.component';
import { ToursListComponent } from './components/tours-list/tours-list.component';
import { TourPageComponent } from './components/tour-page/tour-page.component';
import { TourCreationPageComponent } from './components/tour-creation-page/tour-creation-page.component';
import { TourListItemComponent } from './components/tour-list-item/tour-list-item.component';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ToursPageComponent,
    ToursListComponent,
    TourPageComponent,
    TourCreationPageComponent,
    TourListItemComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
