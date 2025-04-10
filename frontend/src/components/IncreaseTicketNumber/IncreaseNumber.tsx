import useAppDispatch from "../../store/hooks/useDispach";
import { addTicket, removeTicket } from "../../store/slices/ticketSlice";
import useAppSelector from "../../store/hooks/useSelector";

// Interface for the selected ticket
interface ticketSelected {
  typeTicketSelected: string;
  multiplier: number;
  _idTicket: string;
  numberOfTickets: number;
}

interface IncreaseNumberProps {
  eventId: string; 
  ticket: ticketSelected;
  price:number; 
}

const IncreaseNumber = ({ eventId, ticket,price }: IncreaseNumberProps) => {
    const ticketCount = useAppSelector((state) => {
        // state.ticket is the slice from your Redux store
        const eventInTicket = state.ticket.tickets.find((e) => e._id === eventId);
        if (!eventInTicket) return 0;
      
        // Here 'ticket' is the component prop
        const ticketData = eventInTicket.ticketSelected.find(
          (t) => t._idTicket === ticket._idTicket
        );
        return ticketData?.numberOfTickets || 0;
      });
      
    
      const dispatch = useAppDispatch();
    
      const handleAdd = () => {
        dispatch(addTicket({ eventId, ticket }));
      };
    
      const handleRemove = () => {
        dispatch(removeTicket({ eventId, ticket }));
      };

  return (
    <div className="d-flex flex-sm-column flex-row align-items-center align-items-sm-end justify-content-between gap-2 mx-sm-2 my-2 mx-0 w-100">
      <p className="mb-0 text-center">From {price * ticket.multiplier}$ / person</p>
      <div
        className="d-flex align-items-center justify-content-between rounded-pill px-3 py-1"
        style={{ backgroundColor: "#4d194d", width: "120px" }}
      >
        <button
          className="btn p-0 border-0 text-white d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "transparent",
            width: "30px",
            height: "30px",
            fontSize: "18px",
          }}
          onClick={handleRemove} 
        >
          -
        </button>
        <span className="text-white fs-6">{ticketCount}</span> 
        <button
          className="btn p-0 border-0 text-white d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "transparent",
            width: "30px",
            height: "30px",
            fontSize: "18px",
          }}
          onClick={handleAdd} 
        >
          +
        </button>
      </div>
    </div>
  );
};

export default IncreaseNumber;
