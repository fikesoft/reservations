import style from "./eventPage.module.scss";

//Components
import { Favorite, IncreaseNumber } from '../../components';

//Modules 
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import useAppSelector from '../../store/hooks/useSelector';
import dayjs from 'dayjs';

//Icons
import { IoMapOutline } from 'react-icons/io5';
import { PiTicketLight } from "react-icons/pi";
import useAppDispatch from "../../store/hooks/useDispach";
import { showToast } from "../../store/slices/toastSlice";



const EventPage = () => {
  const dispatch = useAppDispatch()
  const { eventId } = useParams();
  const { events } = useAppSelector((state) => state.event);
  const { tickets } = useAppSelector ((state) => state.ticket) ;
  const event = events.find((item) => item._id === eventId);
  const eventClassTickets = event?.classTicket;
  
  
  const navigate = useNavigate();
  if (!event) {
    return <div>Event not found</div>;
  }
  const handleAddCart = () => {
    console.log(tickets);
    if (tickets.length > 0) {
      tickets.map((item) => {
        if (item._id === event._id) {
          navigate("/cart");
        }
      });
    } else {
      dispatch(showToast({type:"error",message:"To access the cart please select at least one ticket "}))
    }
  };
  return (
    <div className="container mt-4">
      <h1 className={classNames(style.title, "text-left")}>{event.name}</h1>

      <div className="row mt-4 justify-content-center gap-2">
        {/* Event Image */}
        <div className="col-lg-4 col-md-8 col-12" style={{ position: 'relative' }}>
          <img
            src={event.img}
            className="img-fluid"
            alt="Event Image"
            style={{ height: "100%" }}
          />
          <Favorite />
        </div>

        {/* Event Tickets */}
        <div className="col-md-8" style={{ maxWidth: '700px' }}>
          <div className="d-flex flex-column gap-1">
            {eventClassTickets && eventClassTickets.length > 0 ? (
              eventClassTickets.map((ticket, index) => (
                <div key={index} className="d-flex align-items-stretch border rounded mb-3">
                  <div
                    className="text-white text-center px-3 py-3 d-flex flex-column justify-content-center"
                    style={{ backgroundColor: '#4d194d' }}
                  >
                    <p className="mb-2 fw-bold">
                      {dayjs(event.date).format('D')}{' '}
                      {dayjs(event.date).format('MMMM')}
                    </p>
                    <p className="mb-2">{dayjs(event.date).format('dddd')}</p>
                  </div>
                  <div className="ms-4 w-100 d-flex flex-column justify-content-around">
                    <div className="d-flex flex-column gap-1">
                      <p className="fw-bold mb-1">{event.name}</p>
                      <p className="mb-1">{event.location.city || "Location not available"}</p>
                    </div>
                    <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start justify-content-sm-between gap-sm-0 gap-4">
                      <div className="d-flex flex-column gap-1">
                        <div className="d-flex gap-2 align-items-center">
                          <IoMapOutline />
                          <p>{event.location.street || "Plaza Sol"}</p>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                          <PiTicketLight size={24} />
                          <p className="fw-bold" style={{ color: '#4d194d' }}>
                            Class {ticket.type || "Not found"}
                          </p>
                        </div>
                      </div>
                      <IncreaseNumber
                        eventId={event._id}
                        ticket={{
                            _idTicket: ticket._id,
                            multiplier: ticket.multiplier,
                            typeTicketSelected: ticket.type,
                            numberOfTickets: 0, 
                        }}
                        price={event.price}
                        />


                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Information not found</p>
            )}
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div>
          <p>{event.description}</p>
        </div>
        <div className="d-flex justify-content-around mt-5">
          <button
            className="border rounded p-3"
            style={{ backgroundColor: 'white', border: '2px solid black' }}
            onClick={()=>{
                navigate("/events")
            }}
          >
            Go back
          </button>
          <button className="border rounded p-3 text-white" style={{ backgroundColor: '#4d194d' }} onClick={()=>{ handleAddCart()}}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
