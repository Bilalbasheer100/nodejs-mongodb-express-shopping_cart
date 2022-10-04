var express = require('express');
var productHelpers = require('../helpers/product-helpers');
var router = express.Router();
const adminHelpers=require('../helpers/admin-helpers');


const verifyALogin=function(req,res,next){
  if(req.session.admin.loggedIn){
    next()
  }else{
    res.redirect("/adminLogin")
  }
}

/* GET users listing. */
router.get('/', verifyALogin,function(req, res, next) {
  let admin=req.session.admin
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{admin:true,products,admin})

  })
  
  
  
});
router.get('/add-product', verifyALogin,(req,res)=>{
  res.render('admin/add-product',{admin:true})
})
router.post('/add-product',(req,res)=>{
  
  productHelpers.addProduct(req.body,(id)=>{
    let Image=req.files.Image
    console.log(id);
    Image.mv('./public/product-images/'+id+'.jpeg',(err)=>{
      if(!err){
        res.render("admin/add-product",{admin:true})
      }else{
        console.log(err);
      }
    })
    
  })
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id 
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')

  })

})
router.get('/edit-product/:id',verifyALogin,async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{admin:true,product})

})
router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id);
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image=req.files.Image
      image.mv('./public/product-images/'+id+'.jpeg')
      

    }
  })
})

router.get('/adminLogin',function(req,res){
  if(req.session.admin){
    res.redirect("/")
  }
  else{
    
    res.render("admin/login",{"loginErr":req.session.adminLoginErr})
    req.session.adminLoginErr=false
  }
 
})

router.post('/adminLogin',(req,res)=>{
  adminHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      
      console.log("Admin in successfully loged in>>>>>>>>>>><<<<<<<<<<");
      req.session.admin=response.admin
      req.session.admin.loggedIn=true
      res.redirect('/admin')
    }
    else{
      req.session.adminLoginErr=true
      res.redirect('/admin/adminLogin') 
    }
  })
})


// router.get('/adminSignup',(req,res)=>{
//   res.render('admin/signup')
// })
// router.get('/adminSignup',(req,res)=>{
//   res.render('admin/signup')
// })

// router.post('/adminSignup',(req,res)=>{
//   console.log(req.body);
//   adminHelpers.doSignup(req.body).then((response)=>{
//     console.log(response);
//     console.log('hii');
    
//     req.session.admin=response
//     req.session.admin.loggedIn=true
//     res.redirect('/admin/')

//   })
// })





router.get("/adminLogout",function(req,res){
  req.session.admin=null
  //req.session.admin.loggedIn=false
  //req.session.admin.destroy();
  res.redirect("/admin/adminLogin")
})

router.get("/allOrders",verifyALogin,async function(req,res){
  let orders = await adminHelpers.getUserOrders(req.session)
  res.render("admin/all-orders",{admin:req.session.admin, orders})
})

router.get("/allUsers",verifyALogin,async (req,res)=>{
  let users=await adminHelpers.getAllUsers(req.session)
  res.render("admin/all-users",{admin:true,users})
})



module.exports = router;

