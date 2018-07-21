import { IProduct } from './../product';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductService } from '../product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectProduct: IProduct;
  private _sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this._sub = this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
    );
    this.productService.productChangeObservable.subscribe(
      (data) => this.selectProduct = data
    );
  }

  selectedProduct(product: IProduct): void {
     /*
        Commenting code Passing values to component by change detection when property is bound to template
    */
    //this.productService.currentProduct = product;
    this.productService.changeProductSelected(product);
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

}
