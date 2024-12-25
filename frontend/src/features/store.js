import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import { getAuthToken } from "../auth/authSlice";

const api = createApi({
  reducerPath: "api",
  baseQuery: () => {},
  endpoints: () => {},
});
