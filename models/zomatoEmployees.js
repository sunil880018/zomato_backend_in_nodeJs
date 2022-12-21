import { Schema, model } from "mongoose";
const zomatoEmployeeSchema = new Schema({
  name: {
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const ZomatoEmployee = model("ZomatoEmployee", zomatoEmployeeSchema);
export { ZomatoEmployee };
