import { configureStore } from "@reduxjs/toolkit";
import { userLoginRegister } from "./api/LoginRegister";

import { getBooksData } from "./api/GetBooks";
// import userDataReducer from "../features/email-password/email-PasswordSlice";
// import postDataReducer from "../features/postDataForEditAndCommentPost/postData-Slice";

export const store = configureStore({
  reducer: {
    // userInfo: userDataReducer,
    // editCommentInfo: postDataReducer,
    [userLoginRegister.reducerPath]: userLoginRegister.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userLoginRegister.middleware);
  },
});

export default store;
