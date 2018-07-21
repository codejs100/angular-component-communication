import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '../../../node_modules/@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParamsService } from './product-params.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

    // @ViewChild('filterElement') filterElement: ElementRef;
    // @ViewChildren('inputElement, filterElement') inputs: QueryList<ElementRef>;

    //  @ViewChild(NgModel) input: NgModel;
/*
    _ngModel: NgModel;
    private _sub: Subscription;

    get fiterInput() {
        return this._ngModel;
    }
    @ViewChild(NgModel)
    set filterInput(value: NgModel) {
        this._ngModel = value;
        if(this._ngModel && !this._sub) {
            this._sub = this._ngModel.valueChanges.subscribe(
                () => this.performFilter(this.listFilter)
            );
        }
        

    }
*/
    pageTitle: string = 'Product List';
    // _listFilter: string;
    // listFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    get showImage() {
        return this._productParamService.showImage;
    }

    set showImage(value: boolean) {
        this._productParamService.showImage = value;
    }

    // get listFilter() {
    //     return this._listFilter;
    // }
    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     this.performFilter(this._listFilter);
    // }


    displayDetail: boolean = true;
    filterValue: string;
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

    constructor(private productService: ProductService,
                private _productParamService: ProductParamsService) {
     }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.filterComponent.listFilter = this._productParamService.filterBy;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        // this.filterElement.nativeElement.focus();
        // console.log(this.inputs);

        // this.input.valueChanges.subscribe(
        //     () => this.performFilter(this.listFilter)
        // );
        // this.filterValue = this.filterComponent.listFilter;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onFilterChange(search: string) {
        this._productParamService.filterBy = search;
        this.performFilter(search);
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
