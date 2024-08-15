import { model, Schema } from "mongoose";

const todoSchema = new Schema({
  title: String,
  done: String,
  userid: String,
});

export const Todo = model("Todo", todoSchema);
