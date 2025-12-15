import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiMole = createApi({
  reducerPath: "apiMole",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  endpoints: (builder) => ({
    getMole: builder.query<any, void>({
      query: () => "character/?page=19",
    }),
  }),
});

export const { useGetMoleQuery } = apiMole;
