import mongoose, { Schema, Document } from "mongoose";

interface LocationType {
    country: string;
    city: string;
    street: string;
}

enum ClassTicketType {
    NORMAL = "Normal",
    PREMIUM = "Premium",
    ALL_IN = "All Inclusive"
}

// Define ticket pricing structure
interface TicketPrice {
    type: ClassTicketType;
    multiplier: number;
}

interface EventSchemaType extends Document {
    name: string;
    img: string;
    location: LocationType;
    date: string;
    price: number; // Base price
    category: string;
    classTicket: TicketPrice[]; // Array of ticket types with multipliers
    description: string;
}

const eventSchema = new Schema<EventSchemaType>({
    name: { type: String, required: true },
    img: { type: String, required: true },
    date:{type: String ,required:true},
    location: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
    },
    price: { type: Number, required: true }, // Base price
    category: { type: String, required: true },
    classTicket: [
        {
            type: { type: String, enum: Object.values(ClassTicketType), required: true },
            multiplier: { type: Number, required: true },
        }
    ],
    description: { type: String, required: true },
});

const Event = mongoose.model<EventSchemaType>("Event", eventSchema);

export default Event;
