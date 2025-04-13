import { Request, Response } from "express";
import mongoose from "mongoose";
import dayjs from "dayjs";
import Event from "../models/event";

// Define expected properties for the request body
interface EventRequestBody {
  name: string;
  img: string;
  date: string;
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

interface EventRequestBodyPatch extends Partial<EventRequestBody> {}

// Create Event
export const createEvent = async (req: Request<{}, {}, EventRequestBody>, res: Response) => {
  const createData = req.body;

  // Validate & format date
  if (!dayjs(createData.date, "YYYY-MM-DD", true).isValid()) {
     res.status(400).json({ message: "Invalid date format, use YYYY-MM-DD" });
     return
    }
  createData.date = dayjs(createData.date).format("YYYY-MM-DD"); // Store formatted

  try {
    const newEvent = new Event(createData);
    const savedEvent = await newEvent.save();
    res.status(201).json({ message: "Created successfully", dataCreated: savedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error instanceof Error ? error.message : error });
  }
};

//  Read All Events
  export const readEvent = async (req: Request, res: Response) => {
    const { price, category, date, country } = req.query;

    const query: any = {};


    if (price) query.price = { $gte: Number(price) }; // or $gte / custom logic
    if (category) query.category = category;
    if (date) query.date = date; // or format to ISO if needed
    if (country) query["location.country"] = country;

    try {
      const allEvents = await Event.find(query);
      res.status(200).json({ message: "All events fetched successfully", allEvents });
    } catch (error) {
      res.status(500).json({ message: "Error fetching events", error: error instanceof Error ? error.message : error });
    }
  };

//  Delete Event
export const deleteEvent = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid event ID" });
     return
    }

  try {
    const result = await Event.findByIdAndDelete(id);

    if (!result) {
       res.status(404).json({ message: "Event not found" });
       return
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error instanceof Error ? error.message : error });
  }
};

//  Edit Event
export const editEvent = async (req: Request<{ id: string }, {}, EventRequestBodyPatch>, res: Response) => {
  const { id } = req.params;
  const editData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid event ID" });
    return
    }

  if (editData.date && !dayjs(editData.date, "YYYY-MM-DD", true).isValid()) {
    res.status(400).json({ message: "Invalid date format, use YYYY-MM-DD" });
    return
    }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, editData, { new: true, runValidators: true });

    if (!updatedEvent) {
    res.status(404).json({ message: "Event not found" });
    return    
}

    res.status(200).json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error instanceof Error ? error.message : error });
  }
};
 