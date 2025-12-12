import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiMole = createApi({
  reducerPath: "apiMole",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getMole: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetMoleQuery } = apiMole;
