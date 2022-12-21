import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { Customer } from "../models/customers.js";
import { Wallet } from "../models/wallet.js";
import { Bill } from "../models/bill.js";
import { connectWithRedis } from "../database/redis.js";
import { OrderDetails } from "../models/orderDetails.js";
import { OrderFood } from "../models/orderFood.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
const createCustomerController = async (req, res) => {
  const { name, mobile, address } = req.body;
  try {
    if (!name || !mobile || !address) {
      throw new BadRequestError("Please provide all the values");
    }
    const responseCustomer = await Customer.create({ name, mobile, address });
    await Wallet.create({
      customer: responseCustomer._id,
    });
    return res.status(StatusCodes.CREATED).json({ responseCustomer });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

const getCustomersController = async (req, res) => {
  try {
    const listOfCustomers = await Customer.find(
      {},
      { name: 1, mobile: 1, address: { state: 1 } } // select name,mobile,address.state only  , 1 means select, 0 means not select
    );
    return res.status(StatusCodes.OK).json({ listOfCustomers });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const getCustomerByNameController = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      throw new BadRequestError("Please provide name");
    }
    const customer = await Customer.findOne({ name: name }).sort({ name: 1 }); // 1 means sort in ascending order, -1 for descending order
    if (!customer) {
      throw new NotFoundError(`customer with ${name} name Not Found!`);
    }
    return res.status(StatusCodes.OK).json({ customer });
  } catch (error) {
    if (error.statusCode === 404) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message, statusCode: error.statusCode });
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

const getCustomerByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new BadRequestError("Please provide id");
    }
    const customer = await Customer.findOne({ _id: id });
    if (!customer) {
      throw new NotFoundError(`customer with ${id} id Not Found!`);
    }
    // setting value in redis
    const redis = connectWithRedis();
    redis.set(customer._id, JSON.stringify(customer), "ex", 60); // expires in 60 seconds
    // EX seconds -- Set the specified expire time, in seconds.
    // PX milliseconds -- Set the specified expire time, in milliseconds.
    // EXAT timestamp-seconds -- Set the specified Unix time at which the key will expire,
    // NX -- Only set the key if it does not already exist.
    return res.status(StatusCodes.OK).json({ customer });
  } catch (error) {
    if (error.statusCode === 404) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message, statusCode: error.statusCode });
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

// join two tables
const getCustomerBalanceController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new BadRequestError("Please provide id");
    }
    await Wallet.findOne({ customer: id })
      .populate("customer")
      .then((customerWalletBalance) => {
        return res.status(StatusCodes.OK).json({ customerWalletBalance });
      });
  } catch (error) {
    if (error.statusCode === 400) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message, statusCode: error.statusCode });
    }
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

const deleteCustomerByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new BadRequestError("Please provide id");
    }
    const customerDetails = await Customer.findById({ _id: id });
    if (!customerDetails) {
      throw new NotFoundError(`customer with ${id} id Not Found!`);
    }
    const customerWallet = await Wallet.findOne({ customer: id });
    if (!customerDetails) {
      throw new NotFoundError(`customer with ${id} id Not Found!`);
    }
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
    return res.status(StatusCodes.OK).json();
  } catch (error) {
    if (error.statusCode === 404) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message, statusCode: error.statusCode });
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.message, statusCode: error.statusCode });
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
