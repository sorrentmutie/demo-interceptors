import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReqResPageComponent } from './req-res/components/req-res-page/req-res-page.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  { path: 'users',  component: ReqResPageComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
