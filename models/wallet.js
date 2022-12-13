import { Schema, model } from "mongoose";
const walletSchema = new Schema(
  {
    balance: {
      type: Schema.Types.Decimal128,
      default: 0.0,
    },
    customer: {
      // one to one relationship with customer table
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
  },

  { timestamps: true } //to include createdAt and updatedAt
);

const Wallet = model("Wallet", walletSchema);
export { Wallet };
