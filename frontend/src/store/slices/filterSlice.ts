import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the filter state
interface FilterState {
  selectedPrice: number;
  selectedCountry: string;
  selectedDate: string;
  selectedCategory: string;
  filterOpenCountry: boolean;
  filterOpenPrice: boolean;
  filterOpenDate: boolean;
  filterOpenCategory: boolean;
}

// Define the initial state using the FilterState interface
const initialState: FilterState = {
  selectedPrice: 0,
  selectedCountry: "",
  selectedDate: "",
  selectedCategory: "",
  filterOpenCountry: false,
  filterOpenPrice: false,
  filterOpenDate: false,
  filterOpenCategory: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSelectedPrice: (state, action: PayloadAction<number>) => {
      state.selectedPrice = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    toggleFilterOpenCountry: (state) => {
      state.filterOpenCountry = !state.filterOpenCountry;
    },
    toggleFilterOpenPrice: (state) => {
      state.filterOpenPrice = !state.filterOpenPrice;
    },
    toggleFilterOpenDate: (state) => {
      state.filterOpenDate = !state.filterOpenDate;
    },
    toggleFilterOpenCategory: (state) => {
      state.filterOpenCategory = !state.filterOpenCategory;
    },
    resetFilters: (state) => {
      state.selectedPrice = 0;
      state.selectedCountry = "";
      state.selectedDate = "";
      state.selectedCategory = "";
    },
  },
});

export const {
  setSelectedPrice,
  setSelectedCountry,
  setSelectedDate,
  setSelectedCategory,
  toggleFilterOpenCountry,
  toggleFilterOpenPrice,
  toggleFilterOpenDate,
  toggleFilterOpenCategory,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
