import { Schema, model } from "mongoose";
const orderDetailSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "ZomatoEmployee",
    },
    orderStatus: {
      type: String,
      trime: true,
      enum: ['pending', 'placed', 'delivered', 'cancelled','out-for-deleivery'],
      default: 'pending',
    },
    deliveryTime: {
      timestamps: false,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);

const OrderDetails = model("OrderDetails", orderDetailSchema);
export { OrderDetails };
