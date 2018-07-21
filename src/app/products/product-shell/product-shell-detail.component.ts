import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';

    /*
        Commenting code Passing values to component by change detection when property is bound to template
    */
    //get product() {
    //     return this.productService.currentProduct;
    // }

    product: IProduct | null;
    private _sub: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this._sub = this.productService.productChangeObservable.subscribe(
            (data) => this.product = data
        );
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }

}
