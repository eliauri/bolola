import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/auth-slice";
import bolik from "./bolik/addbolik-slice";
import registration from "./registration/registation-slice";
import resetPassword from "./resetPassword/password-slice";
import verification from "./verification/verification-slice";

const store = configureStore({
  reducer: {
    auth,
    registration,
    verification,
    resetPassword,
    bolik,
  },
});

export default store;