
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
  category : string,
  image : string ,
  rating : {rate : number , count : number},
  quantity : number ,
  total : number
}
