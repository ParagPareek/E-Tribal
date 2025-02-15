import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    conformPassword: {
      type: String,
    },
    role:{
      type:String,
      default:"buyer"
    }
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("User", userSchema);
