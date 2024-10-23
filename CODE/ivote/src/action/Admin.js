import axios from "axios";
import {
    loginRequest,
    loginSuccess,
    loginFail,
    addparticipantRequest,
    addparticipantSuccess,
    addparticipantFail,
    getparticipantRequest,
    getparticipantSuccess,
    getparticipantFail,
    updateparticipantRequest,
    updateparticipantSuccess,
    updateparticipantFail,
    deleteparticipantRequest,
    deleteparticipantSuccess,
    deleteparticipantFail,
    getcustomerRequest,
    getcustomerSuccess,
    getcustomerFail,
    logoutRequest,
    logoutSuccess,
    logoutFail,
    leaderboardFail,
    leaderboardRequest,
    leaderboardSuccess,
    dashboardRequest,
    dashboardSuccess,
    dashboardFail,
} from "../Slice/Admin";

import { toast } from "react-toastify";




export const adminlogin = (data) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const res = await axios.post("/api/admin/login", data);
        dispatch(loginSuccess(res.data));
        res.data.message.map((item)=>toast.success(item));
        setTimeout(() => {
            window.location.href = "/admin";
        }, 2000);
    } catch (error) {
        dispatch(loginFail());
        error.response.data.message.map((item)=>toast.error(item));
    }
};



// Add Participant
export const addParticipant = (data) => async (dispatch) => {
    dispatch(addparticipantRequest());
    try {
        const res = await axios.post("/api/admin/addparticipant", data);
        dispatch(addparticipantSuccess(res.data));
        res.data.message.map((item)=>toast.success(item));
    } catch (error) {
        dispatch(addparticipantFail());
        error.response.data.message.map((item)=>toast.error(item));
    }
};




// Get Participants
export const getParticipant = () => async (dispatch) => {
    dispatch(getparticipantRequest());
    try {
        const res = await axios.get("/api/admin/getparticipant");
        dispatch(getparticipantSuccess(res.data));
    } catch (error) {
        dispatch(getparticipantFail());
    }
};


// Update Participant
export const updateParticipant = (data,id) => async (dispatch) => {
    dispatch(updateparticipantRequest());
    try {
        const res = await axios.put(`/api/admin/updateparticipant/${id}`, data);
        dispatch(updateparticipantSuccess(res.data));
        toast.success("Participant Updated");
    } catch (error) {
        dispatch(updateparticipantFail());
        toast.error("Participant Update Fail");
    }
};



// Delete Participant
export const deleteParticipant = (id) => async (dispatch) => {
    try {
        dispatch(deleteparticipantRequest());
        const res = await axios.delete(`/api/admin/deleteparticipant/${id}`);
        dispatch(deleteparticipantSuccess(res.data));
        res.data.message.map((item)=>toast.success(item));
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    } catch (error) {
        dispatch(deleteparticipantFail());
        error.response.data.message.map((item)=>toast.error(item));
    }
};


// Get Customer
export const getCustomer = () => async (dispatch) => {
    dispatch(getcustomerRequest());
    try {
        const res = await axios.get("/api/admin/getcustomer");
        dispatch(getcustomerSuccess(res.data));
    } catch (error) {
        dispatch(getcustomerFail());
    }
};





// leaderboard
export const leaderboard = () => async (dispatch) => {
    dispatch(leaderboardRequest());
    try {
        const res = await axios.get("/api/admin/leaderboard");
        dispatch(leaderboardSuccess(res.data));
    } catch (error) {
        dispatch(leaderboardFail());
    }
};



// dashboard
export const dashboard = () => async (dispatch) => {
    dispatch(dashboardRequest());
    try {
        const res = await axios.get("/api/admin/dashboard");
        dispatch(dashboardSuccess(res.data));
    } catch (error) {
        dispatch(dashboardFail());
    }
};




// logout
export const logout = () => async (dispatch) => {
    try{
        dispatch(logoutRequest());
        const res = await axios.get("/api/admin/logout");
        dispatch(logoutSuccess(res.data));
        res.data.message.map((item)=>toast.success(item));
        localStorage.removeItem("admin");
    }catch(error){
        console.log(error)
    }
};




