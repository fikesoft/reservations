//Import modules 
import classNames from "classnames"
import dayjs from "dayjs"

//Icons 
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md"

//Custom hooks 
import useAppSelector from "../../store/hooks/useSelector"

//Style
import style from "./event.module.scss"

//Import favorite 
import Favorite from "../Favorite/Favorite"
import { useNavigate } from "react-router-dom"

interface EventProps {
    event: {
        _id:string
        img: string
        name: string
        location: {
            city: string
            street: string
        }
        date: string | Date
        price: number
    }
    index: number
}

const Event = ({ event, index }: EventProps) => {
    const { role } = useAppSelector((state) => state.user)
    const navigate = useNavigate();
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-7 d-flex flex-column align-items-sm-start align-items-center gap-2">
            {role === "admin" && (
                <div className="d-flex align-self-end gap-4">
                    <MdModeEditOutline
                        className="text-primary"
                        size={24}
                        onClick={() => console.log("Edit Event:", index)}
                    />
                    <MdDeleteForever
                        className="text-danger"
                        size={24}
                        onClick={() => console.log("Delete Event:", index)}
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
