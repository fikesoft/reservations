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
  allCountries: string[];
  allCategories: string[];
  allDates: string[];
  minPrice: number;
  maxPrice: number;
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
  allCountries:[],
  allCategories:[],
  allDates:[],
  minPrice:0,
  maxPrice:0
    
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
    setAllCountries: (state, action: PayloadAction<string[]>) => {
      state.allCountries = action.payload;
    },
    setAllCategories: (state, action: PayloadAction<string[]>) => {
      state.allCategories = action.payload;
    },
    setAllDates: (state, action: PayloadAction<string[]>) => {
      state.allDates = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    }
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
  setAllCountries,
  setAllCategories,
  setAllDates,
  setMaxPrice,
  setMinPrice
} = filterSlice.actions;

export default filterSlice.reducer;
