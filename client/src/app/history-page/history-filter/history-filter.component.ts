import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {Filter} from "../../shared/interfaces";
import {MaterialDatepicker, MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>()
  @ViewChild('start') startDate: ElementRef
  @ViewChild('end') endDate: ElementRef

  idOrder: number

  start: MaterialDatepicker
  end: MaterialDatepicker

  isValid = true

  ngOnDestroy(): void {
    this.start.destroy()
    this.end.destroy()
  }

  ngAfterViewInit(): void {
    this.start = MaterialService.initDatepicker(this.startDate, this.validate.bind(this))
    this.end = MaterialService.initDatepicker(this.endDate, this.validate.bind(this))
  }

  validate() {
    if(!this.start.date || !this.end.date){
      this.isValid = true
      return
    }
    this.isValid = this.start.date < this.end.date
  }

  submitFilter() {
    const filter: Filter ={}
    if(this.idOrder){
      filter.idOrder = this.idOrder
    }
    if(this.start.date){
      filter.startDate = this.start.date
    }
    if(this.end.date){
      filter.endDate = this.and.date
    }
    this.onFilter.emit(filter)
  }

}
