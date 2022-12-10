import { StatusCodes } from "http-status-codes";
import Bill from "../models/bill.js";

const getCustomerBill = async (req, res) => {
  const { id } = req.params;
  try {
    const customerBill = await Bill.findOne({ customerId: id });
    if (!customerBill) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    return res.status(StatusCodes.OK).send({ bill: customerBill });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const generateCustomerBill = async (req, res) => {
  const billDetails = {
    customerId: req.body.id,
    totalCost: parseFloat(req.body.cost),
    discount: parseFloat(req.body.discount),
    tax: parseFloat(req.body.tax),
    amountToBePaid: parseFloat(req.body.total),
  };
  try {
    const responseBill = await Bill.create(billDetails);
    return res.status(StatusCodes.CREATED).send({ data: responseBill });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
};
export { getCustomerBill, generateCustomerBill };
