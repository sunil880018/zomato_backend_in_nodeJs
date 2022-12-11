import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Customer from "../models/customers.js";
import Wallet from "../models/wallet.js";
import { connectWithRedis } from "../database/redis.js";
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
    // .populate({path:"customer",select:{name:1,mobile:1}}) ---> select name,mobile only
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

export {
  createCustomerController,
  getCustomersController,
  getCustomerByNameController,
  getCustomerBalanceController,
  getCustomerByIdController,
};
