import { Schema, model } from "mongoose";
const paymentSchema = new Schema(
  {
    orderDetail: {
      type: Schema.Types.ObjectId,
      ref: "OrderDetails",
    },
    paymentType: {
      type: String,
      trim: true,
      required: true,
    },
    paymentStatus: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Schema.Types.Decimal128,
      required,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);

const Payment = model("Payment", paymentSchema);
export default Payment;
