import { Request, Response } from "express";
import Event from "../models/event";
import mongoose from "mongoose";

// Define expected properties for the request body
interface EventRequestBody {
    name: string;
    img: string;
    location: {
        country: string;
        city: string;
        street: string;
    };
    price: number;
    category: string;
    classTicket: {
        type: string;
        multiplier: number;
    }[];
    description: string;
}

interface EventRequestBodyPatch extends EventRequestBody {
    _id:string
}

export const createEvent = async (req: Request<{}, {}, EventRequestBody>, res: Response) => {
    const { name, img, location, price, category, classTicket, description } = req.body;

    // Create a new event instance
    const newEvent = new Event({
        name,
        img,
        location,
        price,
        category,
        classTicket,
        description
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(201).json({ message: "Created successfully", dataCreated: savedEvent });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};


export const readEvent = async (req: Request, res: Response) => {
    try {
        const allEvents = await Event.find();

        res.status(200).json({ message: "All events fetched successfully", allEvents });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error fetching events", error: error instanceof Error ? error.message : error });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    const { _id } = req.body;
    if(! _id){ 
        res.status(400).json({message:"Give the ID of the event"})
        return
    }
    try {
        const result = await Event.deleteOne({ _id });

        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Event not found" })
            return;
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting event", error: error instanceof Error ? error.message : error });
    }
};

export const editEvent  = async (req:Request<{id:string}, {}, EventRequestBodyPatch>, res:Response) => {
    const  { id  }= req.params
    const updateData = req.body;
     // Validate MongoDB ObjectId
     if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid event ID" });
        return
    }
   try {
        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedEvent) {
            res.status(404).json({ message: "Event not found" });
            return 
        }

        res.status(200).json({ message: "Event updated successfully", updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating event", error: error instanceof Error ? error.message : error });
    }
}


