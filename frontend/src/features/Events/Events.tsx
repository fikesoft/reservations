//Modules 
import { useEffect } from "react";
import classNames from "classnames";

//Custom hooks 
import useAppDispatch from "../../store/hooks/useDispach";
import useAppSelector from "../../store/hooks/useSelector";

//Redux reducers 
import { fetchEvents } from "../../store/slices/eventSlice";
import { showToast } from "../../store/slices/toastSlice";

//Custom components 
import { ApplyFilterInput ,Filter,Event} from "../../components";


import style from "./events.module.scss";

const Events = () => {
  const dispatch = useAppDispatch();
  const { events, status } = useAppSelector((state) => state.event);
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
      <h1> Catalog </h1>

      {/* Event List */}
      {events.length > 0 ? (
        <ul className={ "row g-5 justify-content-center"}>
          {events.map((event, index) => (  
            <Event event={event} index={index}/>
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
