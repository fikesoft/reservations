import { MdClose } from "react-icons/md";
import useAppDispatch from "../../store/hooks/useDispach";
import useAppSelector from "../../store/hooks/useSelector";
import { showToast } from "../../store/slices/toastSlice";
import {
  setSelectedPrice,
  setSelectedCategory,
  setSelectedCountry,
  setSelectedDate,
  resetFilters
} from "../../store/slices/filterSlice";

import styles from "./ApplyFilterInput.module.scss"; // assuming SCSS module is named this way

const ApplyFilterInput = () => {
  const dispatch = useAppDispatch();
  const {
    selectedPrice,
    selectedCountry,
    selectedDate,
    selectedCategory,
  } = useAppSelector((state) => state.filter);

  // Check if all filters are empty
  const noFiltersApplied =
    selectedPrice === 0 && !selectedCountry && !selectedDate && !selectedCategory;

  return (
    <div className={`d-flex gap-4 align-items-center justify-content-center flex-wrap p-3 ${styles.filterWrapper}`}>
      <div>
        <button className={`btn btn-sm ${styles.customBtn}`} onClick={()=>{dispatch(resetFilters()),dispatch(showToast({type:"success",message:"Filter succesfully reset"}))}}>Reset filter</button>
      </div>
      <div className="d-flex gap-3 flex-wrap">
        {noFiltersApplied && (
          <div className={styles.noFiltersText}>No filters applied</div>
        )}
        {selectedPrice !== 0 && (
          <div className={styles.filterChip}>
            <MdClose className={styles.closeIcon} onClick={() =>{ dispatch(setSelectedPrice(0)),dispatch(showToast({type:"success",message:"Filter succesfully delted"}))}} />
            <span>{selectedPrice}</span>
          </div>
        )}
        {selectedCountry && (
          <div className={styles.filterChip}>
            <MdClose className={styles.closeIcon} onClick={() => {dispatch(setSelectedCountry(""),dispatch(showToast({type:"success",message:"Filter succesfully delted"})))}} />
            <span>{selectedCountry}</span>
          </div>
        )}
        {selectedDate && (
          <div className={styles.filterChip}>
            <MdClose className={styles.closeIcon} onClick={() => {dispatch(setSelectedDate("")),dispatch(showToast({type:"success",message:"Filter succesfully delted"})) } }/>
            <span>{selectedDate}</span>
          </div>
        )}
        {selectedCategory && (
          <div className={styles.filterChip}>
            <MdClose className={styles.closeIcon} onClick={() => {dispatch(setSelectedCategory("")),dispatch(showToast({type:"success",message:"Filter succesfully delted"}))}} />
            <span>{selectedCategory}</span>
          </div>
        )}
      </div>

      <div >
        <button className={`btn btn-sm ${styles.customBtn}`}>Apply Filters</button>
      </div>
    </div>
  );
};

export default ApplyFilterInput;
