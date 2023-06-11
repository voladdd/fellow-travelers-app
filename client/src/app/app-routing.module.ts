import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ToursPageComponent } from './components/tours-page/tours-page.component';
import { TourPageComponent } from './components/tour-page/tour-page.component';
import { TourCreationPageComponent } from './components/tour-creation-page/tour-creation-page.component';
import { FormsModule } from '@angular/forms';
import { MyToursPageComponent } from './components/my-tours-page/my-tours-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'tours/create', component: TourCreationPageComponent },
  { path: 'tours/:id', component: TourPageComponent },
  { path: 'tours', component: ToursPageComponent },
  { path: 'users/profile', component: MyToursPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
