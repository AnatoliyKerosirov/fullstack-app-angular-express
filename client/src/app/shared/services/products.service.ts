import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(private http: HttpClient){

  }

  fetch(categoryId: string): Observable<Product[]>{
    return this.http.get<Product[]>(`/api/category/products/${categoryId}`)
  }
}
