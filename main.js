import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/db.js";
import bodyParser from "body-parser";
import {
  createCustomerController,
  getCustomerBalanceController,
  getCustomerByIdController,
  getCustomerByNameController,
  getCustomersController,
} from "./controllers/customerController.js";
import {
  generateCustomerBillController,
  getCustomerBillController,
} from "./controllers/billController.js";
import {
  getWalletBalanceController,
  updateWalletBalanceController,
} from "./controllers/walletController.js";
import cors from "cors";
import { apiRequestLimiter } from "./middleware/apiRateLimiter.js";
import { whitelist } from "./utils/ipWhiteList.js";
import { getCustomerCache } from "./middleware/redisCache.js";
import {
  getFoodByIdController,
  getFoodByNameController,
  getFoodMenuController,
} from "./controllers/foodContoller.js";
import {
  getRestaurantByLocationController,
  getRestaurantByNameController,
  getRestaurantsController,
} from "./controllers/restaurantController.js";
dotenv.config();
dbConnection();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rate limiter middleware
app.use(apiRequestLimiter);

// customer route
app.post("/customer", cors(whitelist), createCustomerController);
app.get("/customers", cors(whitelist), getCustomersController);
app.get("/customer", cors(whitelist), getCustomerByNameController);


// using redis cache
app.get(
  "/customer/:id",
  cors(whitelist),
  getCustomerCache,
  getCustomerByIdController
);
app.get("/customer/balance/:id", cors(whitelist), getCustomerBalanceController);

// billing route
app.post("/customer/bill", generateCustomerBillController);
app.get("/customer/bill/:id", getCustomerBillController);

// wallet route
app.get("/wallet", getWalletBalanceController);
app.put("/wallet/:id", updateWalletBalanceController);

// food route
app.get("/foods", getFoodMenuController);
app.get("/food", getFoodByNameController);
app.get("/food/:id", getFoodByIdController);

// restaurant route

app.get("/restaurants", getRestaurantsController);
app.get("/restaurant", getRestaurantByNameController);
app.get("/restaurant/:location", getRestaurantByLocationController);

app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
});
