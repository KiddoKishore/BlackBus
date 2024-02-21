import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trips: localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : [],
    selectedTrip: null,
    ticket: localStorage.getItem('ticket') ? JSON.parse(localStorage.getItem('ticket')) : null
};

const tripSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        getTrips: (state, action) => {
            state.trips = action.payload;
            localStorage.setItem('trips', JSON.stringify(action.payload));
        },
        selectTrip: (state, action) => {
            state.selectedTrip = action.payload; 
            localStorage.setItem('selectedTrip', JSON.stringify(action.payload));
        },
        getTicket: (state, action) => {
            state.ticket = action.payload;
            localStorage.setItem('ticket', JSON.stringify(action.payload));
        }
    }
});

export const { getTrips, selectTrip, getTicket } = tripSlice.actions;

export default tripSlice.reducer;
