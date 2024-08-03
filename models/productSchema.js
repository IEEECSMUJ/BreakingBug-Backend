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
                    ref: "CUSTOMERS",
                },
                date: {
                    type: Date,
<<<<<<< HEAD
                    default: Date.now(),
=======
                    default: Date.now,
>>>>>>> 2b7ddec0fdeaf5b3c5832516ee1d8fae3edd2787
                },
            },
        ],
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'seller'
        },
    }, { timestamps: false});

module.exports = mongoose.model("Product", productSchema)