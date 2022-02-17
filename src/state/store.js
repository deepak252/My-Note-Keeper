import { combineReducers, createStore } from "redux";
import screenWidthReducer from "./reducers/screenWidthReducer";
import  toggleSidebarReducer  from "./reducers/toggleSidebarReducer";
const store = createStore(
    combineReducers({
        sidebarToggle : toggleSidebarReducer,
        screenWidth : screenWidthReducer
    })
)
export default store;