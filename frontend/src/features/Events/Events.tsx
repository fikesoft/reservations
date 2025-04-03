import React, { useEffect } from "react";
import useAppDispatch from "../../store/hooks/useDispach";
import useAppSelector from "../../store/hooks/useSelector";
import { fetchEvents } from "../../store/slices/eventSlice"; // Adjust the path
import { CiLocationOn } from "react-icons/ci";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AiOutlineEuro } from "react-icons/ai";
import classNames from "classnames";
import style from "./events.module.scss"
import { TbVinyl } from "react-icons/tb";
import { LuRefreshCcw } from "react-icons/lu";

import dayjs from "dayjs";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { showToast } from "../../store/slices/toastSlice";

const Events = () => {
  const dispatch = useAppDispatch()
  const { events, status } = useAppSelector((state) => state.event);
  const { role } = useAppSelector(state => state.user);


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading events...</div>;
  }

  if (status === "failed") {
    dispatch(showToast({ type: "error", message: "There was an error handling your event offer" }));
    return <div className="text-danger text-center mt-4">Failed to load events. Please try again later.</div>;
  }
  return (
    <div className={classNames(style.sectionCatalog, "container d-flex flex-column gap-5  align-items-sm-start align-items-center p-0")}>
      {/*Filters */}
      <div className="d-flex flex-column  align-items-sm-start align-items-center gap-2">
        <div className="d-flex justify-content-start gap-4">

          <div className={classNames(style.filters, "d-flex align-items-center  gap-2 ")}>
            <CiLocationOn size={24} />
            <p>Location</p>
          </div>
          <div className={classNames(style.filters, "d-flex align-items-center  gap-2")}>
            <IoCalendarClearOutline size={24} />
            <p>Date</p>
          </div>
          <div className={classNames(style.filters, "d-flex  align-items-center gap-2")}>
            <AiOutlineEuro size={24} />
            <p>Price</p>
          </div>

        </div>

        <div>
          <div className={classNames(style.filters, "d-flex align-items-center  gap-2")}>
            <TbVinyl size={24} />
            <p>Caterogry of music </p>
          </div>
        </div>

        <div>
          <LuRefreshCcw />

        </div>

      </div>


      <h1 className="display-1">Catalog</h1>


      <ul className={classNames(style.catalogItems, "row g-5 justify-content-center")}>
        {events.map((event, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-7 d-flex flex-column  align-items-sm-start align-items-center   gap-2">
            {/* If the user is admin then it shows admin options */}
            {role === "admin" && (
              <div className="d-flex align-self-end gap-4">
                <MdModeEditOutline className="text-primary" size={24} />
                <MdDeleteForever className="text-danger" size={24} />
              </div>
            )}

            <img
              className="img-fluid w-100 "
              src={event.img}
              alt="photoEvent"
              style={{
                maxWidth: "100%",
                filter: role === "guest" ? "blur(4px)" : "none",
                height: "auto"
              }}
            />

            <div
              className={classNames(style.textEvent, "text-sm-start text-center mt-2")}
              style={{ filter: role === "guest" ? "blur(4px)" : "none" }}
            >
              <p>{event.name}</p>
              <p className="mb-1 mt-1">{event.location.city}, {event.location.street}</p>
              <p>{dayjs(event.date).format("ddd")}, {dayjs(event.date).format("D")}, {dayjs(event.date).format("MMM")}.</p>
              <p>From {event.price}$</p>

            </div>
            <button className={classNames(style.buttonBook)}>Book now</button>
          </div>
        ))}
      </ul>
    </div>
  );

}

export default Events