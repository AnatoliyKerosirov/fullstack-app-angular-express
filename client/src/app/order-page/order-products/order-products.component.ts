import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../shared/services/products.service";

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit {


  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
  }

}
