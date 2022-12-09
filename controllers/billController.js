import { StatusCodes } from "http-status-codes";
import Bill from "../models/bill";

const getCustomerBill = async (req, res) => {
  try {
    const customerBill = await Bill.findById(req.id);
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
export { getCustomerBill };
