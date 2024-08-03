const mongoose = require("mongoose");

// Should use new before mongoose.Schema
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Customer",
    },
    cartDetails: [{
        productName: {
            type: String,
        },
        price: {
            mrp: {
                type: Number, // changed to number 
            },
            cost: {
                type: Number,
            },
            discountPercent: {
                type: Number,
            },
        },
        subcategory: {
            type: String,
        },
        productImage: {
            type: String,
        },
        category: {
            type: String,
        },
        description: {
            type: String,
        },
        tagline: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        // Correct the ref value to match the model name exactly
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller', // Changed from SELLER to Seller
        },
    }],
    shippingData: {
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        // country should be a String if it's a country name or code
        country: {
            type: String, // Changed from Number to String
        },
        pinCode: {
            type: Number,
        },
        phoneNo: {
            type: Number,
        },
    }
});

module.exports = mongoose.model("Customer", customerSchema); // Model name should be Customer
