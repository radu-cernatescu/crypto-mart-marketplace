import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './user-profile/profile.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './main/sign-in/sign-in.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductComponent,
  children : [
    {path: ':title', component : ProductComponent,}
 ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
