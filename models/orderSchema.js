const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
            required: true,
        },
        shippingData: {
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            pinCode: {
                type: Number,
                
            },
            phoneNo: {
                type: Number,
                required: true,
            },
        },
        orderedProducts: [{
            productName: {
                type: String
            },
            price: {
                mrp: {
                    type: Number
                },
                cost: {
                    type: Number
                },
                discountPercent: {
                    type: Number
                }
            },
            subcategory: {
                type: mongoose.Schema.Types.ObjectId,
            },
            productImage: {
                type: String
            },
            category: {
                type: String
            },
            description: {
                type: String
            },
            tagline: {
                type: String
            },
            quantity: {
                type: Number
            },
            seller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'seller'
            },
        }],
        paymentInfo: {
            id: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
        },
        paidAt: {
            type: Date,
            required: true,
        },
        productsQuantity: {
            type: Number,
            required: true,
            default: 0,
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 20,
        },
        orderStatus: {
            type: String,
            required: true,
            
        },
        deliveredAt: Date,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });

module.exports = mongoose.model("order", orderSchema);