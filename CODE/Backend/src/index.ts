
import mongoose from "mongoose";
import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import cors from "cors";
import Admin from "./Controller/Admin";
import Customer from "./Controller/Customer";
import path from "path";



const app = express();


app.use(cors(
    {
        origin: 'http://192.168.1.130:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],

    }
));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/voting';

const server = async() =>{
    try{
        const db = await mongoose.connect(MONGO_URI);

        if(db){
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
                console.log('Database connected');
            });
        }

    }catch(error){
        console.log(error);
        process.exit(1);
    }
};



server();



app.use('/api/admin',Admin);
app.use('/api/customer',Customer);