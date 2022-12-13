import { Schema, model } from "mongoose";
const orderFoodSchema = new Schema(
  {
    orderDetails: {
      type: Schema.Types.ObjectId,
      ref: "OrderDetails",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    food: {
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
export { OrderFood };
