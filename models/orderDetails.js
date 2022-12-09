import { Schema, model } from "mongoose";
const orderDetailSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "ZomatoEmployee",
    },
    orderStatus: {
      type: String,
      trime: true,
      required: true,
    },
    deliveryTime: {
      timestamps: true,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);

const OrderDetails = model("OrderDetails", orderDetailSchema);
export default OrderDetails;
