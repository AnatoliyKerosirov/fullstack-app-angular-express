import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrderService} from "./order.service";
import {Order, OrderProduct} from "../shared/interfaces";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  isRoot: boolean
  pending: boolean = false
  oSub: Subscription

  constructor(private router: Router,
              public orderService: OrderService,
              private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngOnDestroy(): void {
    this.modal.destroy()
    if (this.oSub)
      this.oSub.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  openModal() {
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }

  submitOrder() {
    this.pending = true
    const order: Order = {
      listProducts: this.orderService.list.map(item => {
        delete item._id
        return item
      }),
      sum: this.orderService.sum
    }
    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ №${newOrder.idOrder} добавлен`)
        this.orderService.clear()
      },
      error => {
        MaterialService.toast(error.error.message)
      },
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }

  removeProduct(orderProduct: OrderProduct) {
    this.orderService.remove(orderProduct)
  }

}
