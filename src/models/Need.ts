import { Schema, model } from "mongoose";

const tagSchema = new Schema({
  title: {
    type: String,
    requrired: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const needSchema = new Schema(
  {
    tags: [tagSchema],
    header: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default model("need", needSchema);