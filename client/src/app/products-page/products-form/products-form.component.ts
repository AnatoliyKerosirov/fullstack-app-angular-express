import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../../shared/services/products.service";
import {Product} from "../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef
  products: Product[]
  loading = false
  modal: MaterialInstance

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.productsService.fetch(this.categoryId)
      .subscribe(
        products => {
          this.products = products
          this.loading = false
        }
      )
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectProduct(product: Product){
    this.modal.open()
  }

  addProduct(){
    this.modal.open()
  }

  onCancel(){
    this.modal.close()
  }

}
