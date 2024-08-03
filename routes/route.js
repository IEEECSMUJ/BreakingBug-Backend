const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');

const {
    sellerRegister,
    sellerLogIn
} = require('../controllers/sellerController.js');

const {
    productCreate,
    getProducts,
    getProductDetail,
    searchProductbyCategory,
    getSellerProducts,
    updateProduct,
    deleteProduct,
    deleteProducts,
    deleteProductReview,
    deleteAllProductReviews,
    addReview,
    getInterestedCustomers,
    getAddedToCartProducts,
} = require('../controllers/productController.js');

const {
    customerRegister,
    customerLogIn,
    getCartDetail,
    customerUpdate // proper naming because we are updating customer not only cart
} = require('../controllers/customerController.js');

const {
    newOrder,
    getOrderedProductsBySeller
} = require('../controllers/orderController.js');


// Seller
router.post('/SellerRegister', sellerRegister);
router.post('/SellerLogin', sellerLogIn);

// Product
router.post('/ProductCreate', authMiddleware, productCreate);
router.get('/getSellerProducts/:id', getSellerProducts); // user can see product even without logging in but for more details, needs to login
router.get('/getProducts', authMiddleware, getProducts);
router.get('/getProductDetail/:id', authMiddleware, getProductDetail);
router.get('/getInterestedCustomers/:id', authMiddleware, getInterestedCustomers);
router.get('/getAddedToCartProducts/:id', authMiddleware, getAddedToCartProducts);

router.put('/ProductUpdate/:id', authMiddleware, updateProduct);
router.put('/addReview/:id', authMiddleware, addReview);

router.get('/searchProduct/:key', authMiddleware, searchProductbyCategory);
router.get('/searchProductbyCategory/:key', authMiddleware, searchProductbyCategory);
router.get('/searchProductbySubCategory/:key', authMiddleware, searchProductbyCategory);

router.delete('/DeleteProduct/:id', authMiddleware, deleteProduct);
router.delete('/DeleteProducts/:id', authMiddleware, deleteProducts);
router.delete ('/deleteProductReview/:id', authMiddleware, deleteProductReview);
router.put ('/deleteAllProductReviews/:id', authMiddleware, deleteAllProductReviews);

// Customer
router.post('/CustomerRegister', customerRegister);
router.post('/CustomerLogin', customerLogIn);
router.get('/getCartDetail', authMiddleware, getCartDetail); // we already have the userId through the jwt tokens
router.put('/CustomerUpdate', authMiddleware, customerUpdate); // we already have the userId through the jwt tokens

// Order
router.post('/newOrder', authMiddleware, newOrder);
router.get('/getOrderedProductsByCustomer/:id', authMiddleware, getOrderedProductsBySeller);
router.get('/getOrderedProductsBySeller/:id', authMiddleware, getOrderedProductsBySeller);

module.exports = router;
