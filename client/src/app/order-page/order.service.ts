import {Injectable} from "@angular/core";
import {OrderProduct, Product} from "../shared/interfaces";

@Injectable()
export class OrderService {

  public list: OrderProduct[] = []
  public sum = 0

  add(product: Product) {
    const orderProduct: OrderProduct = Object.assign({}, {
      _id: product._id,
      name: product.name,
      price: product.price,
      cost: product.cost,
      quantity: product.quantity
    })
    const candidate = this.list.find(p => p._id === orderProduct._id)
    if(candidate){
      candidate.quantity += orderProduct.quantity
    } else {
      this.list.push(orderProduct)
    }
    this.computeSum()
  }

  remove(orderProduct: OrderProduct) {
    const idx = this.list.findIndex(p => p._id === orderProduct._id)
    this.list.splice(idx, 1)
    this.computeSum()
  }

  clear() {

  }

  private computeSum() {
    this.sum = this.list.reduce((total, item) => {
      return total += item.quantity * item.price
    }, 0)
  }
}
