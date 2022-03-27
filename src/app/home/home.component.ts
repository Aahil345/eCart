import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchList: any[];
  optionsList: any[];
  categoryList: any[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public prodServ: ProductsService
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.data.products) {
      this.optionsList = this.activatedRoute.snapshot.data.products.products;
      this.categoryList = this.activatedRoute.snapshot.data.products.categories;
    }
  }

  updateOptions(value) {
    this.searchList = this.optionsList.filter(val => val.title.toLowerCase().includes(value.toLowerCase()));
  }

  onCheck(event) {
    const ID = this.searchList.filter(res => res.title === event.option.value)[0].id;
    this.router.navigate(['/home/product'], { queryParams: { prodID: ID } });
  }

  gotoCat(option) {
    this.router.navigate([`/home/${String(option).replace("'", '_').replace(' ', '-')}`]);
  }

  goCart() {
    this.router.navigate(['/home/cart']);
  }

}
