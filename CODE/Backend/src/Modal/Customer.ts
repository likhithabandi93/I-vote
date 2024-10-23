import mongoose from "mongoose";


export interface ICustomer extends mongoose.Document {
   first_name: string;
   middle_name: string;
    last_name: string;
    email: string;
    phone: string;
    photo: string;
    aadhar_no: number;
    voter_id: string;
    age: number;
    otp: number;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};


const CustomerSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    middle_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    phone: { type: String, required: true,unique:true },
    photo: { type: String, required: true },
    aadhar_no: { type: Number, required: true,unique:true },
    voter_id: { type: String, required: true,unique:true },
    age: { type: Number, required: true },
    otp: { type: Number, required: true },
    role: { type: String, required: true },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});


const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;