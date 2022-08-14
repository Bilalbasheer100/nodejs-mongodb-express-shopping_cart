var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"iphone11",
      category:'mobile',
      description:'this is a good phone',
      Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6UNRmM6BP3iUm_7RBMDKu6DzThdzt1kOBw&usqp=CAU"
    },
    {
      name:"iphonex",
      category:'mobile',
      description:'this is a good phone',
      Image:"https://m.media-amazon.com/images/I/514YMVAc6NL._SX425_.jpg"
    },
    {
      name:"pocof1",
      category:'mobile',
      description:'this is a good phone',
      Image:"https://static.toiimg.com/thumb/resizemode-4,msid-65515912,imgsize-500,width-800/65515912.jpg"
    },
    {
      name:"vivo v9",
      category:'mobile',
      description:'this is a good phone',
      Image:"https://www.gizmochina.com/wp-content/uploads/2018/03/Vivo-V9-600x600.jpg"
    },
  ]
  res.render('index', {products,admin:false});
});

module.exports = router;
