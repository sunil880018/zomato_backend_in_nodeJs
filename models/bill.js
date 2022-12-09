import { Schema, model } from "mongoose";
const BillSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    totalCost: {
      type: Schema.Types.Decimal128,
      required: true,
      default: 0,
    },
    discount: {
      type: Schema.Types.Decimal128,
      default: 0,
    },
    tax: {
      type: Schema.Types.Decimal128,
      required: true,
      default: 0,
    },
    amountToBePaid: {
      type: Schema.Types.Decimal128,
      required: true,
      default: 0,
    },
  },

  { timestamps: true } //to include createdAt and updatedAt
);

const Bill = model("Bill", BillSchema);
export default Bill;
