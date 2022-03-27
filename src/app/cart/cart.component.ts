import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productList: any[];
  productData: any;
  singleProduct = false;
  cartPage = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public prodServ: ProductsService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/home/cart') {
        this.singleProduct = false;
        this.cartPage = true;
        this.productList = this.prodServ.cartList;
      }
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.category) {
        this.singleProduct = false;
        this.getCatProducts(params.category);
      }
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.prodID) {
        this.singleProduct = true;
        this.getProducts(params.prodID);
      }
    });
  }

  getProducts(id) {
    this.prodServ.getOneProduct(id).subscribe((result: any) => {
      this.productData = result;
    });
  }

  getCatProducts(cat) {
    const category = String(cat).replace('_', "'").replace('-', ' ');
    this.prodServ.getCatProducts(category).subscribe((result: any) => {
      this.productList = result;
    });
  }

  viewProduct(id) {
    this.getProducts(id);
    this.singleProduct = true;
  }

  addCart(option) {
    if (this.prodServ.cartList.length) {
      if (!this.prodServ.cartList.filter((res) => res.id === option.id).length) {
        this.prodServ.cartList.push(option);
      }
    } else {
      this.prodServ.cartList.push(option);
    }
  }

}
