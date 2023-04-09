import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
   
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    
    email: {
        type: String,
    },

    password: {
        type: String,
    },
  
});

const User = mongoose.model("User", userSchema);

export default User;