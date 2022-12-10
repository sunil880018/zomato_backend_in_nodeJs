import { Schema, model } from "mongoose";
const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    rating: {
      type: Schema.Types.Decimal128,
      required: true,
      maxLength: 5,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);

const Restaurant = model("Restaurant", restaurantSchema);
export default Restaurant;
