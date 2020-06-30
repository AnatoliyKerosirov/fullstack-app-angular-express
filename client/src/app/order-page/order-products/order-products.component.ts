import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../shared/services/products.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {Product} from "../../shared/interfaces";
import {map, switchMap} from "rxjs/operators";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit {
  products$: Observable<Product[]>

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.products$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.productsService.fetch(params['id'])
          }
        ),
        map(
          (products: Product[]) => {
            return products.map(product => {
              product.quantity = 1
              return product
            })
          }
        )
      )
  }

  addProductToOrder(product: Product){
    this.orderService.add(product)
  }

}
