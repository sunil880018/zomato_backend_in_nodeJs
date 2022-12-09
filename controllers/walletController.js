import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Wallet from "../models/wallet.js";

const getWalletBalanceController = async (req, res) => {
  const customerId = req.query.id;
  try {
    const wallet = await Wallet.findOne({ customerId: customerId });
    return res.status(StatusCodes.OK).send({ wallet: wallet });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const updateWalletBalanceController = async (req, res) => {
  // req.query.id ----> query parameter -----> localhost:3000/wallet/id?="6392f9ac0e207af5a6b6dba2"
  // req.params.id ------> path parameter  -----------> localhost:3000/wallet/6392f9ac0e207af5a6b6dba2
  // route for path parameter -------> app.put("/wallet/:id", updateWalletBalanceController);
  // route for query parameter ----------> app.put("/wallet", updateWalletBalanceController);
  const walletDetails = {
    customerId: req.params.id,
    walletBalance: req.body.balance,
  };
  try {
    const customerWallet = await Wallet.findOne({
      customerId: walletDetails.customerId,
    });

    walletDetails.walletBalance =
      parseFloat(walletDetails.walletBalance) +
      parseFloat(customerWallet.walletBalance);
    const walletBalanceUpdated = await Wallet.findByIdAndUpdate(
      { _id: customerWallet._id },
      { $set: walletDetails },
      { new: true }
    );
    return res
      .status(StatusCodes.ACCEPTED)
      .send({ wallet: walletBalanceUpdated });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
};
export { getWalletBalanceController, updateWalletBalanceController };
