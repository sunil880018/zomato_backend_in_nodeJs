import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Wallet } from "../models/wallet.js";

const getWalletBalanceController = async (req, res) => {
  const { id } = req.query;
  try {
    const wallet = await Wallet.findOne({ customer: id });
    if (!wallet) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    return res.status(StatusCodes.OK).json({ wallet: wallet });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const updateWalletBalanceController = async (req, res) => {
  // req.query.id ----> query parameter -----> localhost:3000/wallet/id?="6392f9ac0e207af5a6b6dba2"
  // req.params.id ------> path parameter  -----------> localhost:3000/wallet/6392f9ac0e207af5a6b6dba2
  // route for path parameter -------> app.put("/wallet/:id", updateWalletBalanceController);
  // route for query parameter ----------> app.put("/wallet", updateWalletBalanceController);
  const walletDetails = {
    customer: req.params.id,
    balance: req.body.balance,
  };
  try {
    const customerWallet = await Wallet.findOne({
      customer: walletDetails.customer,
    });

    if (!customerWallet) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
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
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
};
export { getWalletBalanceController, updateWalletBalanceController };
