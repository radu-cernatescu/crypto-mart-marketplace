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
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserListsComponent } from './admin-panel/user-lists/user-lists.component';
import { MyOrdersComponent } from './user-profile/my-orders/my-orders.component';
import { MyInboxComponent } from './user-profile/my-inbox/my-inbox.component';
import { MyWalletComponent } from './user-profile/my-wallet/my-wallet.component';
import { MarketListingsComponent } from './user-profile/market-listings/market-listings.component';
import { ListingsArchiveComponent } from './user-profile/listings-archive/listings-archive.component';
import { NgxSpinnerModule } from "ngx-spinner";

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
    ShoppingCartComponent,
    AdminPanelComponent,
    UserListsComponent,
    MyOrdersComponent,
    MyInboxComponent,
    MyWalletComponent,
    MarketListingsComponent,
    ListingsArchiveComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
