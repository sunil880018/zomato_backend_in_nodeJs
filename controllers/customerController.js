import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Customer from "../models/customers.js";
import Wallet from "../models/wallet.js";
import Bill from "../models/bill.js";
import { connectWithRedis } from "../database/redis.js";
import OrderDetails from "../models/orderDetails.js";
import OrderFood from "../models/orderFood.js";

const createCustomerController = async (req, res) => {
  const customer = {
    name: req.body.name,
    mobile: req.body.mobile,
    address: req.body.address,
  };
  try {
    const responseCustomer = await Customer.create(customer);
    await Wallet.create({
      customer: responseCustomer._id,
    });
    return res.status(StatusCodes.CREATED).json({ data: responseCustomer });
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
};

const getCustomersController = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(StatusCodes.OK).json({ customers: customers });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const getCustomerByNameController = async (req, res) => {
  const { name } = req.query;
  try {
    const customer = await Customer.findOne({ name: name });
    if (!customer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    return res.status(StatusCodes.OK).json({ customer: customer });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const getCustomerByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findOne({ _id: id });
    if (!customer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    // setting value in redis
    const redis = connectWithRedis();
    redis.set(customer._id, JSON.stringify(customer), "ex", 60); // expires in 60 seconds
    // EX seconds -- Set the specified expire time, in seconds.
    // PX milliseconds -- Set the specified expire time, in milliseconds.
    // EXAT timestamp-seconds -- Set the specified Unix time at which the key will expire,
    // NX -- Only set the key if it does not already exist.
    return res.status(StatusCodes.OK).json({ customer: customer });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

// join two tables
const getCustomerBalanceController = async (req, res) => {
  const { id } = req.params;
  try {
    await Wallet.findOne({ customer: id })
      .populate("customer")
      .then((customerWalletBalance) => {
        return res
          .status(StatusCodes.OK)
          .json({ customerWalletBalance: customerWalletBalance });
      });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const deleteCustomerByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const customerDetails = await Customer.findById({ _id: id });
    if (!customerDetails) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    const customerWallet = await Wallet.findOne({ customer: id });
    await Wallet.findByIdAndDelete({ _id: customerWallet._id });

    const customerBillDetails = await Bill.findOne({ customer: id });
    if (customerBillDetails) {
      await Bill.findOneAndDelete({ _id: customerBillDetails._id });
    }
    const customerOrderDetails = OrderDetails.findOne({ customer: id });
    if (customerOrderDetails) {
      await OrderDetails.findByIdAndDelete({ _id: customerOrderDetails._id });
    }
    const customerOrderFood = OrderFood.findOne({ customer: id });
    if (customerOrderFood) {
      await OrderFood.findByIdAndDelete({ _id: customerOrderFood._id });
    }

    await Customer.findByIdAndDelete({ _id: id });
    return res.status(StatusCodes.NO_CONTENT).json({});
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
};

export {
  createCustomerController,
  getCustomersController,
  getCustomerByNameController,
  getCustomerBalanceController,
  getCustomerByIdController,
  deleteCustomerByIdController,
};
