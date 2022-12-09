import { Schema, model } from "mongoose";
const walletSchema = new Schema(
  {
    walletBalance: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
  },

  { timestamps: true } //to include createdAt and updatedAt
);

const Wallet = model("Wallet", walletSchema);
export default Wallet;
