import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../../shared/services/products.service";
import {Category, Product} from "../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('inputProductImage') inputProductImageRef: ElementRef
  @Input('category') category: Category
  @ViewChild('modal') modalRef: ElementRef

  products: Product[]
  loading = false
  modal: MaterialInstance
  form: FormGroup
  image: File
  imagePreview: string | ArrayBuffer = ''
  categories$: Observable<Category[]>
  productId = null

  constructor(private productsService: ProductsService,
              private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      idProduct: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*')]),
      price: new FormControl(1, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*')]),
      cost: new FormControl(0.5, [Validators.required, Validators.min(0.1), Validators.pattern('^\\d+\\.?\\d*')]),
      brandName: new FormControl(null),
      idBrand: new FormControl(null),
      categoryName: new FormControl(this.category.name),
      idCategory: new FormControl(this.category._id),
      imageSrc: new FormControl(null, [Validators.required])
    })
    if (!this.category) { //Если нет категории, загружаем список категорий
      this.categories$ = this.categoriesService.fetch()
    } else {

    }

    this.loading = true
    console.log(this.category)
    this.productsService.fetch(this.category._id)
      .subscribe(
        products => {
          this.products = products
          console.log('Products: ', this.products)
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

  onSelectProduct(product: Product): void {
    this.productId = product._id
    this.form.patchValue({
      name: product.name,
      price: product.price,
      cost: product.cost,
      categoryName: this.category.name,
      idCategory: product.idCategory,
      idBrand: product.idBrand,
      idProduct: product.idProduct
    })
    this.imagePreview = product.imageSrc
    MaterialService.updateTextInput()
    this.modal.open()
  }

  addProduct(): void {
    this.productId = null
    this.imagePreview = ''
    this.form.reset()
    this.form.patchValue({categoryName: this.category.name, idCategory: this.category._id})
    MaterialService.updateTextInput()
    this.modal.open()
  }

  onCancel(): void {
    this.modal.close()
  }

  onSubmit(): void {
    this.form.disable()
    const newProduct: Product = {
      idProduct: this.form.value.idProduct,
      name: this.form.value.name,
      price: this.form.value.price,
      cost: this.form.value.cost,
      idBrand: this.form.value.idBrand,
      idCategory: this.form.value.idCategory,
      imageSrc: this.image ? this.image.name : ''
    }

    const completed = () => {
      this.modal.close()
      this.form.reset()
      this.form.enable()
    }

    if (this.productId) {
      newProduct.imageSrc = this.imagePreview.toString()
      newProduct._id = this.productId
      this.productsService.update(newProduct).subscribe(
        product => {
          const idx = this.products.findIndex(p => p._id === product._id)
          this.products[idx] = product
          MaterialService.toast('Изменеия товара сохранены!')
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        completed
      )
    } else {
      this.productsService.create(newProduct, this.image).subscribe(
        product => {
          MaterialService.toast('Товар создан!')
          this.products.push(product)
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        completed
      )
    }
  }

  onDeleteProduct(event: Event, product: Product): void {
    event.stopPropagation()
    const decision = window.confirm(`Хочешь удалить "${product.name}"?`)
    if (decision) {
      this.productsService.delete(product).subscribe(
        response => {
          const idx = this.products.findIndex(p => p._id === product._id)
          this.products.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  triggerClick() {
    this.inputProductImageRef.nativeElement.click()
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  onSelectCategory(): void {

  }

  onSelectBrand(): void {

  }

}
