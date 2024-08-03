const router = require('express').Router();

const sellerController = require('../controllers/sellerController.js'); // Updated import
const productController = require('../controllers/productController.js');
const customerController = require('../controllers/customerController.js');
const orderController = require('../controllers/orderController.js'); // Ensure this is correctly imported

// Seller
router.post('/SellerRegister', sellerController.sellerRegister); // Corrected controller
router.post('/SellerLogin', sellerController.sellerLogIn);      // Corrected controller

// Product
router.post('/ProductCreate', productController.productCreate);
router.get('/getSellerProducts/:id', productController.getSellerProducts);
router.get('/getProducts', productController.getProducts);
router.get('/getProductDetail/:id', productController.getProductDetail);
router.get('/getInterestedCustomers/:id', productController.getInterestedCustomers);
router.get('/getAddedToCartProducts/:id', productController.getAddedToCartProducts);

router.put('/ProductUpdate/:id', productController.updateProduct);
router.put('/addReview/:id', productController.addReview);

router.get('/searchProduct/:key', productController.searchProduct);
router.get('/searchProductbyCategory/:key', productController.searchProductbyCategory);
router.get('/searchProductbySubCategory/:key', productController.searchProductbySubCategory);

router.delete('/DeleteProduct/:id', productController.deleteProduct);
router.delete('/DeleteProducts/:id', productController.deleteProducts);
router.delete('/deleteProductReview/:id', productController.deleteProductReview);
router.put('/deleteAllProductReviews/:id', productController.deleteAllProductReviews);

// Customer
router.post('/CustomerRegister', customerController.customerRegister);
router.post('/CustomerLogin', customerController.customerLogIn);
router.get('/getCartDetail/:id', customerController.getCartDetail);
router.put('/CustomerUpdate/:id', customerController.cartUpdate);

// Order
router.post('/newOrder', orderController.newOrder);
router.get('/getOrderedProductsByCustomer/:id', orderController.getOrderedProductsByCustomer);
router.get('/getOrderedProductsBySeller/:id', orderController.getOrderedProductsBySeller);

module.exports = router;
