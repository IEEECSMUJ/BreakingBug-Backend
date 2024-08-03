const mongoose = require("mongoose");

// added new before mongoose.Schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true, // Added required attribute for consistency
    },
    price: {
        mrp: {
            type: Number,
            required: true, // Added required attribute for consistency
        },
        cost: {
            type: Number,
            required: true, // Added required attribute for consistency
        },
        discountPercent: {
            type: Number,
            default: 0, // Added default value for consistency
        }
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
        default: 45, 
    },
    reviews: [
        {
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            },
            reviewer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Customer", // Changed to 'Customer' 
            },
            date: {
                type: Date,
                default: Date.now, // Changed to Date.now 
            },
        },
    ],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller', // Capitalized 'Seller' 
    },
}, { timestamps: true }); // Changed the timestamps to true


module.exports = mongoose.model("Product", productSchema); // Changed to 'Product'
