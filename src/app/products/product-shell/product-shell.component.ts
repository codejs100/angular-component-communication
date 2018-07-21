import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
    pageTitle: string = 'Products';
    monthCount: number;

    constructor(private _productService: ProductService) { }

    ngOnInit() {
        this._productService.productChangeObservable.subscribe(
            (data) => {
                if(data) {
                    let start = new Date(data.releaseDate);
                    let end = new Date();
                    this.monthCount = (end.getMonth() - start.getMonth()) + (12 * (end.getFullYear() - start.getFullYear()));
                } else {
                    this.monthCount = 0;
                }
            }
        )
    }

}
