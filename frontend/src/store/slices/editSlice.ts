import { createSlice,PayloadAction } from "@reduxjs/toolkit";
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
  interface EditMenu  {
    editMenuIsOpen: boolean;
    eventData: EditEventProps | null;
  }

  const initialState: EditMenu = {
    editMenuIsOpen: false,
    eventData: null
  };

  export const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
      toggleMenu: (state) => {
        state.editMenuIsOpen = !state.editMenuIsOpen;
        if (!state.editMenuIsOpen) {
          state.eventData = null; 
        }
      },
      setEventData: (state, action: PayloadAction<{ eventDataProp: EditEventProps }>) => {
        state.eventData = action.payload.eventDataProp;
      }
    }
  });
  
export const {toggleMenu,setEventData} = editSlice.actions;
export default editSlice.reducer;