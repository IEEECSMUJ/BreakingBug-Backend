# Breaking Bug - Backend Repository

<img src="https://images.prismic.io/ieeemuj/Zqu58B5LeNNTxuyE_BreakingBugBanner.png?auto=format,compress" alt="Breaking Bug Poster">

## Table of Content
- [Introduction](#introduction)
- [Pre-requisites](#pre-requisites)
- [How to get started?](#how-to-get-started)
- [Setting up the project](#setting-up-the-project)
- [Project Information](#project-information)
- [Postman Collection](#postman-collection)
- [Database Schema](#database-schema)
- [Credits](#made-by-ieee-computer-society--manipal-university-jaipur)

### Introduction
This repository contains the backend code for the Breaking Bug event. The event is organized by IEEE Computer Society, Manipal University Jaipur.\

Breaking Bug is an electrifying virtual showdown for tech enthusiasts and coding maestros! An exciting and challenging event where participants step into the shoes of skilled developers and problem-solvers! In this unique competition, their mission is to identify and fix bugs in a GitHub repository across three diverse domains: Frontend, Backend, and Machine Learning (ML).


### Pre-requisites
- [Node.js](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/)
- [Git](https://git-scm.com/downloads)


### How to get started?

- Fork the repository.
- Clone the repository in your local system.
- Follow the steps mentioned in the [Setting up the project](#setting-up-the-project) section.
- Once you have set up the project, you can start working on the issues.
- After you have made the changes, push the code to your forked repository.
- Put the link to your forked repository in the Google Forms which will be shared with you.


### Setting up the project

Fork the repository by clicking on the `Fork` button on the top right corner of the page.

Clone the repository in your local system.
```bash
git clone https://github.com/<your-github-username>/BreakingBug-Backend.git
```

Navigate to the project directory.
```bash
cd BreakingBug-Backend
```

Install the dependencies.
```bash
npm install
```

Create a `.env` file in the root directory of the project and add the following environment variables.
```bash
PORT=3000
MONGO_URL=<Your MongoDB URI>
SECRET_KEY=<Your JWT Secret>
```

Start the server.
```bash
npm start
```

The server will start running on `http://localhost:5000`.

Once this is done, set up the database. For that, run the following command:
```bash
node database.js
```

This should make the required schemas in the database. You can now start working on the issues.

### Project Information

The maximum attainable points for this project are 1000. The points are distributed as follows:

| Difficulty Level | Points | Count | Total |
|------------------|--------|-------|-------|
| Very easy        | 10     | 3     | 30    |
| Easy             | 20     | 13    | 260   |
| Medium           | 30     | 15    | 450   |
| Hard             | 40     | 4     | 160   |
| Easter egg       | 50     | 2     | 100   |
| Total            |        |       | 1000  |

<img src="https://images.prismic.io/ieeemuj/Zqz7AkaF0TcGIp4y_BackedPieChart.png?auto=format,compress" alt="Pie Chart" width="300px">


### Postman Collection
Postman is a collaboration platform for API development. You can use the following Postman collection to test the API endpoints.\
For a tutorial on how to use Postman, you can refer to the following [link](https://learning.postman.com/docs/getting-started/introduction/).\
Click on the button below to import the Postman collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/lunar-module-architect-35000897/workspace/breaking-bug-backend)


### Database Schema
The database schema for the project is as follows:\
You can also view the schema in the [models](models) directory in the project.
- [customerSchema.js](models/customerSchema.js)
- [orderSchema.js](models/orderSchema.js)
- [productSchema.js](models/productSchema.js)
- [sellerSchema.js](models/sellerSchema.js)

Here is the schema listed in a tabular format:

### `1. Customer Schema`

| Field        | Type                       | Required | Unique | Default  | Subfields                                                                                                                                  |
|--------------|----------------------------|----------|--------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name         | String                     | Yes      | No     | -        | -                                                                                                                                          |
| email        | String                     | Yes      | Yes    | -        | -                                                                                                                                          |
| password     | String                     | Yes      | No     | -        | -                                                                                                                                          |
| role         | String                     | No       | No     | Customer | -                                                                                                                                          |
| cartDetails  | [Array](#cart-details)     | No       | No     | -        | productName, price (mrp, cost, discountPercent), subcategory, productImage, category, description, tagline, quantity, seller (ref: seller) |
| shippingData | [Object](#shipping-schema) | No       | No     | -        | address, city, state, country, pinCode, phoneNo                                                                                            |

### `2. Order Schema`

| Field            | Type                           | Required | Unique | Default    | Subfields                                                                                                                                  |
|------------------|--------------------------------|----------|--------|------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| buyer            | ObjectId (ref: customer)       | Yes      | No     | -          | -                                                                                                                                          |
| shippingData     | [Object](#shipping-schema)     | Yes      | No     | -          | address, city, state, country, pinCode, phoneNo                                                                                            |
| orderedProducts  | [Array](#3-product-schema)     | No       | No     | -          | productName, price (mrp, cost, discountPercent), subcategory, productImage, category, description, tagline, quantity, seller (ref: seller) |
| paymentInfo      | [Object](#payment-info-schema) | Yes      | No     | -          | id, status                                                                                                                                 |
| paidAt           | Date                           | Yes      | No     | -          | -                                                                                                                                          |
| productsQuantity | Number                         | Yes      | No     | 0          | -                                                                                                                                          |
| taxPrice         | Number                         | Yes      | No     | 0          | -                                                                                                                                          |
| shippingPrice    | Number                         | Yes      | No     | 0          | -                                                                                                                                          |
| totalPrice       | Number                         | Yes      | No     | 0          | -                                                                                                                                          |
| orderStatus      | String                         | Yes      | No     | Processing | -                                                                                                                                          |
| deliveredAt      | Date                           | No       | No     | -          | -                                                                                                                                          |
| createdAt        | Date                           | No       | No     | Date.now() | -                                                                                                                                          |

### `3. Product Schema`

| Field        | Type                     | Required | Unique | Default | Subfields                                       |
|--------------|--------------------------|----------|--------|---------|-------------------------------------------------|
| productName  | String                   | No       | No     | -       | -                                               |
| price        | [Object](#price-schema)  | No       | No     | -       | mrp, cost, discountPercent                      |
| subcategory  | String                   | No       | No     | -       | -                                               |
| productImage | String                   | No       | No     | -       | -                                               |
| category     | String                   | No       | No     | -       | -                                               |
| description  | String                   | No       | No     | -       | -                                               |
| tagline      | String                   | No       | No     | -       | -                                               |
| quantity     | Number                   | No       | No     | 1       | -                                               |
| reviews      | [Array](#reviews-schema) | No       | No     | -       | rating, comment, reviewer (ref: customer), date |
| seller       | ObjectId (ref: seller)   | No       | No     | -       | -                                               |

### `4. Seller Schema`

| Field         | Type          | Required | Unique | Default   |
|---------------|---------------|----------|--------|-----------|
| name          | String        | Yes      | No     | -         |
| email         | String        | Yes      | Yes    | -         |
| password      | String        | Yes      | No     | -         |
| role          | String        | No       | No     | Seller    |
| shopName      | String        | Yes      | Yes    | -         |


Here are the sub-schemas used in the above schemas:

#### Cart Details

| Field           | Type                    | Required | Unique | Default |
|-----------------|-------------------------|----------|--------|---------|
| productName     | String                  | No       | No     | -       |
| price           | [Object](#price-schema) | No       | No     | -       |
| mrp             | Number                  | No       | No     | -       |
| cost            | Number                  | No       | No     | -       |
| discountPercent | Number                  | No       | No     | -       |
| subcategory     | String                  | No       | No     | -       |
| productImage    | String                  | No       | No     | -       |
| category        | String                  | No       | No     | -       |
| description     | String                  | No       | No     | -       |
| tagline         | String                  | No       | No     | -       |
| quantity        | Number                  | No       | No     | -       |
| seller          | ObjectId (ref: seller)  | No       | No     | -       |

#### Shipping Schema

| Field         | Type    | Required | Unique | Default |
|---------------|---------|----------|--------|---------|
| address       | String  | No       | No     | -       |
| city          | String  | No       | No     | -       |
| state         | String  | No       | No     | -       |
| country       | String  | No       | No     | -       |
| pinCode       | Number  | No       | No     | -       |
| phoneNo       | Number  | No       | No     | -       |

#### Payment Info Schema

| Field         | Type    | Required | Unique | Default |
|---------------|---------|----------|--------|---------|
| id            | String  | Yes      | No     | -       |
| status        | String  | Yes      | No     | -       |


#### Price Schema

| Field            | Type    | Required | Unique | Default |
|------------------|---------|----------|--------|---------|
| mrp              | Number  | No       | No     | -       |
| cost             | Number  | No       | No     | -       |
| discountPercent  | Number  | No       | No     | -       |

#### Reviews Schema

| Field    | Type                     | Required | Unique | Default    |
|----------|--------------------------|----------|--------|------------|
| rating   | Number                   | No       | No     | -          |
| comment  | String                   | No       | No     | -          |
| reviewer | ObjectId (ref: customer) | No       | No     | -          |
| date     | Date                     | No       | No     | Date.now() |


### Setting up the database schema

To set up the database schema, follow these steps:

1. Create a new database in MongoDB.
2. Create the collections in the database as per the schema mentioned above.
3. Use the [mongoose](https://mongoosejs.com/docs/guide.html) library to create the collections programmatically.
4. Once you have created the collections, you can start using the API endpoints to interact with the database.


### Resources

- [Rulebook](https://docs.google.com/document/d/1W96Pln4oXW3Uhar6WTY2Ldnmlp0U78ar8EArx3N8mcE/edit?usp=sharing)
- [Problem Statements](https://docs.google.com/document/d/1ndR1T67ibpLSBjaIVbaAXLmgfqgvzzWgNMI1UWzuzLM/edit?usp=sharing)


## Made by IEEE Computer Society- Manipal University Jaipur
<br>
<img src="https://images.prismic.io/ieeemuj/Zqu58B5LeNNTxuyF_cs-logo.png?auto=format,compress" alt="IEEE CS MUJ Logo">
<br>
