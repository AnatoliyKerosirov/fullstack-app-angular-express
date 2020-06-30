export interface User {
  email: string,
  password: string
}

export interface Message {
  message: string
}

export interface Category {
  name: string,
  imageSrc: string,
  user?: string,
  _id?: string
}

export interface Product {
  name: string,
  imageSrc: string,
  idCategory: string,
  idBrand: string,
  cost: number,
  price: number,
  idProduct: number,
  _id?: string,
  quantity?: number
}
