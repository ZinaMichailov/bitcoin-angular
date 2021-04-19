import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAppComponent } from './pages/contact-app/contact-app.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';

const routes: Routes = [
  { path: 'contact/:id', component: ContactDetailsComponent},
  { path: 'contact', component: ContactAppComponent},
  { path: 'statistic', component: StatisticPageComponent},
  { path: '', component: HomePageComponent},
  // {
  //   path: '', component: PetAppComponent, children: [
  //     { path: 'edit', component: PetEditComponent },
  //     { path: 'edit/:id', component: PetEditComponent, resolve: { pet: PetResolverService } }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
