import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { readEvents } from "../../api/eventApi";

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
  _id:string
}
interface EventState {
  events: EventsInterface[]; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
} 
// Async thunk to fetch events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (
    filters: {
      category?: string;
      country?: string;
      date?: string;
      price?: string;
    },
    { rejectWithValue }
  ) => {
    const response = await readEvents(filters);
    
    if (response.status === 200 && 'allEvents' in response.data) {
      return response.data.allEvents;
    }

    return rejectWithValue(response.data.message || "Failed to fetch events");
  }
);



const initialState: EventState = {
    events: [],
    status: "idle",
    error: null,
  };

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        // Type-safe error extraction
        state.error = typeof action.payload === "string"
          ? action.payload
          : action.error.message ?? "An unknown error occurred";
      });
  },
});

export default eventSlice.reducer;
