import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './main/sign-in/sign-in.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './user-profile/profile.component';
import { SellEditComponent } from './user-profile/sell-edit/sell-edit.component';
import { DropdownDirective } from './dropdown.directive';
import { HeaderComponent } from './header/header.component';
import { UserService } from './user.service';
import { ProductComponent } from './product/product.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    SellEditComponent,
    DropdownDirective,
    HeaderComponent,
    ProductComponent,
    ShopingCartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
