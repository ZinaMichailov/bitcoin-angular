import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAppComponent } from './pages/contact-app/contact-app.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactResolverService } from './services/contact-resolver.service';

const routes: Routes = [
  { path: 'contact/:id', component: ContactDetailsComponent, resolve: {contact: ContactResolverService}},
  { path: 'edit/:id', component: ContactEditComponent , resolve: {contact: ContactResolverService}},
  { path: 'contact', component: ContactAppComponent},
  { path: 'edit', component: ContactEditComponent},
  { path: 'statistic', component: StatisticPageComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
