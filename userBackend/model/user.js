import mongoose from "mongoose";

const Schema = mongoose.Schema;

//creating a schema for the user
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

//creating a model for the user
const User = mongoose.model("User", userSchema);
export default User;
