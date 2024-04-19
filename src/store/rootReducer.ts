import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import loadingSlice from "./slices/loading/liadingSlice";
import countSlice from "./slices/count/countSlice";

const rootReducer = combineReducers({
      auth: authSlice,
      loading: loadingSlice,
      count: countSlice,
});

export default rootReducer;