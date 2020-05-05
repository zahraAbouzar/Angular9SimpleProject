import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators'
import { ProductService } from './product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService, private router: ActivatedRoute) {
  }

  confirmationString: string = 'عملیات با موفقیت انجام شد !!';
  isAdded: boolean = false;
  productObj: object = [];
  companyId: number;
  products = [];

  addNewProduct = function (product) {
    this.productObj = {
      id: product.id,
      name: product.name,
      companyId: this.companyId,
      createDate: product.createDate,
      status: product.status
    };

    this.productService.addProduct(this.productObj)
      .subscribe((res: Response) => {
        this.isAdded = true;
        this.fetchData();
      });
  };

  getstatusName(x) {
    if (x.status == 1)
      return 'فعال';
    else return 'غیرفعال';
  }

  fetchData = function () {
    this.productService.fetchData()
      .subscribe((res: Response) => {
        this.products = res;
        this.router.queryParams.subscribe(x => {
          this.companyId = +(x.companyId);
          this.products = this.products.filter(x => x.companyId == this.companyId).map(x => { x.statusName = this.getstatusName(x); return x; })
        });

      });
  };

  ngOnInit() {
    this.fetchData();
  }
}



