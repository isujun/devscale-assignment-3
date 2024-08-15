import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

export const User = model("User", userSchema);
