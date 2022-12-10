import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/db.js";
import bodyParser from "body-parser";
import {
  createCustomer,
  getCustomerBalanceController,
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
import { rateLimit } from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

dotenv.config();
dbConnection();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Let us say you have a React frontend and trying to POST a form to your Node backend.
// After you hit that submit button, you will be hit with an error in the console.
// You basically do not have access to that backend, so we will use CORS to enable it.

// whitelisting allows only specific addresses or devices to access data or networks.
// This is usually done by keeping a list of trusted users or devices and only allowing
// traffic from those addresses.

const whitelist = {
  origin: "localhost:3001", // allows localhost:3001 to access localhost:3000 resources
  optionsSuccessStatus: 200,
};

// Create the rate limit rule
// A rate limit is the maximum number of calls you want to allow in a particular time interval.
const apiRequestLimiter = rateLimit({
  timeToRemember: 1 * 60 * 1000, // 1 minute
  max: 2, // limit each IP to 2 requests per given time
  message: "You sent too many requests. Please wait a while then try again",
  handler: function (req, res /*next*/) {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      error: this.message,
    });
  },
});

// Use the limit rule as an application middleware
app.use(apiRequestLimiter);

// customer route
app.post("/customer", cors(whitelist), createCustomer);
app.get("/customers", cors(whitelist), getCustomers);
app.get("/customer", cors(whitelist), getCustomerByName);
app.get("/customer/balance/:id", cors(whitelist), getCustomerBalanceController);

// billing route
app.get("/customer/bill/:customerId", getCustomerBill);
app.post("/customer/bill", generateCustomerBill);

// wallet route
app.get("/wallet", getWalletBalanceController);
app.put("/wallet/:id", updateWalletBalanceController);

app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
});
