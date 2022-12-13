import { Schema, model } from "mongoose";
const foodSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    perUnitPrice: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);

const Food = model("Food", foodSchema);
export { Food };
