const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const Routes = require('./routes/route.js');
const connectToDB = require('./database.js');

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json({ limit: '10mb' }));
app.use(cors());
connectToDB()
// no need to use this we can just call connectToDB from database.js to connect to DB and create Dummy Data

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log("Connected to MongoDB")) 
//     .catch(err => console.error("NOT CONNECTED TO NETWORK", err)); 

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`); 
});
