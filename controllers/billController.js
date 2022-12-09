import { StatusCodes } from "http-status-codes";
import Bill from "../models/bill.js";

const getCustomerBill = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customerBill = await Bill.findOne({ customerId: customerId });
    if (!customerBill) {
      return res.status(StatusCodes.NO_CONTENT).send({});
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
    if (!responseBill) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
    }
    return res.status(StatusCodes.CREATED).send({ data: responseBill });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
};
export { getCustomerBill, generateCustomerBill };
