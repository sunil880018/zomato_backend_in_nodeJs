import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/db.js";
import bodyParser from "body-parser";
import {
  createCustomer,
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
dotenv.config();
dbConnection();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// customer route
app.post("/customer", createCustomer);
app.get("/customers", getCustomers);
app.get("/customer/name", getCustomerByName);

// billing route
app.get("/customer/bill/:customerId", getCustomerBill);
app.post("/customer/bill", generateCustomerBill);

// wallet route
app.get("/wallet", getWalletBalanceController);
app.put("/wallet/:id", updateWalletBalanceController);

app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
});
