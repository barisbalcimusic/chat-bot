import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        //VALIDATION: IF EMAIL FORMAT IS TRUE
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: () => "InvalidEmailFormat",
      },
    },
    password: {
      type: String,
      required: true,
    },
    verified: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
  }
);

export const User = model("User", userSchema);
