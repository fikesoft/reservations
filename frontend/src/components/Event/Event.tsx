//Import modules 
import classNames from "classnames"
import dayjs from "dayjs"

//Icons 
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md"

//Custom hooks 
import useAppSelector from "../../store/hooks/useSelector"
import useAppDispatch from "../../store/hooks/useDispach"

//Style
import style from "./event.module.scss"

//Import favorite 
import Favorite from "../Favorite/Favorite"
import { useNavigate } from "react-router-dom"

//Import api function
import { deleteEvent } from "../../api/eventApi"
import { showToast } from "../../store/slices/toastSlice"
import { fetchEvents } from "../../store/slices/eventSlice"
import { toggleMenu, setEventData } from "../../store/slices/editSlice"
interface EventProps {
    event: {
        _id:string;
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
    index: number
}

const Event = ({ event, index }: EventProps) => {
    const { role } = useAppSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleDelete = async () => {
        try {
          const response = await deleteEvent(event._id);
          console.log("Event deleted:", response);
          dispatch(showToast({ type: "success", message: "Event deleted successfully" }));
          dispatch(fetchEvents({}))
        } catch (error) {
          dispatch(showToast({ type: "error", message: "Failed to delete event" }));
        }
      };
      const editEventProps ={
        _id:event._id,
        name: event.name,
        img: event.img,
        date: event.date,
        location: {
          country: event.location.country,
          city: event.location.city,
          street: event.location.street,
        },
        price: event.price,
        category: event.category,
        classTicket: event.classTicket,
        description: event.description ,
      } 
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-7 d-flex flex-column align-items-sm-start align-items-center gap-2" key={index}>
            {role === "admin" && (
                <div className="d-flex align-self-end gap-4">
                    <MdModeEditOutline
                        className="text-primary"
                        style={{cursor:"pointer"}}

                        size={24}
                        onClick={() => {dispatch(setEventData({ eventDataProp: editEventProps })),dispatch(toggleMenu())}}
                    />
                    <MdDeleteForever
                        className="text-danger"
                        style={{cursor:"pointer"}}
                        size={24}
                        onClick={() => handleDelete()}
                    />
                </div>
            )}
            <div
                className="image-container"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%', 
                }}
            >
                <img
                    className="img-fluid"
                    src={event.img}
                    alt="photoEvent"
                    style={{
                        maxWidth: '100%', 
                        filter: role === 'guest' ? 'blur(4px)' : 'none',
                        display: 'block', 
                    }}
                />
                {/**During the mapping 
                 * of the events every component will have his own state so this allows 
                 * to avoid localStorage use if we want to store while the session   */}
                <Favorite />
            </div>
            <div
                className={classNames("text-sm-start text-center mt-2 event-details")}
                style={{ filter: role === 'guest' ? 'blur(4px)' : 'none' }}
            >
                <p>{event.name}</p>
                <p className="mb-1 mt-1">
                    {event.location.city}, {event.location.street}
                </p>
                <p>
                    {dayjs(event.date).format('ddd')},{' '}
                    {dayjs(event.date).format('D')},{' '}
                    {dayjs(event.date).format('MMM')}.
                </p>
                <p>From {event.price}$</p>
            </div>
            <button className={classNames(style.buttonBook)} onClick={()=>{navigate(`/event-page/${event._id}`)}}>Book now</button>
        </div>
    )
}
export default Event
