const Product = require("../models/productSchema");
const Customer = require("../models/customerSchema");

// i maintained consistency in api responses by adding .json() in a specific format and also did explained error in a good way like in a good format
const productCreate = async (req, res) => {
    try {
        const product = new Product(req.body);
        let result = await product.save();
        res.json({ status: 'success', data: result });
    } catch (err) {
     
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        let products = await Product.find().populate("seller", "shopName");
        if (products.length > 0) {
            res.json({ status: 'success', data: products });
        } else {
            res.json({ status: 'info', message: "No products found" });
        }
    } catch (err) {
       
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const getSellerProducts = async (req, res) => {
    try {
        let products = await Product.find({ seller: req.params.id });
        if (products.length > 0) {
            res.json({ status: 'success', data: products });
        } else {
            res.json({ status: 'info', message: "No products found" });
        }
    } catch (err) {
   
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const getProductDetail = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
            .populate("seller", "shopName")
            .populate({
                path: "reviews.reviewer",
                model: "customer",
                select: "name"
            });

        if (product) {
            res.json({ status: 'success', data: product });
        } else {
            res.json({ status: 'info', message: "No product found" });
        }
    } catch (err) {
       
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        let result = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json({ status: 'success', data: result });
    } catch (error) {
      
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const addReview = async (req, res) => {
    try {
        const { rating, comment, reviewer } = req.body;
        const productId = req.params.id;

        const product = await Product.findById(productId);

        const existingReview = product.reviews.find(review => review.reviewer.toString() === reviewer);

        if (existingReview) {
            return res.json({ status: 'info', message: "You have already submitted a review for this product." });
        }

        product.reviews.push({
            rating,
            comment,
            reviewer,
            date: new Date(),
        });

        const updatedProduct = await product.save();
        res.json({ status: 'success', data: updatedProduct });
    } catch (error) {
 
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const searchProduct = async (req, res) => {
    try {
        const key = req.params.key;

        let products = await Product.find({
            $or: [
                { productName: { $regex: key, $options: 'i' } },
                { category: { $regex: key, $options: 'i' } },
                { subcategory: { $regex: key, $options: 'i' } }
            ]
        }).populate("seller", "shopName");

        if (products.length > 0) {
            res.json({ status: 'success', data: products });
        } else {
            res.json({ status: 'info', message: "No products found" });
        }
    } catch (err) {

        res.status(500).json({ status: 'error', message: err.message });
    }
};

const searchProductbyCategory = async (req, res) => {
    try {
        const key = req.params.key;

        let products = await Product.find({
            category: { $regex: key, $options: 'i' }
        }).populate("seller", "shopName");

        if (products.length > 0) {
            res.json({ status: 'success', data: products });
        } else {
            res.json({ status: 'info', message: "No products found" });
        }
    } catch (err) {

        res.status(500).json({ status: 'error', message: err.message });
    }
};

const searchProductbySubCategory = async (req, res) => {
    try {
        const key = req.params.key;

        let products = await Product.find({
            subcategory: { $regex: key, $options: 'i' }
        }).populate("seller", "shopName");

        if (products.length > 0) {
            res.json({ status: 'success', data: products });
        } else {
            res.json({ status: 'info', message: "No products found" });
        }
    } catch (err) {
      
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        //  Check if the product was actually deleted before proceeding
        if (!deletedProduct) {
            return res.json({ status: 'info', message: "Product not found" });
        }

        await Customer.updateMany(
            { "cartDetails._id": deletedProduct._id },
            { $pull: { cartDetails: { _id: deletedProduct._id } } }
        );

        res.json({ status: 'success', data: deletedProduct });
    } catch (error) {
  
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const deleteProducts = async (req, res) => {
    try {
        const deletionResult = await Product.deleteMany({ seller: req.params.id });

        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            res.json({ status: 'info', message: "No products found to delete" });
            return;
        }

        const deletedProducts = await Product.find({ seller: req.params.id });

        await Customer.updateMany(
            { "cartDetails._id": { $in: deletedProducts.map(product => product._id) } },
            { $pull: { cartDetails: { _id: { $in: deletedProducts.map(product => product._id) } } } }
        );

        res.json({ status: 'success', data: deletionResult });
    } catch (error) {

    
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const deleteProductReview = async (req, res) => {
    try {
        const { reviewId } = req.body;
        const productId = req.params.id;

        const product = await Product.findById(productId);

        //  Check if the product was found before proceeding
        if (!product) {
            return res.json({ status: 'info', message: "Product not found" });
        }

        const updatedReviews = product.reviews.filter(review => review._id.toString() !== reviewId);

        product.reviews = updatedReviews;

        const updatedProduct = await product.save();
        res.json({ status: 'success', data: updatedProduct });
    } catch (error) {
       
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const deleteAllProductReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        //  Check if the product was found before proceeding

        if (!product) {
            return res.json({ status: 'info', message: "Product not found" });
        }

        product.reviews = [];
        const updatedProduct = await product.save();
        res.json({ status: 'success', data: updatedProduct });
    } catch (error) {
      
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getInterestedCustomers = async (req, res) => {
    try {
        const productId = req.params.id;

        const interestedCustomers = await Customer.find({
            'cartDetails._id': productId
        });

        const customerDetails = interestedCustomers.map(customer => {
            const cartItem = customer.cartDetails.find(item => item._id.toString() === productId);
            if (cartItem) {
                return {
                    customerName: customer.name,
                    customerID: customer._id,
                    quantity: cartItem.quantity,
                };
            }
            return null;
        }).filter(item => item !== null);

        if (customerDetails.length > 0) {
            res.json({ status: 'success', data: customerDetails });
        } else {
            res.json({ status: 'info', message: 'No customers are interested in this product.' });
        }
    } catch (error) {
        
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getAddedToCartProducts = async (req, res) => {
    try {
        const sellerId = req.params.id;

        const customersWithSellerProduct = await Customer.find({
            'cartDetails.seller': sellerId
        });

        const productMap = new Map();
        customersWithSellerProduct.forEach(customer => {
            customer.cartDetails.forEach(cartItem => {
                if (cartItem.seller.toString() === sellerId) {
                    const productId = cartItem._id.toString();
                    if (productMap.has(productId)) {
                        const existingProduct = productMap.get(productId);
                        existingProduct.quantity += cartItem.quantity;
                    } else {
                        productMap.set(productId, {
                            productName: cartItem.productName,
                            quantity: cartItem.quantity,
                            category: cartItem.category,
                            subcategory: cartItem.subcategory,
                            productID: productId,
                        });
                    }
                }
            });
        });

        const productsInCart = Array.from(productMap.values());

        if (productsInCart.length > 0) {
            res.json({ status: 'success', data: productsInCart });
        } else {
            res.json({ status: 'info', message: 'No products from this seller are added to cart by customers.' });
        }
    } catch (error) {
      
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
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
};
