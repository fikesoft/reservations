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
  