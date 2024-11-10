import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import Customer from "../Modal/Customer";
import Participant from "../Modal/Participant";
import  Jwt  from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";


const router = Router();



// admin Login
router.post('/login', async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        

        if(email === "admin@gmail.com" && password === "admin"){
            const token = Jwt.sign({email:email,role:"admin"},"secret",{expiresIn:"1h"});
            res.cookie("token",token,{httpOnly:true});
            res.status(200).json({message:["Login success"]});
        }else{
            res.status(400).json({message:["Invalid email or password"]});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
);



// admin add participant

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir;
        // Define different directories based on the field name
        if (file.fieldname === 'participant_photo') {
            dir = path.join(__dirname, "../uploads/participant_photos");
        } else if (file.fieldname === 'party_symbol') {
            dir = path.join(__dirname, "../uploads/party_symbols");
        }

        // Check if the directory exists, if not, create it
        if (dir && !fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);  // Pass the directory to cb
    },
    filename: (req, file, cb) => {
        // Set the filename as the current timestamp plus the file extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Define file filter to accept only images
const filter = (req, file, cb) => {
    try {
        const mimetype = ["image/png", "image/jpg", "image/jpeg"];
        if (mimetype.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    } catch (error) {
        console.log(error);
        cb(null, false);
    }
}

// Set up the upload middleware
const upload = multer({ storage: storage, fileFilter: filter });

// Route for adding a participant with two different file uploads
router.post('/addparticipant', upload.fields([
    { name: 'participant_photo', maxCount: 1 },
    { name: 'party_symbol', maxCount: 1 }
]), async (req, res, next) => {
    try {
        const { party_name, party_leader, party_slogan } = req.body;
        const participant_photo = req.files?.participant_photo[0].filename;
        const party_symbol = req.files?.party_symbol[0].filename;
        const role = "participant";
        const createdAt = new Date();
        const updatedAt = new Date();

        // Check if the party name already exists
        const check = await Participant.findOne({ party_name: party_name });

        if (check) {
            return res.status(400).json({ message: ["Party name already exists"] });
        }

        // Create a new participant
        const participant = await Participant.create({
            party_name,
            party_leader,
            party_slogan,
            party_symbol,
            participant_photo,
            role,
            createdAt,
            updatedAt
        });

        if (participant) {
            res.status(200).json({ message: ["Participant added successfully"] });
        } else {
            res.status(400).json({ message: ["Failed to add participant"] });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// admin get all participants
router.get('/getparticipant', async(req,res,next)=>{
    try{
        const participants = await Participant.find({role:"participant"});
        res.status(200).json({participants});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
);



// admin update participant
router.put('/updateparticipant/:id',upload.fields([{ name: 'participant_photo' }, { name: 'party_symbol' }]), async(req,res,next)=>{
    try{
  
        const checkparticipent = await Participant.findById(req.params.id);

        console.log(checkparticipent);

        if(!checkparticipent){
            return res.status(400).json({message:["Participant not found"]});
        }
  

        const {party_name,party_leader,party_slogan} = req.body;
        const participant_photo = req.files?.participant_photo[0].filename || checkparticipent.participant_photo;
        const party_symbol = req.files?.party_symbol[0].filename || checkparticipent.party_symbol;
        const updatedAt = new Date();


        

        

        const participant = await Participant.findByIdAndUpdate(req.params.id,{
            party_name : party_name || checkparticipent.party_name,
            party_leader: party_leader || checkparticipent.party_leader,
            party_slogan: party_slogan || checkparticipent.party_slogan,
            party_symbol: party_symbol ,
            participant_photo: participant_photo ,
            updatedAt
        },{new:true});

        if(participant){
            res.status(200).json({message:["Participant updated successfully"]});
        }else{
            res.status(400).json({message:["Failed to update participant"]});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
);




// admin delete participant
router.delete('/deleteparticipant/:id', async(req,res,next)=>{
    try{
        const participant = await Participant.findByIdAndDelete(req.params.id);

        if(participant){
            res.status(200).json({message:["Participant deleted successfully"]});
        }else{
            res.status(400).json({message:["Failed to delete participant"]});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
);





// admin get all customers
router.get('/getcustomer', async(req,res,next)=>{
    try{
        const customers = await Customer.find({role:"customer"});
        res.status(200).json({customers});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
);









// admin Logout
router.get('/logout', async(req,res,next)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({message:["Logout success"]});
    }catch(error){
        console.log(error);
        res.status(500).json({message:["Internal server error"]});
    }
}
);




// leader board 
router.get('/leaderboard', async(req,res,next)=>{
    try{
        const participants = await Participant.find().sort({voiting_count:-1});
        res.status(200).json({participants});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
});


// dashboard
router.get('/dashboard', async(req,res,next)=>{
    try{
        const participants = await Participant.find();
        const customers = await Customer.find();
        const voiting_count = await Participant.aggregate([
            {
                $group:{
                    _id:null,
                    total_voiting_count:{$sum:"$voting_count"}
                }
            }
        ]);
        // find top 3 participants
        const top_participants = await Participant.find().sort({voiting_count:-1}).limit(3);
        const total_participants = participants.length;
        const total_customers = customers.length;
        res.status(200).json({total_participants,total_customers,voiting_count,top_participants});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
);


export default router;