import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs";
import {Order} from "../shared/interfaces";

const STEP = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef: ElementRef
  isFilterVisible = false
  tooltip: MaterialInstance
  oSub: Subscription
  orders: Order[] = []
  offset = 0
  limit = STEP
  loading = false
  reloading = false
  noMoreOrders= false

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.reloading = true
    this.fetch()
  }

  ngOnDestroy(): void {
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  loadMore() {
    this.loading = true
    this.offset += STEP
    this.fetch()
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit
    }
    this.oSub = this.ordersService.fetch(params).subscribe(
      orders => {
        this.orders = this.orders.concat(orders)
        this.noMoreOrders = orders.length < STEP
      },
      error => {MaterialService.toast(error.error.message)},
      () => {
        this.loading = false
        this.reloading = false
      }
    )
  }


}
