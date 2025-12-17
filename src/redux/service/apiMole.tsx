import { API_URL } from "@const/api";
import { HistoryModel, MoleModelResponse } from "@models/models.mole";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiMole = createApi({
  reducerPath: "apiMole",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    postMoleIa: builder.mutation<MoleModelResponse, FormData>({
      query: (formData) => ({
        url: "analysis_result/",
        method: "POST",
        body: formData,
      }),
    }),
    postMole: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "upload_image/",
        method: "POST",
        body: formData,
      }),
    }),
    getMoles: builder.query<HistoryModel[], number>({
      query: (id) => ({
        url: `history?user_id=${id}`,
      }),
    }),
  }),
});

export const { usePostMoleIaMutation, usePostMoleMutation, useGetMolesQuery } =
  apiMole;
