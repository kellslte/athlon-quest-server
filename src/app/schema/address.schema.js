import { Schema, model } from "mongoose";

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  primary: { type: Boolean, default: false },
});

export const Address = model("Address", AddressSchema);
