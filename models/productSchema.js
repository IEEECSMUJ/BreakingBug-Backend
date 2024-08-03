const mongoose = require("mongoose")

const productSchema =  mongoose.Schema(
    {
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
            type: String
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
            type: Number,
            default: 45
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
                    // #12 ref: "CUSTOMERS" == > ref: "customer"
                    ref: "customer",
                },
                date: {
                    type: Date,
                    // #1 changing default "text" to "Date.now()"
                    default: Date.now(),
                },
            },
        ],
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'seller',
            // #15
            required : true

        },
    }, { timestamps: false});

// #2 changing mongoose method from "mongoose" to "model" (mongoose.model() method) 
module.exports = mongoose.model("product", productSchema)