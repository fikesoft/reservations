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
  
  
  export const createEvent = async ({
    name,
    img,
    date,
    location,
    price,
    category,
    classTicket,
    description,
  }: CreateEventProps) => {
    try {
      console.log(name,
        img,
        date,
        location,
        price,
        category,
        classTicket,
        description,)
      const response = await api.post("/create-event", {
        name,
        img,
        date,
        location,
        price,
        category,
        classTicket,
        description,
      });
  
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 500;
        const message = error.response?.data?.message ?? "An error occurred while creating the event.";
        return { status, data: { message } };
      }
  
      return {
        status: 500,
        data: { message: "An unexpected error occurred." },
      };
    }
  };