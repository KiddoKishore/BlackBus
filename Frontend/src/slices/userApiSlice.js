import { USERS_URL, TICKET_URL,TRIPS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    tickets: builder.query({
      query: () => ({
        url: `${TICKET_URL}`
      }),
      keepUnusedDataFor: 5,
    }),
    cancel: builder.mutation({
      query: (id) => ({
        url: `${TICKET_URL}/${id}`,
        method: 'PUT'
      }),
      keepUnusedDataFor: 5,
    }),
    getTicket: builder.query({
      query: (id) => ({
        url: `${TICKET_URL}/${id}`
      }),
      keepUnusedDataFor: 5,
    }),
    getTrips: builder.query({
      query: ({data}) => ({
        url: `${TRIPS_URL}/?from=${data.from}&to=${data.to}&date=${data.date}`
      }),
      keepUnusedDataFor: 5,
    }), 
    }),
  })
export const { useLoginMutation,useRegisterMutation, useTicketsQuery, useCancelMutation, useGetTicketQuery, useGetTripsQuery } = usersApiSlice;
