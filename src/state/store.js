import { combineReducers, createStore } from "redux";
import currentUserReducer from "./reducers/currentUserReducer";
import screenWidthReducer from "./reducers/screenWidthReducer";
import  toggleSidebarReducer  from "./reducers/toggleSidebarReducer";
const store = createStore(
    combineReducers({
        sidebarToggle : toggleSidebarReducer,
        screenWidth : screenWidthReducer,
        userId : currentUserReducer
    })
)
export default store;