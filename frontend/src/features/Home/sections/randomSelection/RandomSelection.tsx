import styles from "./randomSelection.module.scss";
import classNames from "classnames";
import dayjs from 'dayjs';

import useAppSelector from "../../../../store/hooks/useSelector";
import useAppDispatch from "../../../../store/hooks/useDispach";
import { fetchEvents } from "../../../../store/slices/eventSlice";
import { showToast } from "../../../../store/slices/toastSlice";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { useEffect } from "react";
import { useNavigate ,Link } from "react-router-dom";
const RandomSelection = () => {
    const dispatch = useAppDispatch();
    const { role } = useAppSelector(state => state.user);
    const { events, status } = useAppSelector(state => state.event);
    const navigate = useNavigate();
    const {
        selectedPrice,
        selectedCountry,
        selectedDate,
        selectedCategory,
    } = useAppSelector((state) => state.filter);    // Fetch events if status is idle
    useEffect(() => {
        if (status === "idle") {
            dispatch(
                fetchEvents({
                    category: selectedCategory,
                    country: selectedCountry,
                    date: selectedDate,
                    price: selectedPrice.toString(),
                })
            );
        }
    }, [status, dispatch, selectedCategory, selectedCountry, selectedDate, selectedPrice]);

    if (status === "loading") {
        dispatch(showToast({ type: "info", message: "We are loading your special offer" }));
        return <div>Loading events...</div>;
    }

    if (status === "failed") {
        dispatch(showToast({ type: "error", message: "There was an error handling your event offer" }));
        return <div className="text-danger text-center mt-4">Failed to load events. Please try again later.</div>;
    }

    return (
        <section className="row d-flex flex-column align-items-center mt-5 w-100">
            {/* Title Row */}
            <div className="w-100 text-center">
                <h1 className={styles.titleRandom}>RANDOM SELECTION</h1>
            </div>

            <div className={classNames(styles.eventContainer, "d-flex flex-column align-items-center gap-4")}>
                {/* Image Row */}
                <div className="row d-flex flex-row justify-content-center flex-wrap w-100 gap-3 mt-5">
                    {!["failed", "loading"].includes(status) ? (
                        events.length === 0 ? (
                            <div className="text-center text-muted">
                                No events available at the moment.
                               <p> Maybe change your filters on the page <Link to={"/events"}>Events</Link></p>
                            </div>
                        ) : (
                            events.slice(0, 5).map((event, index) => (
                                <div key={index} className="col-lg-2 col-md-4 col-6 d-flex flex-column align-items-start gap-1">
                                    {/* If the user is admin then it shows admin options */}
                                    {role === "admin" && (
                                        <div className="d-flex align-self-end gap-4">
                                            <MdModeEditOutline className="text-primary" size={24} />
                                            <MdDeleteForever className="text-danger" size={24} />
                                        </div>
                                    )}
                                    <img
                                        className="img-fluid"
                                        src={event.img}
                                        alt="photoEvent"
                                        style={{
                                            maxWidth: "100%",
                                            filter: role === "guest" ? "blur(4px)" : "none",
                                            height: "auto"
                                        }}
                                    />
                                    <div
                                        className={classNames(styles.textEvent, "text-lg-start text-center mt-2")}
                                        style={{ filter: role === "guest" ? "blur(4px)" : "none" }}
                                    >
                                        <p>{event.name}</p>
                                        <p className="mb-1 mt-1">{event.location.city}, {event.location.street}</p>
                                        <p>{dayjs(event.date).format("ddd")}, {dayjs(event.date).format("D")}, {dayjs(event.date).format("MMM")}.</p>
                                        <p>From {event.price}$</p>
                                    </div>
                                </div>
                            ))
                        )
                    ) : (
                        <div className="text-center text-danger">Loading failed to get your special offers.</div>
                    )}
                </div>


                {/* Description & Button */}
                <div className={classNames(styles.textStyle, "col-lg-3 text-lg-start d-flex flex-column gap-4 text-center mt-4 w-100 mb-2")}>
                    <p className="text-center">Check out some of the most popular events coming up in your city, from festivals to small events.</p>
                    <button onClick={()=>{navigate("/events")}}>Browse events</button>
                </div>
            </div>
        </section>
    );
};

export default RandomSelection;
