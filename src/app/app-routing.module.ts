import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsService } from './products.service';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent, resolve: { products: ProductsService }, children: [
      { path: 'cart', component: CartComponent },
      { path: 'product', component: CartComponent },
      { path: ':category', component: CartComponent }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
