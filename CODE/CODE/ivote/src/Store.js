import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import admin from "./Slice/Admin";
import customer from "./Slice/Customer";



const reduces = combineReducers({

    //reducers
    admin,
    customer
})


const store = configureStore({
    reducer: reduces,
    // middleware: [thunk]
})


export default store;