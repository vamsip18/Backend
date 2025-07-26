const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const sendOtp = require('./routes/sendOtp');

const HoldingModel = require("./model/HoldingModel");
const PositionModel = require("./model/PositionModel");
const OrderModel = require("./model/OrderModel");

dotenv.config();
const app = express();

const corsOptions = {
  origin: ['https://zerodha-frontend-fawn.vercel.app','https://dashboard-eight-mu-84.vercel.app',,'http://localhost:3000','http://localhost:3001'], // your frontend origin
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.get("/addHolding", async(req, res) => {
    let HoldingsData=[
        {
          name: "BHARTIARTL",
          qty: 2,
          avg: 538.05,
          price: 541.15,
          net: "+0.58%",
          day: "+2.99%",
        },
        {
          name: "HDFCBANK",
          qty: 2,
          avg: 1383.4,
          price: 1522.35,
          net: "+10.04%",
          day: "+0.11%",
        },
        {
          name: "HINDUNILVR",
          qty: 1,
          avg: 2335.85,
          price: 2417.4,
          net: "+3.49%",
          day: "+0.21%",
        },
        {
          name: "INFY",
          qty: 1,
          avg: 1350.5,
          price: 1555.45,
          net: "+15.18%",
          day: "-1.60%",
          isLoss: true,
        },
        {
          name: "ITC",
          qty: 5,
          avg: 202.0,
          price: 207.9,
          net: "+2.92%",
          day: "+0.80%",
        },
        {
          name: "KPITTECH",
          qty: 5,
          avg: 250.3,
          price: 266.45,
          net: "+6.45%",
          day: "+3.54%",
        },
        {
          name: "M&M",
          qty: 2,
          avg: 809.9,
          price: 779.8,
          net: "-3.72%",
          day: "-0.01%",
          isLoss: true,
        },
        {
          name: "RELIANCE",
          qty: 1,
          avg: 2193.7,
          price: 2112.4,
          net: "-3.71%",
          day: "+1.44%",
        },
        {
          name: "SBIN",
          qty: 4,
          avg: 324.35,
          price: 430.2,
          net: "+32.63%",
          day: "-0.34%",
          isLoss: true,
        },
        {
          name: "SGBMAY29",
          qty: 2,
          avg: 4727.0,
          price: 4719.0,
          net: "-0.17%",
          day: "+0.15%",
        },
        {
          name: "TATAPOWER",
          qty: 5,
          avg: 104.2,
          price: 124.15,
          net: "+19.15%",
          day: "-0.24%",
          isLoss: true,
        },
        {
          name: "TCS",
          qty: 1,
          avg: 3041.7,
          price: 3194.8,
          net: "+5.03%",
          day: "-0.25%",
          isLoss: true,
        },
        {
          name: "WIPRO",
          qty: 4,
          avg: 489.3,
          price: 577.75,
          net: "+18.08%",
          day: "+0.32%",
        },
      ];
    // HoldingsData.forEach((data) => {
    //     let holding = new HoldingModel(
    //         {
    //             name: data.name,
    //             qty: data.qty,
    //             avg: data.avg,
    //             price: data.price,
    //             net: data.net,
    //             day: data.day,
    //             isLoss: data.isLoss
    //         }
    //     );
    //     holding.save();
    // });
    await HoldingModel.deleteMany();
    await HoldingModel.insertMany(HoldingsData);
    res.send("Holding Data added to DB");
})

app.get('/addPosition', async(req, res) => {
    let positionsData=[
        {
          product: "CNC",
          name: "EVEREADY",
          qty: 2,
          avg: 316.27,
          price: 312.35,
          net: "+0.58%",
          day: "-1.24%",
          isLoss: true,
        },
        {
          product: "CNC",
          name: "JUBLFOOD",
          qty: 1,
          avg: 3124.75,
          price: 3082.65,
          net: "+10.04%",
          day: "-1.35%",
          isLoss: true,
        },
      ];
    await PositionModel.deleteMany();
    await PositionModel.insertMany(positionsData);
    res.send("PositionData added to DB");
});

app.get("/allHoldings", async(req, res) => {  
  const Holdings = await HoldingModel.find({});
  console.log(Holdings);
  res.send(Holdings);
});

app.get("/allPositions", async(req, res) => {  
  const Positions = await PositionModel.find({});
  console.log(Positions);
  res.send(Positions);
});

// app.post('/placeOrder', async(req, res) => {
//     const order = await OrderModel({
//       name: req.body.name,
//       qty: req.body.qty,
//       price: req.body.price,
//       mode: req.body.mode
//     });

//     await order.save();
//     // console.log(order);
//     res.send("Order Placed");
// });

app.use('/api/send-otp', sendOtp);

app.listen(PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
});

