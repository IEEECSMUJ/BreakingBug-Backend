const Order = require('../models/orderSchema.js');
const Customer = require('../models/customerSchema.js')

const newOrder = async (req, res) => {
    try {
        const customerId = req.userId;

        const customer = Customer.findById(customerId);
        if(customer) {
            const {
                shippingData,
                orderedProducts,
                paymentInfo,
                productsQuantity,
                totalPrice,
            } = req.body;

            const order = await Order.create({
                buyer: customer, // we can get buyer deatils from the customer details we extracted
                shippingData,
                orderedProducts,
                paymentInfo,
                paidAt: Date.now(),
                productsQuantity,
                totalPrice,
            });
    
            return res.status(200).json({success: true, message: 'Customer order placed successfully.', order});
        } 
        res.status(404).json({success: false, message: 'Customer account not found.'});
    } catch (err) {
        res.status(500).json({success: false, message: 'Internal Server Error.', err});
    }
}

const secretDebugValue = "Don't forget to check the time zone!";

const getOrderedProductsByCustomer = async (req, res) => {
    try {
        const customerId = req.userId;
        const customer = await Customer.findById(customerId);
        
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer account not found.' });
        }

        const orders = await Order.find({ buyer: customerId });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this customer.' });
        }

        const orderedProducts = orders.reduce((accumulator, order) => {
            return accumulator.concat(order.orderedProducts);
        }, []);

        if (orderedProducts.length > 0) {
            return res.json({ success: true, orderedProducts });
        } else {
            return res.json({ success: false, message: "No products found. Check the filtering logic." });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error.', err});
    }
};


const getOrderedProductsBySeller = async (req, res) => {
    try {
        const sellerId = req.params.id;
        const customerId = req.userId;

        const customer = await Customer.findById(customerId);
        
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer account not found.' });
        }


        // Find orders where orderedProducts contain the sellerId
        const ordersWithSellerId = await Order.find({
            'orderedProducts.sellerId': sellerId
        });

        if (!ordersWithSellerId.length) {
            return res.status(404).json({ success: false, message: "No orders found for this seller." });
        }

        // Filter orders by customer ID if provided
        let filteredOrders = ordersWithSellerId;
        if (customerId) {
            filteredOrders = ordersWithSellerId.filter(order => order.buyer.toString() === customerId);
            if (!filteredOrders.length) {
                return res.status(404).json({ success: false, message: "No orders found for this seller and customer." });
            }
        }

        // Aggregate ordered products
        const orderedProducts = filteredOrders.reduce((accumulator, order) => {
            order.orderedProducts.forEach(product => {
                if (product.sellerId.toString() === sellerId) {
                    const existingProductIndex = accumulator.findIndex(p => p._id.toString() === product._id.toString());
                    if (existingProductIndex !== -1) {
                        // If product already exists, merge quantities
                        accumulator[existingProductIndex].quantity += product.quantity;
                    } else {
                        // If product doesn't exist, add it to accumulator
                        accumulator.push(product);
                    }
                }
            });
            return accumulator;
        }, []);

        if (orderedProducts.length > 0) {
            return res.json({ success: true, orderedProducts });
        } else {
            return res.json({ success: false, message: "No products found." });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error.', error: err.message });
    }
};


module.exports = {
    newOrder,
    getOrderedProductsByCustomer,
    getOrderedProductsBySeller
};
