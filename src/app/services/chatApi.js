import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rtk-chat-backend.onrender.com/api/v1",
    prepareHeaders: (headers, { getState }) => {
      let state = getState();
      let token = state?.auth?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Chats"],
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: "/chats",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chats"],
    }),
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `/chats/${id}/leave`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chats"],
    }),
    getChats: builder.query({
      query: () => ({
        url: "/chats",
      }),
      providesTags: ["Chats"],
    }),
  }),
});

export const {
  useDeleteChatMutation,
  useCreateChatMutation,
  useGetChatsQuery,
} = chatApi;
