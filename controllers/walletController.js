import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Wallet from "../models/wallet";

const getWalletBalanceController = async (req, res) => {
  const customerId = req.params.id;
  try {
    const wallet = await Wallet.findOne({ customerId: customerId });
    return res.status(StatusCodes.OK).send({ wallet: wallet });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const updateWalletBalanceController = async (res, res) => {
  const walletDetails = {
    customerId: req.body.id,
    walletBalance: req.body.balance,
  };
  try {
    const customerWallet = await Wallet.findOne({
      customerId: walletDetails.customerId,
    });
    walletDetails.walletBalance =
      walletDetails.walletBalance + customerWallet.walletBalance;
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
