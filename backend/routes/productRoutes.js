const express = require('express');
const router = express.Router();
const {getProducts,getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/productController');
const {protect,admin} = require('../middlewares/authMiddleware');


router.get('/',getProducts);

router.get('/:id', getProductById);

router.post('/',[protect,admin], createProduct);

router.put('/:id', [protect, admin], updateProduct);

router.delete('/:id',[protect, admin], deleteProduct );
module.exports = router;


// It sets up a new express router
// it imports the getProducts function
// it tells the router that whenever it receives a GET requests at its base URL (/),
// it should execute the getProducts function.

//'/:id' defines a route that accepts a parameter. The colon : tells Express that this part of the URL is a variable
// in above we used the concept of variable routing

// router.post('/',[protect,admin], createProduct);
// This tells Express to run protect first. If it succeeds, it will run admin. If that also succeeds,
//  it will finally run createProduct.

