import { combineReducers, createStore } from "redux";
import screenWidthReducer from "./reducers/screenWidthReducer";
const store = createStore(
    combineReducers({
        screenWidth: screenWidthReducer
    })
)
export default store;