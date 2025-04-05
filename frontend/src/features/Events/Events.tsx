import React, { useEffect, useState } from "react";
import useAppDispatch from "../../store/hooks/useDispach"; // Fixed typo in import
import useAppSelector from "../../store/hooks/useSelector";
import { fetchEvents } from "../../store/slices/eventSlice";
import { CiLocationOn } from "react-icons/ci";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AiOutlineEuro } from "react-icons/ai";
import classNames from "classnames";
import style from "./events.module.scss";
import { TbVinyl } from "react-icons/tb";
import { LuRefreshCcw } from "react-icons/lu";
import { ApplyFilterInput, Calendar } from "../../components";
import dayjs from "dayjs";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { showToast } from "../../store/slices/toastSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  setSelectedPrice,
  setSelectedCountry,
  toggleFilterOpenCountry,
  toggleFilterOpenDate,
  toggleFilterOpenPrice,
  setSelectedCategory,
  toggleFilterOpenCategory,
} from "../../store/slices/filterSlice";

const Events = () => {
  const dispatch = useAppDispatch();
  const { events, status } = useAppSelector((state) => state.event);
  const { role } = useAppSelector((state) => state.user);
  const {
    selectedPrice,
    selectedCountry,
    selectedDate,
    selectedCategory,
    filterOpenCountry,
    filterOpenDate,
    filterOpenPrice,
    filterOpenCategory
  } = useAppSelector((state) => state.filter);

  const [options, setOptions] = useState<string[]>([]);
  const [eventDays, setEventDays] = useState<Date[]>([]);
  const [category,setCategory] = useState<string[]>([])
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(0);

  // Fetch events if status is idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded" && events.length > 0) {
      // Extract unique countries
      const uniqueCountries = Array.from(
        new Set(events.map((e) => e.location?.country))
      );

      const uniqueCategory= Array.from(
        new Set(events.map((e) => e.category))
      )

      // Create unique event dates
      const uniqueEventDays = Array.from(
        new Set(events.map((event) => dayjs(event.date).format("YYYY-MM-DD")))
      ).map((dateString) => new Date(dateString));

      // Extract price range
      const priceRange = events.map((event) => event.price);
      const minPrice = Math.min(...priceRange);
      const maxPrice = Math.max(...priceRange);

      

      // Update state
      setOptions(uniqueCountries);
      setCategory(uniqueCategory)
      setEventDays(uniqueEventDays);
      setMinRange(minPrice);
      setMaxRange(maxPrice);
      dispatch(setSelectedPrice(minPrice)); // Ensure default price is set
    }
  }, [status, events, dispatch]);

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
      <ApplyFilterInput/>
      {/* Filters */}
      <div className="d-flex  flex-lg-row flex-column align-items-md-start  justify-content-between gap-5">
          <div className="d-flex  flex-wrap justify-content-lg-start justify-content-center gap-4">
            {/* Location Filter-----------------------------------------*/}
            <div
              className={classNames(style.filters, "d-flex flex-column align-items-center  justify-content-start gap-2")}
            >
              <div
                className="d-flex gap-3 cursor-pointer"
                onClick={() => dispatch(toggleFilterOpenCountry())}
              >
                <CiLocationOn size={24} />
                <p className="mt-1">Location</p>
                {selectedCountry && <span>{selectedCountry}</span>}
              </div>
              {filterOpenCountry && (
                <div className="d-flex align-items-center gap-2">
                  <div className={style.filterLocationWrapper}>
                    <select
                      className={classNames(style.filterLocation, "text-center")}
                      onChange={(e) =>{
                        dispatch(setSelectedCountry(e.target.value)),dispatch(toggleFilterOpenCountry())}
                      }
                      value={selectedCountry}
                    >
                      <option value="" disabled>
                        Select a country
                      </option>
                      {options.map((country, index) => (
                        <option key={`${country}-${index}`} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              <RiArrowDropDownLine />
            </div>
            {/* Location Filter-----------------------------------------end*/}


            {/* Date Filter-----------------------------------------*/}
            <div
              className={classNames(style.filters, "d-flex   align-items-center justify-content-start gap-2")}
            >
              <div
                className="d-flex gap-3 cursor-pointer"
                onClick={() => dispatch(toggleFilterOpenDate())}
              >
                <IoCalendarClearOutline size={24} />
                <p>Date</p>
                {selectedDate && <span>{selectedDate}</span>}
              </div>
            </div>
            {filterOpenDate && <Calendar listEventDates={eventDays} />}
            {/* Date Filter-----------------------------------------end*/}

            {/* Price Filter -----------------------------------------*/}
            <div
              className={classNames(style.filters, "d-flex flex-column align-items-center  justify-content-start gap-2")}
            >
              <div
                className="d-flex gap-3 cursor-pointer"
                onClick={() => dispatch(toggleFilterOpenPrice())}
              >
                <AiOutlineEuro size={24} />
                <p className="mt-1">Price</p>
                {selectedPrice !== 0 && (
                  <span className="d-flex gap-2">
                    <p style={{ minWidth: "40px" }}>{selectedPrice}</p>$
                  </span>
                )}
              </div>
              {filterOpenPrice && (
                <input
                  type="range"
                  min={minRange}
                  max={maxRange}
                  value={selectedPrice}
                  onChange={(e) =>
                    dispatch(setSelectedPrice(Number(e.target.value)))
                  }
                  className={style.rangeInput}
                />
              )}
            </div>
            {/*Price Filter -----------------------------------------end*/}

            {/*Category Filter -----------------------------------------*/}
            <div
              className={classNames(style.filters, "d-flex flex-column align-items-center justify-content-start gap-2")}
            >
              <div className="d-flex gap-2" onClick={()=>{dispatch(toggleFilterOpenCategory())}}>
                <TbVinyl size={24} />
                <p>Category of music</p>
                {selectedCategory && <span>{selectedCategory}</span>}

              </div>
             
              {
                filterOpenCategory && (
                  <select
                      className={classNames(style.filterLocation, "text-center")}
                      onChange={(e) =>{
                        dispatch(setSelectedCategory(e.target.value)),dispatch(toggleFilterOpenCategory())}
                      }
                      value={selectedCategory}
                    >
                    <option value="" disabled>
                        Select a category
                      </option>
                      {category.map((category, index) => (
                        <option key={`${category}-${index}`} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                )
              }
              <RiArrowDropDownLine />
            </div>
            {/*Category Filter -----------------------------------------end*/}


          </div>

        {/* Refresh Button */}
        <div className="d-flex flex-column text-start justify-content-center align-items-center">
          <p  className="text-center" style={{maxWidth:"80px"}}>Refresh the events</p>
          <LuRefreshCcw
            size={24}
            className="mt-2 cursor-pointer"
            style={{ opacity: "50%" ,cursor:"pointer"}}
            onClick={() => {
              dispatch(fetchEvents());
              dispatch(
                showToast({ type: "info", message: "Reloading the events" })
              );
            }}
          />
        </div>
      </div>



      <h1 className="">Catalog</h1>



      {/* Event List */}
      <ul
        className={classNames(style.catalogItems, "row g-5 justify-content-center")}
      >
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
    </div>
  );
};

export default Events;