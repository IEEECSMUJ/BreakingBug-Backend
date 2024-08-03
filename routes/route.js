const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');
// i added middleware where ever i found authentication must be there
// updated the endpoints because as per good practices the routes should be in small letter and i added more meaningfull endpoints

// /:key should be changed to /:id for consistency but for now i am leaving it as it is
const {
    sellerRegister,
    sellerLogIn
} = require('../controllers/sellerController.js'); // changed to sellerController

const {
    productCreate,
    getProducts,
    getSellerProducts,
    getProductDetail,
    updateProduct,
    addReview,
    searchProduct,
    searchProductbyCategory,
    searchProductbySubCategory,
    deleteProduct,
    deleteProducts,
    deleteProductReview,
    deleteAllProductReviews,
    getInterestedCustomers,
    getAddedToCartProducts,
} = require('../controllers/productController.js'); // added searchProduct and searchProductbySubCategory

const {
    customerRegister,
    customerLogIn,
    getCartDetail,
    cartUpdate
} = require('../controllers/customerController.js');

const {
    newOrder,
    getOrderedProductsByCustomer,
    getOrderedProductsBySeller
} = require('../controllers/orderController.js'); // added getOrderedproductbyCustomer


router.post('/sellers/register', sellerRegister); 
router.post('/sellers/login', sellerLogIn); 


router.post('/products', authMiddleware, productCreate); 
router.get('/products/seller/:id', authMiddleware, getSellerProducts); 
router.get('/products', getProducts); 
router.get('/products/:id', getProductDetail); 
router.get('/products/interested-customers/:id', authMiddleware, getInterestedCustomers); 
router.get('/products/added-to-cart/:id', authMiddleware, getAddedToCartProducts); 

router.put('/products/:id', authMiddleware, updateProduct); 
router.put('/products/reviews/:id', authMiddleware, addReview); 

router.get('/products/search/:key', searchProduct); 
router.get('/products/search/category/:key', searchProductbyCategory); 
router.get('/products/search/subcategory/:key', searchProductbySubCategory); 
router.delete('/products/:id', authMiddleware, deleteProduct); 
router.delete('/products/seller/:id', authMiddleware, deleteProducts); 
router.delete('/products/reviews/:id', authMiddleware, deleteProductReview); 
router.delete('/products/reviews/all/:id', authMiddleware, deleteAllProductReviews); 


router.post('/customers/register', customerRegister); 
router.post('/customers/login', customerLogIn); 
router.get('/customers/cart/:id', authMiddleware, getCartDetail); 
router.put('/customers/cart/:id', authMiddleware, cartUpdate); 


router.post('/orders', authMiddleware, newOrder); 
router.get('/orders/customer/:id', authMiddleware, getOrderedProductsByCustomer); 
router.get('/orders/seller/:id', authMiddleware, getOrderedProductsBySeller); 

module.exports = router;
