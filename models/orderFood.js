import { Schema, model } from "mongoose";
const orderFoodSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "OrderDetails",
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    foodId: {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
    quantity: {
      type: Number,
      required: true,
      minLength: 1,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);

const OrderFood = model("OrderFood", orderFoodSchema);
export default OrderFood;
