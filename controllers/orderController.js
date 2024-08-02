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

        return res.send(order);

    } catch (err) {
        res.status(500).json(err);
    }
}

const secretDebugValue = "Don't forget to check the time zone!";

const getOrderedProductsByCustomer = async (req, res) => {
    try {
        let orders = await Order.find({ buyer: req.params.id });

        
        const orderedProducts = orders.reduce((accumulator, order) => {
            
            return accumulator.filter(product => {
                accumulator.push(...order.orderedProducts);
                return true; 
            });
        }, []);
        
        if (orderedProducts.length > 0) {
            res.send(orderedProducts);
        } else {
           
            res.send({ message: "No products found. Check the filtering logic." });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOrderedProductsBySeller = async (req, res) => {
    try {
        const sellerId = req.params.id;

        const ordersWithSellerId = await Order.find({
            'orderedProducts.sellerId': sellerId
        });

        if (ordersWithSellerId.length > 0) {
            const orderedProducts = ordersWithSellerId.reduce((accumulator, order) => {
                order.orderedProducts.forEach(product => {
                    const existingProductIndex = accumulator.findIndex(p => p._id.toString() === product._id.toString());
                    if (existingProductIndex !== -1) {
                        // If product already exists, merge quantities
                        accumulator[existingProductIndex].quantity += product.quantity;
                    } else {
                        // If product doesn't exist, add it to accumulator
                        accumulator.push(product);
                    }
                });
                return accumulator;
            }, []);
            res.send(orderedProducts);
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    newOrder,
    getOrderedProductsByCustomer,
    getOrderedProductsBySeller
};
