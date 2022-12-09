import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/db.js";
import bodyParser from "body-parser";
import {
  createCustomer,
  getCustomerByName,
  getCustomers,
} from "./controllers/customerController.js";
import { getCustomerBill } from "./controllers/billController.js";
dotenv.config();
dbConnection();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cutomer route
app.post("/customer", createCustomer);
app.get("/customers", getCustomers);
app.get('/customer/name', getCustomerByName);

// billing
app.get("/customer/bill/:customerId", getCustomerBill);

app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
});
