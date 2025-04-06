import React, { useEffect } from "react";
import useAppDispatch from "../../store/hooks/useDispach";
import useAppSelector from "../../store/hooks/useSelector";
import { fetchEvents } from "../../store/slices/eventSlice";
import classNames from "classnames";
import style from "./events.module.scss";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { showToast } from "../../store/slices/toastSlice";
import { ApplyFilterInput } from "../../components";
import Filter from "../../components/Filter/Filter";
import dayjs from "dayjs";

const Events = () => {
  const dispatch = useAppDispatch();
  const { events, status } = useAppSelector((state) => state.event);
  const { role } = useAppSelector((state) => state.user);
  const {
    selectedPrice,
    selectedCountry,
    selectedDate,
    selectedCategory
  } = useAppSelector((state) => state.filter);

  const fetchActualEvents = () => {
    dispatch(
      fetchEvents({
        category: selectedCategory,
        country: selectedCountry,
        date: selectedDate,
        price: selectedPrice.toString(),
      })
    );
  };

  useEffect(() => {
    if (status === "idle") {
      fetchActualEvents();
    }
  }, [status, dispatch, selectedCategory, selectedCountry, selectedDate, selectedPrice]);

  if (status === "loading") {
    return <div>Loading events...</div>;
  }

  if (status === "failed") {
    dispatch(showToast({ type: "error", message: "Failed to load events." }));
    return (
      <div className="text-danger text-center mt-4">
        Failed to load events. Please try again later.
      </div>
    );
  }

  return (
    <div
      className={classNames(style.sectionCatalog, "container d-flex flex-column gap-5 align-items-md-start align-items-center p-0")}
    >
      <ApplyFilterInput />
      <Filter />
      <h1 >Catalog</h1>

      {/* Event List */}
      {events.length > 0 ? (
        <ul className={classNames(style.catalogItems, "row g-5 justify-content-center")}>
          {events.map((event, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-4 col-sm-6 col-7 d-flex flex-column align-items-sm-start align-items-center gap-2"
            >
              {role === "admin" && (
                <div className="d-flex align-self-end gap-4">
                  <MdModeEditOutline
                    className="text-primary"
                    size={24}
                    onClick={() => console.log("Edit Event:", event)}
                  />
                  <MdDeleteForever
                    className="text-danger"
                    size={24}
                    onClick={() => console.log("Delete Event:", event)}
                  />
                </div>
              )}

              <img
                className="img-fluid w-100"
                src={event.img}
                alt="photoEvent"
                style={{
                  maxWidth: "100%",
                  filter: role === "guest" ? "blur(4px)" : "none",
                  height: "auto",
                }}
              />

              <div
                className={classNames(style.textEvent, "text-sm-start text-center mt-2")}
                style={{ filter: role === "guest" ? "blur(4px)" : "none" }}
              >
                <p>{event.name}</p>
                <p className="mb-1 mt-1">
                  {event.location.city}, {event.location.street}
                </p>
                <p>
                  {dayjs(event.date).format("ddd")},{" "}
                  {dayjs(event.date).format("D")},{" "}
                  {dayjs(event.date).format("MMM")}.
                </p>
                <p>From {event.price}$</p>
              </div>
              <button className={classNames(style.buttonBook)}>Book now</button>
            </div>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-5">
          <h4>No events found</h4>
        </div>
      )}
    </div>
  );
};

export default Events;
