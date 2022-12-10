import { Schema, model } from "mongoose";
const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    mobile: {
      type: String,
      match: /^[0-9]{12}$/, // {12} takes maximum 12 digits
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);
const Customer = model("Customer", CustomerSchema);
export default Customer;
