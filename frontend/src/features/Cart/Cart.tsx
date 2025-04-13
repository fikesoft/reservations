import dayjs from "dayjs";
import useAppSelector from "../../store/hooks/useSelector";
import style from "../Event Page/eventPage.module.scss";
import classNames from "classnames";
import { IncreaseNumber } from "../../components";
import { IoMapOutline } from "react-icons/io5";
import { PiTicketLight } from "react-icons/pi";

const Cart = () => {
  const { tickets } = useAppSelector((state) => state.ticket);
  const { events } = useAppSelector((state) => state.event);

  // Calculate total cart price
  const totalPrice = tickets.reduce((total, ticket) => {
    const event = events.find((e) => e._id === ticket._id);
    if (!event) return total;
    return (
      total +
      ticket.ticketSelected.reduce((sum, category) => {
        return sum + category.multiplier * event.price * category.numberOfTickets;
      }, 0)
    );
  }, 0);

  return (
    <div className="container mt-4">
      {tickets.length > 0 ? (
        <>
          <h1 style={{color: '#4d194d'}} className={classNames(style.title, "text-left")}>Your Tickets</h1>
          <div className="d-flex  justify-content-center gap-4 flex-wrap">
            {tickets.map((ticket, index) => {
              const event = events.find((e) => e._id === ticket._id);
              if (!event) return null;

              return (
                <div key={index} className="d-flex  border rounded p-3  align-items-center gap-4" style={{maxWidth:"500px"}}>
                  <img
                    src={event.img}
                    alt={event.name}
                    className="img-fluid"
                    style={{ maxWidth: "200px", objectFit: "cover" }}
                  />
                  <div className="d-flex flex-column">
                    <h3 className="fw-bold" style={{color: '#4d194d'}}>{event.name}</h3>

                    <div className="d-flex flex-column">
                       <div className="d-flex gap-2 align-items-center">
                            <IoMapOutline /> 
                            <p>{event.location.country}</p>
                        </div>

                        <div className="d-flex gap-2 align-items-centers"> 
                            <PiTicketLight />
                            <p>{event.location.street}</p>
                        </div>
                    </div>

                    <div className="d-flex gap-2 mb-2">
                      <p>{dayjs(event.date).format("dddd")},</p>
                      <p>{dayjs(event.date).format("D")},</p>
                      <p>{dayjs(event.date).format("MMMM")}</p>
                    </div>

                    <div className="d-flex flex-column gap-2 mt-2">
                      {ticket.ticketSelected?.map((category, i) => (
                        <div key={i} className="d-flex flex-column">
                          <p>
                            {category.numberOfTickets} x {category.typeTicketSelected} = €
                            {category.multiplier * event.price * category.numberOfTickets}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                  </div>
                </div>
              );
            })}
            

          </div>
          <div className="mt-4 text-end">
            <h4 className="fw-bold">Total: €{totalPrice.toFixed(2)}</h4>
          </div>
        </>
      ) : (
        <h1 className="text-center">Sorry, add some items to your cart.</h1>
      )}
    </div>
  );
};

export default Cart;
