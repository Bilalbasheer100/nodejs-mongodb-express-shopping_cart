var express = require('express');
var productHelpers = require('../helpers/product-helpers');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{admin:true,products})

  })
  
  
  
});
router.get('/add-product',(req,res)=>{
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  
  productHelpers.addProduct(req.body,(id)=>{
    let Image=req.files.Image
    console.log(id);
    Image.mv('./public/product-images/'+id+'.jpeg',(err)=>{
      if(!err){
        res.render("admin/add-product")
      }else{
        console.log(err);
      }
    })
    
  })
})

module.exports = router;

