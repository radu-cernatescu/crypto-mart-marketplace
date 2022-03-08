import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './user-profile/profile.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './main/sign-in/sign-in.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserListsComponent } from './admin-panel/user-lists/user-lists.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'shoping-cart', component: ShoppingCartComponent },
  { path: 'product', component: ProductComponent,
  children : [
    {path: ':title', component : ProductComponent,}
 ] },
 { path: 'admin-panel', component: AdminPanelComponent,
  
 },
 {path: ':email', component : UserListsComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
