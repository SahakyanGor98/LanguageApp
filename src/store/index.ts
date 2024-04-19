import { persistStore } from "redux-persist";
import { store } from "./setup";

const persistor = persistStore(store);

export default persistor;
