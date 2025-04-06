//Style
import style from "./filter.module.scss"
//Library
import classNames from 'classnames'
import { useEffect, useState } from "react"
import dayjs from "dayjs"
//Custom hooks 
import useAppDispatch from '../../store/hooks/useDispach'
import useAppSelector from '../../store/hooks/useSelector'
//Route request 
import { readEvents } from "../../api/eventApi"
//Reducers toggleres 
import {
    toggleFilterOpenCategory,
    toggleFilterOpenCountry,
    toggleFilterOpenDate,
    toggleFilterOpenPrice
}
    from '../../store/slices/filterSlice'

//Import setters of the filters 
import {
    setSelectedCategory,
    setSelectedCountry,
    setSelectedDate,
    setSelectedPrice
} from "../../store/slices/filterSlice"
//Import global value menu setters 
import {
    setAllCategories,
    setAllCountries,
    setAllDates,
    setMaxPrice,
    setMinPrice
} from "../../store/slices/filterSlice"

//Icons
import { CiLocationOn } from "react-icons/ci"
import { IoCalendarClearOutline } from "react-icons/io5"
import { AiOutlineEuro } from "react-icons/ai"
import { TbVinyl } from "react-icons/tb"

//Components 
import Calendar from "../CalendarFilter/Calendar"
 
const Filter = () => {
    interface ClassTicketInterface {
        type: string,
        multiplier: number,
        _id: string
    }
    interface LocationEventInterface {
        city: string,
        country: string,
        street: string
    }

    interface EventsInterface {
        category: string,
        classTicket: ClassTicketInterface[],
        date: string,
        description: string,
        img: string,
        location: LocationEventInterface
        name: string,
        price: number
        _id: string
    }

    const [events, setEvents] = useState<EventsInterface[]>([]);
    //Custom hooks
    const dispatch = useAppDispatch();

    //Global states selectedStates
    const {
        selectedCategory,
        selectedCountry,
        selectedDate,
        selectedPrice } = useAppSelector((state) => state.filter)

    //Global states of menu
    const {
        filterOpenCategory,
        filterOpenCountry,
        filterOpenDate,
        filterOpenPrice
    } = useAppSelector((state) => state.filter)
    //Global states of the menu values
    const {
        allCategories,
        allCountries,
        allDates,
        minPrice,
        maxPrice
    } = useAppSelector((state) => state.filter)

    const fetchSelectorsValues = async () => {
        const response = await readEvents({});
        if (response.status === 200 && 'allEvents' in response.data) {
            const arrayEvents = response.data.allEvents;

            // You *can* store this in state if needed for local usage
            setEvents(arrayEvents);

            // Prices
            const priceRangeArray = arrayEvents.map((event) => event.price);
            const minPriceFetched = Math.min(...priceRangeArray);
            const maxPriceFetched = Math.max(...priceRangeArray);

            // Countries, Categories, Dates
            const allCountriesArray = Array.from(new Set(arrayEvents.map(e => e.location.country)));
            const allCategoriesArray = Array.from(new Set(arrayEvents.map(e => e.category)));
            const allDatesArray = Array.from(
                new Set(arrayEvents.map((event) => dayjs(event.date).format("YYYY-MM-DD")))
            ).map((dateString) => new Date(dateString));

            // Dispatch everything at once
            dispatch(setAllCategories(allCategoriesArray));
            dispatch(setAllCountries(allCountriesArray));
            dispatch(setAllDates(allDatesArray));
            dispatch(setMinPrice(minPriceFetched));
            dispatch(setMaxPrice(maxPriceFetched));
            dispatch(setSelectedPrice(minPriceFetched)); // optional default price selection
        }
    }
    useEffect(() => {
        fetchSelectorsValues();
    }, []);


    return (
        <div className={classNames(style.filterAndRefreshContainer, "d-flex  flex-lg-row flex-column align-items-md-start  justify-content-between gap-5")}>
            {/*Every filter container */}
            <div className={classNames("d-flex  flex-wrap justify-content-lg-start justify-content-center gap-4")}>

                {/*Filter location------ */}
                <div className={classNames(style.filters, "d-flex flex-column align-items-center  justify-content-start gap-2")}>
                    {/*Filter location container------ */}
                    <div className="d-flex flex-column gap-3 cursor-pointer">
                        <div className="d-flex gap-3 cursor-pointer" onClick={() => dispatch(toggleFilterOpenCountry())}>
                            <CiLocationOn size={24} />
                            <p className="mt-1">Country</p>
                        </div>

                        {selectedCountry && <span>{selectedCountry}</span>}
                        {/**Conditional rendering of the slect */}
                        {filterOpenCountry && (
                            <div className="d-flex align-items-center gap-2">
                                <div className={style.filterLocationWrapper}>
                                    <select
                                        className={classNames(style.filterLocation, "text-center")}
                                        onChange={(e) => {
                                            dispatch(setSelectedCountry(e.target.value)), dispatch(toggleFilterOpenCountry())
                                        }
                                        }
                                        value={selectedCountry}
                                    >

                                        <option value="" disabled>
                                            Select a country
                                        </option>

                                        {allCountries.map((country, index) => (
                                            <option key={`${country}-${index}`} value={country}>
                                                {country}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                        //Conditional rendering of the slect---------end
                        )}
                    {/**Filter location container------end */}
                    </div>
                {/**Filter location ------end */}
                </div>

                {/**Filter date and calendar  */}
                <div className={classNames(style.filters, "d-flex   align-items-center justify-content-start gap-2")}>
                    <div className="d-flex gap-3 cursor-pointer" onClick={() => dispatch(toggleFilterOpenDate())}>
                        <IoCalendarClearOutline size={24} />
                        <p>Date</p>
                        {selectedDate && <span>{selectedDate}</span>}
                    </div>
                </div>
                {filterOpenDate && <Calendar listEventDates={allDates}/>}
                {/**Filter date and calendar------- end  */}
                <div className={classNames(style.filters, "d-flex flex-column align-items-center  justify-content-start gap-2")}>
                    <div className="d-flex gap-3 cursor-pointer" onClick={() => dispatch(toggleFilterOpenPrice())} >
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
                        min={minPrice}
                        max={maxPrice}
                        value={selectedPrice}
                        onChange={(e) =>
                            dispatch(setSelectedPrice(Number(e.target.value)))
                        }
                        className={style.rangeInput}
                        />
                    )}
                </div>

                <div className={classNames(style.filters, "d-flex flex-column align-items-center justify-content-start gap-2")}>
                    <div className="d-flex gap-2" onClick={()=>{dispatch(toggleFilterOpenCategory())}}>
                        <TbVinyl size={24} />
                        <p>Category of music</p>
                        {selectedCategory && <span>{selectedCategory}</span>}
                    </div>
             
                    {filterOpenCategory && (
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
                            {allCategories.map((category, index) => (
                                <option key={`${category}-${index}`} value={category}>
                                {category}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

            </div>

        </div>
    )
}

export default Filter