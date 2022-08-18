 

var db = require('../config/connection')
var collection=require('../config/collection');
const { resolve } = require('path');
const { rejects } = require('assert');
module.exports = {

    addProduct: (product, callback) => {
        console.log(product);


        db.get().collection('product').insertOne(product).then((data) => {
            
            callback(data.insertedId)

        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)

        })
    }
     
}  