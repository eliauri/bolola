import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/auth-slice";
import bolik from "./bolik/addbolik-slice";

const store = configureStore({
  reducer: {
    auth: auth,
    bolik: bolik
  },
});

export default store;