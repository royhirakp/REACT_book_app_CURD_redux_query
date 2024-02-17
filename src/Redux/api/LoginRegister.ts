import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userLoginRegister = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "http://localhost:3002",
      "https://flturr.onrender.com/",
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `${token}`);
        console.log("from redux, token set ", token);
      }
      headers.set("key", "data");
      return headers;
    },
  }),

  endpoints(builder) {
    return {
      login: builder.mutation({
        query(body) {
          return {
            url: "/login",
            method: "POST",
            body: body,
          };
        },
      }),
      singup: builder.mutation({
        query(body) {
          return {
            url: "/singup",
            method: "POST",
            body: body,
          };
        },
      }),
      books: builder.query({
        query() {
          return {
            url: "/book",
            method: "GET",
          };
        },
      }),
      makeComment: builder.mutation({
        query({ id, data }) {
          return {
            url: `/bookAuth/${id}`,
            method: "PUT",
            body: data,
          };
        },
      }),
      getUnitPost: builder.query({
        query({ id }) {
          return {
            url: `/book/${id}`,
            method: "GET",
          };
        },
      }),

      addBooks: builder.mutation({
        query(body) {
          return {
            url: "/bookAuth",
            method: "POST",
            body: body,
          };
        },
      }),
    };
  },
});

export const {
  useLoginMutation,
  useSingupMutation,
  useBooksQuery,
  useMakeCommentMutation,
  useGetUnitPostQuery,
  useAddBooksMutation,
} = userLoginRegister;
