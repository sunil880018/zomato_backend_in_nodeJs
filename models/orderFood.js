import { Schema, model } from "mongoose";
import { foodSchema } from "./foods.js";
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
    food: [foodSchema], // one to many relationship
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);

const OrderFood = model("OrderFood", orderFoodSchema);
export { OrderFood };


// const food  = Food.create({name});
// orderFood.food.push(food._id);