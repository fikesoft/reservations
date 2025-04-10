import classNames from "classnames";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import style from "./calendar.module.scss";
import useAppDispatch from "../../store/hooks/useDispach";
import useAppSelector from "../../store/hooks/useSelector";
import { setSelectedDate, toggleFilterOpenDate } from "../../store/slices/filterSlice";

interface CalendarProps {
  listEventDates: string[]; // Ensure this is an array of strings
}

const Calendar: React.FC<CalendarProps> = ({ listEventDates }) => {
  const now = new Date();
  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector((state) => state.filter);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [days, setDays] = useState<(number | null)[]>([]);

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  // Updated isAvailableDay function
  const isAvailableDay = (day: number): boolean => {
    const dateString = formatDate(currentYear, currentMonth, day);
    return listEventDates.includes(dateString);
  };

  const generateDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysArray: (number | null)[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
      daysArray.push(i);
    }

    setDays(daysArray);
  };

  useEffect(() => {
    generateDays();
  }, [currentMonth, currentYear]);

  const formatDate = (year: number, month: number, day: number) => {
    const formattedMonth = (month + 1).toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  return (
    <div className={classNames(style.calendar, "d-flex flex-column gap-2 align-items-center")}>
      <div className="d-flex justify-content-between gap-2" style={{ minWidth: "200px" }}>
        <MdKeyboardArrowLeft onClick={handlePreviousMonth} style={{ cursor: "pointer" }} />
        {monthNames[currentMonth]} {currentYear}
        <MdKeyboardArrowRight onClick={handleNextMonth} style={{ cursor: "pointer" }} />
      </div>

      <div className="d-flex flex-column align-items-center">
        {/* Day Names */}
        <div
          className="d-grid"
          style={{
            gridTemplateColumns: "repeat(7, 1fr)",
            width: "250px",
            textAlign: "center",
          }}
        >
          {dayNames.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div
          className="d-grid"
          style={{
            gridTemplateColumns: "repeat(7, 1fr)",
            width: "250px",
            gap: "4px",
            marginTop: "8px",
          }}
        >
          {days.map((day, index) => {
            const isAvailable = day !== null && isAvailableDay(day);

            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  textAlign: "center",
                  lineHeight: "24px",
                  backgroundColor: isAvailable ? "#B44CB4" : "transparent",
                  color: "black",
                  cursor: isAvailable ? "pointer" : "default",
                  borderRadius: "4px",
                }}
                className={isAvailable ? "text-light" : ""}
                onClick={() => {
                  if (isAvailable && day !== null) {
                    dispatch(setSelectedDate(formatDate(currentYear, currentMonth, day)));
                    dispatch(toggleFilterOpenDate());
                  }
                }}
              >
                {day ?? ""}
              </div>
            );
          })}
        </div>

        {/* Selected Date */}
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          {selectedDate ? `Selected Date: ${selectedDate}` : "No date selected"}
        </div>
      </div>
    </div>
  );
};

export default Calendar;