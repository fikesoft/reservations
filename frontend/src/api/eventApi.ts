import axios from "axios";
import { api } from "./baseUrl";

interface ClassTicketInterface{
    type:string,
    multiplier:number,
    _id:string
  }
  interface LocationEventInterface{
    city:string,
    country:string,
    street:string
  }
  
  interface EventsInterface{
    category:string,
    classTicket:ClassTicketInterface[],
    date:string,
    description:string,
    img:string,
    location:LocationEventInterface
    name:string,
    price:number
    _id:string}
  interface EventResponse {
    message:string,
    allEvents:EventsInterface[]
  }
  type ReadEventsResponse = 
  | { status: number; data: EventResponse }
  | { status: number; data: { message: string } };

  export const readEvents = async (filters: {
    category?: string;
    country?: string;
    date?: string;
    price?: string;
  }): Promise<ReadEventsResponse> => {
    try {
      const response = await api.get<EventResponse>("/read-event", {
        params: {
          category: filters.category,
          country: filters.country,
          date: filters.date,
          price: filters.price,
        },
      });
  
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.response?.status ?? 500,
          data: error.response?.data ?? { message: "Axios error occurred" },
        };
      }
  
      return {
        status: 500,
        data: { message: "Unexpected error occurred" },
      };
    }
  };

  interface CreateEventProps {
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
  
  
  export const createEvent = async (eventData: CreateEventProps) => {
    try {
      const response = await api.post("/create-event", eventData);
  
      // Check if response status indicates success (200-299)
      if (response.status >= 200 && response.status < 300) {
        return { status: response.status, data: response.data };
      }
  
      // If status is outside the 2xx range, handle as error (e.g., 400 Bad Request)
      const errors = response.data?.errors || [];
      return {
        status: response.status,
        data: { message: response.data?.message || "An error occurred.", errors },
      };
    } catch (error) {
      // Handle errors from Axios
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 500;
        const message = error.response?.data?.message ?? "An error occurred while creating the event.";
        const errors = error.response?.data?.errors ?? [];
        
  
        return { status, data: { message, errors } };
      }
      return { status: 500, data: { message: "An unexpected error occurred." } };
    }
  };
  interface EditEventProps {
    _id:string
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

  export const deleteEvent = async (_id: string) => {
    try {
      const response = await api.delete(`/delete-event/${_id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  export const editEvent = async (eventData:EditEventProps) =>{
    try {
      const response = await  api.put(`/edit-event/${eventData._id}` ,eventData) 
      return response.data;     
    } catch (error) {
      console.error("Error editing  the event:", error);
      throw error;
    }
  }
  
  
  