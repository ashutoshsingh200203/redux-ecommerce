import { register,dbProduct } from "./interface";

let db:IDBDatabase; 

export enum Stores{
    Users="users",
    cartProduct = "products"
} 




export const initDB=():Promise<IDBDatabase>=>{
  return new Promise((resolve,reject)=>{
      const request=indexedDB.open("shopify",1);
      request.onupgradeneeded=()=>{
          db=request.result;
          if(!db.objectStoreNames.contains(Stores.Users)){
             const objectStore =  db.createObjectStore(Stores.Users,{
                  keyPath:"email",
                  autoIncrement:true,
              })
              objectStore.createIndex("email", "email", { unique: true });
              objectStore.createIndex("name", "name", { unique: false });
              objectStore.createIndex("password", "password", { unique: true });
              objectStore.createIndex("phone", "phone", { unique: false });
          }
          if(!db.objectStoreNames.contains(Stores.cartProduct)){
            const objectStore =  db.createObjectStore(Stores.cartProduct,{
                 keyPath:"email",
                 autoIncrement:true,
             })
             objectStore.createIndex("email", "email", { unique: true });
             objectStore.createIndex("products", "name", { unique: false })
         }
      }
      request.onsuccess=()=>{
          db=request.result;
          resolve(db)
      }
      request.onerror=()=>{
          reject(request.error)
      }
  })
}

export const addProducts = (data : Omit<dbProduct,"email">) : Promise<void> =>{
    return new Promise((resolve,reject)=>{
        const transaction=db.transaction(Stores.cartProduct,"readwrite");
        const store=transaction.objectStore(Stores.cartProduct)
        const request=store.add(data);
        request.onsuccess=()=>{
            console.log(`data added with email ${request.result}`);
            resolve() 
        }
        request.onerror=()=>{
            reject(request.error)
        }
    })
}

export const getProducts = (email : string) : Promise<dbProduct> =>{
    return new Promise((resolve,reject)=>{
      console.log(db)
       const request = db.transaction(Stores.cartProduct).objectStore(Stores.cartProduct).get(email)
       request.onsuccess=()=>{
           console.log(`Products get with the email ${request.result}`);
           const updated = request.result ;
           resolve(updated)
       }
       request.onerror=()=>{
           reject(request.error)
       }
    })
  }

export const addUser=(user:Omit<register,"id">):Promise<void>=>{
  return new Promise((resolve,reject)=>{
      const transaction=db.transaction(Stores.Users,"readwrite");
      const store=transaction.objectStore(Stores.Users)
      const request=store.add(user);
      request.onsuccess=()=>{
          console.log(`User added with id ${request.result}`);
          resolve()
          
      }
      request.onerror=()=>{
          reject(request.error)
      }
  })
}

export const getUser = (email : string) : Promise<register> =>{
  return new Promise((resolve,reject)=>{
    console.log(db)
     const request = db.transaction(Stores.Users).objectStore(Stores.Users).get(email)
     request.onsuccess=()=>{
         console.log(`User get with the email ${request.result}`);
         const updated = request.result ;
         resolve(updated)
     }
     request.onerror=()=>{
         reject(request.error)
     }
  })
}