import { configureStore } from "@reduxjs/toolkit";
import reducerAuth from "slicers/auth";

export default configureStore({
  reducer: {
    auth: reducerAuth,
  },
});
