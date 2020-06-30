import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Product} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(private http: HttpClient){

  }

  fetch(categoryId: string): Observable<Product[]>{
    return this.http.get<Product[]>(`/api/category/products/${categoryId}`)
  }

  create(product: Product, image?: File): Observable<Product> {
    const fd = new FormData()
    for(const [key, value] of Object.entries(product)){
      fd.append(key, value)
    }
    if(image){
      fd.append('image', image, image.name)
    }
    return this.http.post<Product>('/api/product', fd)
  }

  update(product: Product, image?: File): Observable<Product> {
    const fd = {...new FormData(), ...product}
    if(image){
      fd.append('image', image, image.name)
    }
    return this.http.patch<Product>(`/api/product/${product._id}`, fd)
  }

  delete(product: Product): Observable<Message> {
    return this.http.delete<Message>(`/api/product/${product._id}`)
  }
}
