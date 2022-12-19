import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Wallet } from "../models/wallet.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
const getWalletBalanceController = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      throw new BadRequestError("Please provide id");
    }
    const wallet = await Wallet.findOne({ customer: id });
    if (!wallet) {
      throw new NotFoundError("Not Found!");
    }
    return res.status(StatusCodes.OK).json({ wallet: wallet });
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

const updateWalletBalanceController = async (req, res) => {
  // req.query.id ----> query parameter -----> localhost:3000/wallet/id?="6392f9ac0e207af5a6b6dba2"
  // req.params.id ------> path parameter  -----------> localhost:3000/wallet/6392f9ac0e207af5a6b6dba2
  // route for path parameter -------> app.put("/wallet/:id", updateWalletBalanceController);
  // route for query parameter ----------> app.put("/wallet", updateWalletBalanceController);
  const { id, balance } = req.params;
  try {
    if (!id || !balance) {
      throw new BadRequestError("Please provide id and balance");
    }
    const customerWallet = await Wallet.findOne({
      customer: id,
    });
    if (!customerWallet) {
      throw new NotFoundError("Not Found!");
    }
    walletDetails.balance =
      parseFloat(walletDetails.balance) + parseFloat(customerWallet.balance);
    const walletBalanceUpdated = await Wallet.findByIdAndUpdate(
      { _id: customerWallet._id },
      { $set: walletDetails },
      { new: true }
    );
    return res
      .status(StatusCodes.ACCEPTED)
      .json({ wallet: walletBalanceUpdated });
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
export { getWalletBalanceController, updateWalletBalanceController };
