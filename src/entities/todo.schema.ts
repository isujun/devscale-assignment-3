import { model, Schema } from "mongoose";

const todoSchema = new Schema({
  todo: { type: String, required: true },
  done: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Todo = model("Todo", todoSchema);
