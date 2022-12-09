import { Schema, model } from "mongoose";
const zomatoEmployeeSchema = new Schema(
  {
    employeeName: {
      type: String,
      trim: true,
      required: true,
    },
    mobile: {
      type: String,
      match: /^[0-9]{12}$/,
      required: true,
    },
    rating: {
      type: Schema.Types.Decimal128,
      trim: true,
      required: true,
      maxLength: 5,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);

const ZomatoEmployee = model("ZomatoEmployee", zomatoEmployeeSchema);
export default ZomatoEmployee;
