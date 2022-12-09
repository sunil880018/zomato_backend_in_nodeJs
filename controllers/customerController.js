import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Customer from "../models/customers.js";
import Wallet from "../models/wallet.js";

const createCustomer = async (req, res) => {
  const customer = {
    customerName: req.body.name,
    mobile: req.body.mobile,
    address: req.body.address,
  };
  try {
    const responseCustomer = await Customer.create(customer);
    if (!responseCustomer) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
    }
    const responseWallet = await Wallet.create({
      customerId: responseCustomer._id,
    });
    if (!responseWallet) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
    }
    return res.status(StatusCodes.CREATED).send({ data: responseCustomer });
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    if (!customers) {
      return res.status(StatusCodes.NO_CONTENT).send({});
    }
    return res.status(StatusCodes.OK).send({ customers: customers });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const getCustomerByName = async (req, res) => {
  try {
    const customerName = req.params.name;
    const customer = await Customer.findOne({ customerName: customerName });
    if (!customer) {
      return res.status(StatusCodes.NO_CONTENT).send({});
    }
    return res.status(StatusCodes.OK).send({ customer: customer });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

export { createCustomer, getCustomers, getCustomerByName };
