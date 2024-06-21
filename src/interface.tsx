
export interface register {
  id : string ;
  name: string;
  email: string;
  phone: string;
  password : string
}

export interface login {
  id : string
  email : string ,
  password : string
}

export interface products {
  id : number,
  title : string,
  price : number,
  description : string,
  category : {id : number, name : string , image : string , creationAt : string , updatedAt : string},
  images : string[] ,
  // rating : {rate : number , count : number},
  quantity : number ,
  total : number
}

export interface dbProduct {
  product : products[],
  email : string | undefined
}

export interface productStart {
  id : number,
  title : string,
  price : number,
  description : string,
  category : {id : number, name : string , image : string , creationAt : string , updatedAt : string},
  images : string[] ,
  // rating : {rate : number , count : number},
  // quantity : number ,
  // total : number
}

