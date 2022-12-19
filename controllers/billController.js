import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Bill } from "../models/bill.js";
import { BadRequestError} from "../errors/index.js";
const getCustomerBillController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new BadRequestError("Please provide id");
    }
    await Bill.findOne({ customer: id })
      .populate({
        path: "customer",
        select: "name mobile address.city",
      })
      .then((customerBillDetails) => {
        return res
          .status(StatusCodes.OK)
          .json({ customerBillDetails: customerBillDetails });
      })
      .catch(() => {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
      });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

const generateCustomerBillController = async (req, res) => {
  const billDetailsRequest = {
    customer: req.body.id,
    totalCost: parseFloat(req.body.cost),
    discount: parseFloat(req.body.discount),
    tax: parseFloat(req.body.tax),
    amountToBePaid: parseFloat(req.body.total),
  };
  try {
    const responseBill = await Bill.create(billDetailsRequest);
    return res.status(StatusCodes.CREATED).json({ data: responseBill });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
};

// join 3 tables
// Customer.find()
// .populate({
//   path:"Table 1"
//   select:"colunm1 colunm2"
// })
// .populate({
//   path:"Table 2"
//   select:"colunm1 colunm2"
// })
// .populate({
//   path:"Table3.nestedObject"
//   select:"colunm1 colunm2"
// }).then((data)=>{
//   res.json(data)
// }).catch((err)=>{
//   res.json({err})
// })

export { getCustomerBillController, generateCustomerBillController };
