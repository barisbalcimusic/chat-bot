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
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: () => "InvalidEmailFormat",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        //! DOESN'T WORK PROPERLY !!
        validator: function (value) {
          return validator.isLength(value, { min: 8, max: undefined });
        },
        message: () => "InvalidLength",
      },
    },
  },
  {
    versionKey: false,
  }
);

export const User = model("User", userSchema);
