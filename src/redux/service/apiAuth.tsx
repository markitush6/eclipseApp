import { API_URL } from "@const/api";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@models/model.auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiAuth = createApi({
  reducerPath: "apiAuth",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    Login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: "login/",
        method: "POST",
        body,
      }),
    }),
    Register: builder.mutation<LoginResponse, RegisterPayload>({
      query: (body) => ({
        url: "register/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = apiAuth;
