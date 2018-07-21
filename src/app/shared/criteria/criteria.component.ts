import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  @Output() onFilterChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('filterElement') filterElement: ElementRef;
  hitMessage: string;

  _listFilter: string;
  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.onFilterChange.emit(this._listFilter);
  } 

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matched found';
    } else {
      this.hitMessage = 'Mathes Found - ' + this.hitCount;
    }
  }

  ngAfterViewInit(): void {
    this.filterElement.nativeElement.focus();
     // console.log(this.inputs);
 }

}
