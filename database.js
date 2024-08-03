const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURL = process.env.MONGO_URL;

console.log(`
IEEE CS MUJ Breaking Bug - Database set up.

Setting up the database. This might take a moment.
Note: It worked if it ends with "Dummy data created!"
`);

//made a function connectToDB to connect to DB and create Dummy Data
const connectToDB = ()=>{
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    createDummyData();  
  })
  .catch(err => console.log(err));
}
// why to define schemas again we can just import the models
const { Customer, Order, Product, Seller } = require('./path/to/models');

//  i also added more default things to fill in db 
async function createDummyData() {

  const seller = new Seller({
    name: "John's Shop",
    email: "john@example.com",
    password: "password123",
    shopName: "JohnsShop"
  });
  await seller.save();


  const customer = new Customer({
    name: "Jane Doe",
    email: "jane@example.com",
    password: "password123",
    shippingData: {
      address: "123 Main St",
      city: "Anytown",
      state: "Anystate",
      country: "USA",
      pinCode: 12345,
      phoneNo: 1234567890
    }
  });
  await customer.save();


  const product = new Product({
    productName: "Sample Product",
    price: {
      mrp: 100,
      cost: 90,
      discountPercent: 10
    },
    subcategory: "Sample Subcategory",
    productImage: "sample.jpg",
    category: "Sample Category",
    description: "This is a sample product.",
    tagline: "Best product ever!",
    quantity: 45, 
    seller: seller._id
  });
  await product.save();


  const order = new Order({
    buyer: customer._id,
    shippingData: customer.shippingData,
    orderedProducts: [{
      productName: product.productName,
      price: product.price,
      subcategory: product.subcategory,
      productImage: product.productImage,
      category: product.category,
      description: product.description,
      tagline: product.tagline,
      quantity: 1,
      seller: seller._id
    }],
    paymentInfo: {
      id: "payment123",
      status: "Paid"
    },
    paidAt: new Date(),
    productsQuantity: 1,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 90,
    orderStatus: "Processing"
  });
  await order.save();

  console.log('Dummy data created!');
}
// exported the connectToDB function

module.exports = connectToDB