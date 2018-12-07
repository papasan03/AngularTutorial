import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Component
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
// Page
// import { HomePage } from './home/home.page';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
