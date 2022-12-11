import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Bill from "../models/bill.js";

const getCustomerBillController = async (req, res) => {
  const { id } = req.params;
  try {
    const customerBill = await Bill.findOne({ customer: id });
    if (!customerBill) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    return res.status(StatusCodes.OK).json({ bill: customerBill });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const generateCustomerBillController = async (req, res) => {
  const billDetails = {
    customer: req.body.id,
    totalCost: parseFloat(req.body.cost),
    discount: parseFloat(req.body.discount),
    tax: parseFloat(req.body.tax),
    amountToBePaid: parseFloat(req.body.total),
  };
  try {
    const responseBill = await Bill.create(billDetails);
    return res.status(StatusCodes.CREATED).json({ data: responseBill });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
};
export { getCustomerBillController, generateCustomerBillController };
