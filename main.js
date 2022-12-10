import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/db.js";
import bodyParser from "body-parser";
import {
  createCustomer,
  getCustomerBalanceController,
  getCustomerById,
  getCustomerByName,
  getCustomers,
} from "./controllers/customerController.js";
import {
  generateCustomerBill,
  getCustomerBill,
} from "./controllers/billController.js";
import {
  getWalletBalanceController,
  updateWalletBalanceController,
} from "./controllers/walletController.js";
import cors from "cors";
import { apiRequestLimiter } from "./middleware/apiRateLimiter.js";
import { whitelist } from "./utils/ipWhiteList.js";
import { getCustomerCache } from "./middleware/redisCache.js";
import { getFoodById, getFoodMenu } from "./controllers/foodContoller.js";
dotenv.config();
dbConnection();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rate limiter middleware
app.use(apiRequestLimiter);

// customer route
app.post("/customer", cors(whitelist), createCustomer);
app.get("/customers", cors(whitelist), getCustomers);
app.get("/customer", cors(whitelist), getCustomerByName);

// using redis cache
app.get("/customer/:id", cors(whitelist), getCustomerCache, getCustomerById);
app.get("/customer/balance/:id", cors(whitelist), getCustomerBalanceController);

// billing route
app.get("/customer/bill/:customerId", getCustomerBill);
app.post("/customer/bill", generateCustomerBill);

// wallet route
app.get("/wallet", getWalletBalanceController);
app.put("/wallet/:id", updateWalletBalanceController);

// food route
app.get("/foods", getFoodMenu);
app.get("/food/:id", getFoodById);

app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
});
