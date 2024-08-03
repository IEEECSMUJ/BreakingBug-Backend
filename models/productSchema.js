const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
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
                    ref: "Customer",
                },
                date: {
                    type: Date,
                    default: Date.now()

                },
            },
        ],
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller'
        },
    }, { timestamps: false});

module.exports = mongoose.model("Product", productSchema)