  //Modules 
  import { useEffect, useState } from "react";
  import classNames from "classnames";

  //Custom hooks 
  import useAppDispatch from "../../store/hooks/useDispach";
  import useAppSelector from "../../store/hooks/useSelector";

  //Redux reducers 
  import { fetchEvents } from "../../store/slices/eventSlice";
  import { showToast } from "../../store/slices/toastSlice";

  //Custom components 
  import { ApplyFilterInput ,Filter,Event, CreateForm, EditForm} from "../../components";


  import style from "./events.module.scss";
import { toggleMenu } from "../../store/slices/editSlice";

  const Events = () => {
    const [openCreateEventMenu,setOpenCreateEventMenu] = useState(false)
    const dispatch = useAppDispatch();
    const { events, status } = useAppSelector((state) => state.event);
    const { role } =useAppSelector((state)=>state.user)
    const { editMenuIsOpen } = useAppSelector((state)=>state.edit)
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
      <>
      <div
        className={classNames(style.sectionCatalog, "container d-flex flex-column gap-5 align-items-md-start align-items-center p-0") }
        style={{
          filter: openCreateEventMenu ? "blur(20px)" : "none",
          transition: "filter 0.3s ease" 
        }}
      >
        <ApplyFilterInput />
        <Filter />
        <h1> Catalog </h1>
        {role === "admin" ? <p 
        className="text-primary"
        onClick={()=>(setOpenCreateEventMenu((prev)=>!prev))}
        style={{cursor:"pointer"}}>Create event</p> : null}

        {/* Event List */}
        {events.length > 0 ? (
          <ul className={ "row g-5 justify-content-center"}>
            {events.map((event, index) => (  
              <Event event={event} index={index} key={index} />
            ))}
          </ul>
        ) : (
          <div className="text-center mt-5">
            <h4>No events found</h4>
          </div>
        )}
      </div>
    
      
      {openCreateEventMenu && (
        <div className={style.createEventWrapper}>
          <p
            onClick={() => setOpenCreateEventMenu((prev) => !prev)}
            className={style.closeButton}
          >
            ×
          </p>
          <CreateForm />
        </div>
      )}

      {editMenuIsOpen && (
        <div className={style.createEventWrapper}>
          <p
            onClick={() => dispatch(toggleMenu())}
            className={style.closeButton}
          >
            ×
          </p>
          <EditForm />
        </div>
      )}

      
      </>
    );
  };

  export default Events;
