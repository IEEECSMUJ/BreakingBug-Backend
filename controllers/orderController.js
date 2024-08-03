const Order = require('../models/orderSchema.js');

const newOrder = async (req, res) => {
    try {
        const {
            buyer,
            shippingData,
            orderedProducts,
            paymentInfo,
            productsQuantity,
            totalPrice,
        } = req.body;

        const order = await Order.create({
            buyer,
            shippingData,
            orderedProducts,
            paymentInfo,
            paidAt: Date.now(),
            productsQuantity,
            totalPrice,
        });

        return res.status(201).json({ status: 'success', message: 'Order created successfully', data: order }); // Changed response to use json() and follow consistent format

    } catch (err) {
        return res.status(500).json({ status: 'error', message: 'Internal server error', error: err.message }); // Changed response to use json() and follow consistent format
    }
};

const getOrderedProductsByCustomer = async (req, res) => {
    try {
        let orders = await Order.find({ buyer: req.params.id });

        const orderedProducts = orders.reduce((accumulator, order) => {
            return [...accumulator, ...order.orderedProducts]; // did logic to merge ordered products correctly
        }, []);
        
        if (orderedProducts.length > 0) {
            return res.status(200).json({ status: 'success', message: 'Ordered products retrieved successfully', data: orderedProducts }); // Changed response to use json() and follow consistent format
        } else {
            return res.status(404).json({ status: 'fail', message: 'No products found. Check the filtering logic.', data: null }); // Changed response to use json() and follow consistent format
        }
    } catch (err) {
        return res.status(500).json({ status: 'error', message: 'Internal server error', error: err.message }); // Changed response to use json() and follow consistent format
    }
};

const getOrderedProductsBySeller = async (req, res) => {
    try {
        const sellerId = req.params.id;

        const ordersWithSellerId = await Order.find({
            'orderedProducts.seller': sellerId // Changed 'sellerId' to 'seller' to match schema field
        });

        if (ordersWithSellerId.length > 0) {
            const orderedProducts = ordersWithSellerId.reduce((accumulator, order) => {
                order.orderedProducts.forEach(product => {
                    const existingProductIndex = accumulator.findIndex(p => p._id.toString() === product._id.toString());
                    if (existingProductIndex !== -1) {
                        
                        accumulator[existingProductIndex].quantity += product.quantity;
                    } else {
                        
                        accumulator.push(product);
                    }
                });
                return accumulator;
            }, []);
            return res.status(200).json({ status: 'success', message: 'Ordered products by seller retrieved successfully', data: orderedProducts }); // Changed response to use json() and follow consistent format
        } else {
            return res.status(404).json({ status: 'fail', message: 'No products found', data: null }); // Changed response to use json() and follow consistent format
        }
    } catch (err) {
        return res.status(500).json({ status: 'error', message: 'Internal server error', error: err.message }); // Changed response to use json() and follow consistent format
    }
};

module.exports = {
    newOrder,
    getOrderedProductsByCustomer,
    getOrderedProductsBySeller
};
