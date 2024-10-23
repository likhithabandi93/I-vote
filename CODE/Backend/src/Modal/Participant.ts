import mongoose, { Mongoose } from "mongoose";

export interface IParticipant extends mongoose.Document {
    party_name: string;
    party_leader: string;
    party_slogan: string;
    party_symbol: string;
    participant_photo: string;
    voting_count: number;
    vote: { customer_id: mongoose.Types.ObjectId }[];
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const ParticipantSchema = new mongoose.Schema({
    party_name: { type: String, required: true },
    party_leader: { type: String, required: true },
    party_slogan: { type: String, required: true },
    party_symbol: { type: String, required: true },
    participant_photo: { type: String, required: true },
    voting_count: { type: Number, default: 0 },
    vote: [
        {
            customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }
        }
    ],
    role: { type: String, required: true }
}, { timestamps: true });

const Participant = mongoose.model<IParticipant>('Participant', ParticipantSchema);

export default Participant;
