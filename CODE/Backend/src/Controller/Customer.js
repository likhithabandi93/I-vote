import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import Customer from "../Modal/Customer"; // Fixed spelling "Modal" to "Model"
import Participant from "../Modal/Participant";
import Jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

const router = Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        const dir = path.join(__dirname, "../uploads/customer");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req: Request, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter to allow only images
const filter = (req: Request, file: Express.Multer.File, cb: Function) => {
    const mimetype = ["image/png", "image/jpg", "image/jpeg"];
    if (mimetype.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: filter });

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'cse.takeoff@gmail.com', 
        pass: 'digkagfgyxcjltup'           
    }
});


router.post('/register', upload.single('photo'), async (req: Request, res: any, next: NextFunction) => {
    try {
        const { first_name, middle_name, last_name, email, phone, voter_id, age,aadhar_no } = req.body; // Fixed spelling "middile_name" to "middle_name"
        const photo = req.file?.filename;
        const role = "customer";
        const createdAt = new Date();
        const updatedAt = new Date();


        const customerExist = await Customer.findOne({ $or: [{ email: email }, { phone: phone }, { voter_id: voter_id },{aadhar_no:aadhar_no}] });

        if (customerExist) {
            return res.status(400).json({ message: ["Email, Phone or Voter ID already exists"] });
        }

       
        const otp = Math.floor(1000 + Math.random() * 9000);

       
        const customer = new Customer({
            first_name,
            middle_name,
            last_name,
            email,
            phone,
            photo,
            aadhar_no,
            voter_id,
            age,
            role,
            otp,          
            createdAt,
            updatedAt
        });

        
        const mailOptions = {
            from: 'cse.takeoff@gmail.com', 
            to: email,
            subject: 'OTP Verification',
            html: `<h2>Welcome to Our Service!</h2>
                   <p>Dear ${first_name},</p>
                   <p>Your OTP for verification is: <strong>${otp}</strong></p>
                   <p>Please use this OTP to complete your registration process.</p>
                   <p>Thank you for joining us!</p>
                   <footer style="margin-top: 20px; font-size: small;">
                       <p>Best Regards,</p>
                       <p>Your Company Name</p>
                   </footer>`
        };

      
        transporter.sendMail(mailOptions, async (error: any, info: any) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: ["Error sending OTP email"] });
            } else {
                console.log(info.response);
               
                const result = await customer.save();

                if (result) {
                    res.status(200).json({ message: ["Registration success, OTP sent to your email"], customer });
                } else {
                    res.status(400).json({ message: ["Registration failed" ]});
                }
            }
        });

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// resend OTP route
router.post('/resend-otp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;

        const otp = Math.floor(1000 + Math.random() * 9000);

        await Customer.findOneAndUpdate({ email: email }, { otp: otp });


        const mailOptions = {
            from: 'cse.takeoff@gmail.com',
            to: email,
            subject: 'OTP Verification',
            html: `<h2>Welcome to Our Service!</h2>
                   <p>Your OTP for verification is: <strong>${otp}</strong></p>
                   <p>Please use this OTP to complete your registration process.</p>
                   <p>Thank you for joining us!</p>
                   <footer style="margin-top: 20px; font-size: small;">
                       <p>Best Regards,</p>
                       <p>Your Company Name</p>
                   </footer>`
        };

        transporter.sendMail(mailOptions, async (error: any, info: any) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message:[ "Error sending OTP email"] });
            } else {
                console.log(info.response);
                res.status(200).json({ message:[ "OTP sent to your email"] });
            }
        });

    }
    catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
);





// verify OTP route

router.post('/verifyotp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp } = req.body;

        const customer = await Customer.findOne({ email: email, otp: otp });

        if (customer) {
            await Customer.findByIdAndUpdate(customer._id, { status: "active" });
            res.status(200).json({ message:[ "OTP verified"] });
        }else{
            res.status(400).json({ message: ["Invalid OTP"] });
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// login route

router.post('/login',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const{email,voter_id} = req.body;

        console.log(email,voter_id);

        const customer = await Customer.findOne({email:email,voter_id:voter_id,status:"active"});
        if(customer){
            const token = Jwt.sign({id:customer._id,role:customer.role},process.env.JWT_SECRET_KEY || 'hello' ,{expiresIn:"1h"});
            res.cookie("token",token,{httpOnly:true});
            res.status(200).json({message:["Login success"],token,customer});
        }

    }catch(error:any){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
});



// view Participent
router.get('/view-participant',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const customer = await Participant.find({role:"participant"});
        res.status(200).json({customer});
    }catch(error:any){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
});




// already voted
// router.post('/alreadyvoted/:id',async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         console.log(req.params.id,"id");
//         const id = req.params.id;
//         const alreadyVoted = await Participant.findOne({"vote.customer_id":id});
//         console.log(alreadyVoted);
//         if(alreadyVoted){
//             res.status(200).json({message:["You already voted"]});
//         }else{
//            next();
//         }
//     }catch(error:any){
//         console.log(error);
//         res.status(500).json({message:"Internal server error"});
//     }
// });






// vouitng route
// router.post('/voting/:id', async (req: Request, res: any, next: NextFunction) => {
//     try {
//         const id = req.params.id;
//         const { customer_id } = req.body; // Extracting customer_id from the request body

//         // Check if the participant has already voted
//         const alreadyVoted = await Participant.findOne({ "vote.customer_id": customer_id });



//          console.log(alreadyVoted);

//         if (alreadyVoted) {
//             return res.status(400).json({ message: ["You already voted"] });
//         } else {
//             // Update the voting count and add the customer_id to the vote array
//             const voting = await Participant.findByIdAndUpdate(
//                 id,
//                 {
//                     $inc: { voiting_count: 1 }, 
//                     $addToSet: { vote: { customer_id } }
//                 },
//                 { new: true }
//             );

//             if (voting) {
//                 res.status(200).json({ message: ["Voting success"] });
//             } else {
//                 res.status(400).json({ message: ["Voting failed"] });
//             }
//         }
//     } catch (error: any) {
//         console.log(error);
//         res.status(500).json({ message: ["Internal server error"] });
//     }
// });


router.post('/voting/:id', async (req: Request, res: any, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { customer_id } = req.body; 


        console.log(customer_id);

        // Check if the customer has voted for any participant
        const customerHasVoted = await Participant.findOne({ "vote.customer_id": customer_id });


        console.log(customerHasVoted);

        if (customerHasVoted) {
            return res.status(400).json({ message:[ "You have already voted for a participant."] });
        }

       
        const voting = await Participant.findByIdAndUpdate(
            id,
            {
                $inc: { voting_count: 1 }, 
                $addToSet: { vote: { customer_id:customer_id } } 
            },
            { new: true }
        );

        if (voting) {
            return res.status(200).json({ message:[ "Voting successful"], voting });
        } else {
            return res.status(400).json({ message: ["Voting failed"] });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: ["Internal server error"] });
    }
});



// logout route
router.get('/logout',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({message:["Logout success"]});
    }catch(error:any){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
});

    









export default router;
