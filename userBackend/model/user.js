import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

    password: {
        type: String,
        required: true,
    }

    // confirmPassword: {
    //     type: String,
    //     required: true,
    // }

    // emailVerification:{
    //     type:String,
    // },

    // verified:{
    //     type:Boolean,
    //     default:false,
    // },
  
});

const User = mongoose.model("User", userSchema);

export default User;