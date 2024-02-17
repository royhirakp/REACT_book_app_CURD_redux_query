import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getBooksData = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/",
    prepareHeaders(headers) {
      headers.set("key", "data");
      return headers;
    },
  }),

  endpoints(builder) {
    return {
      login: builder.query({
        query(body) {
          return {
            url: "/book",
            method: "GET",
            body: body,
          };
        },
      }),
    };
  },
});

export const { useLoginQuery } = getBooksData;
