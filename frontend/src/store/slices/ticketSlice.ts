import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ticketSelected{
        typeTicketSelected:string,
        multiplier:number,
        _idTicket:string
        numberOfTickets:number    
}

interface Ticket {
    _id:string,
    ticketSelected:ticketSelected[]
}

interface TicketState{
    tickets:Ticket[]
}


const initialState:TicketState = {
    tickets:[]
}

export const ticketSlice = createSlice({
    name:"ticket",
    initialState,
    reducers: {
        addTicket(state, action: PayloadAction<{ eventId: string; ticket: ticketSelected }>) {
          const { eventId, ticket } = action.payload;
          let eventInState = state.tickets.find((item) => item._id === eventId);
      
          if (!eventInState) {
            // Event not in state, create it
            state.tickets.push({
              _id: eventId,
              ticketSelected: [{ ...ticket, numberOfTickets: 1 }]
            });
          } else {
            // Check if ticket is already added
            const existingTicket = eventInState.ticketSelected.find((t) => t._idTicket === ticket._idTicket);
            if (existingTicket) {
              existingTicket.numberOfTickets += 1;
            } else {
              eventInState.ticketSelected.push({ ...ticket, numberOfTickets: 1 });
            }
          }
        },
      
        removeTicket(state, action: PayloadAction<{ eventId: string; ticket: ticketSelected }>) {
          const { eventId, ticket } = action.payload;
          const eventInState = state.tickets.find((item) => item._id === eventId);
      
          if (eventInState) {
            const ticketIndex = eventInState.ticketSelected.findIndex((t) => t._idTicket === ticket._idTicket);
            if (ticketIndex > -1) {
              const selected = eventInState.ticketSelected[ticketIndex];
              if (selected.numberOfTickets > 1) {
                selected.numberOfTickets -= 1;
              } else {
                eventInState.ticketSelected.splice(ticketIndex, 1);
              }
            }
      
            // Clean up the event if no more tickets
            if (eventInState.ticketSelected.length === 0) {
              state.tickets = state.tickets.filter((item) => item._id !== eventId);
            }
          }
        }
      }
      

})

export const { addTicket,removeTicket } = ticketSlice.actions;
export default ticketSlice.reducer;