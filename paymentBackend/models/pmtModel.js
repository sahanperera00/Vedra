import mongoose from "mongoose";

const Schema = mongoose.Schema;
const pmtSchema = new Schema({

    invoiceNo:{
        type:String,
        required:true
    },
    orderNo:{
        type:String,

    },
    pmtMethod:{
        type:String,
        required:true
    },
    pmtDate:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    grossPrice: {
        type:Number,
        required:true
    },
    netPrice:{
        type: Number,
        required: true
    },

})

const Pmt = mongoose.model("Payments",pmtSchema);
export default Pmt;
