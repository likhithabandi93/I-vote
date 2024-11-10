import axios from "axios";
import { toast } from "react-toastify";

import {
    loginRequest,
    loginSuccess,
    loginFail,
    getCustomerRequest,
    getCustomerSuccess,
    getCustomerFail,
    logoutRequest,
    logoutSuccess,
    logoutFail,
    votingRequest,
    votingSuccess,
    votingFail,
    verifyOtpRequest,
    verifyOtpSuccess,
    verifyOtpFail,
    resendotpFail,
    resendotpRequest,
    resendotpSuccess,
    alreadyVotedFail,
    alreadyVotedRequest,
    alreadyVotedSuccess,
} from "../Slice/Customer";



export const register = (data) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const res = await axios.post("/api/customer/register", data);
        dispatch(loginSuccess(res.data));
        sessionStorage.setItem("token", JSON.stringify(res.data.customer));
    res.data.message.map((msg) => toast.success(msg));
    setTimeout(() => {
    window.location.href = "/verify-otp";
    }, 2000);
    } catch (error) {
        dispatch(loginFail());
        error.response.data.message.map((msg) => toast.error(msg));
    }
};


// resend otp
export const resendOtp = (data) => async (dispatch) => {
    try {
        dispatch(resendotpRequest());
        const res = await axios.post("/api/customer/resend-otp", data);
        dispatch(resendotpSuccess(res.data));
        res.data.message.map((msg) => toast.success(msg));
    } catch (error) {
        dispatch(resendotpFail());
        error.response.data.message.map((msg) => toast.error(msg));
    }
};










// verify otp
export const verifyOtp = (data) => async (dispatch) => {
    try {
        dispatch(verifyOtpRequest());
        const res = await axios.post("/api/customer/verifyotp", data);
        dispatch(verifyOtpSuccess(res.data));
        toast.success("Otp Verified");
        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);
    } catch (error) {
        dispatch(verifyOtpFail());
        error.response.data.message.map((msg) => toast.error(msg));
    }
};





// login
export const login = (data) => async (dispatch) => {
    try {
        console.log(data);
        dispatch(loginRequest());
        const res = await axios.post("/api/customer/login", data);
        dispatch(loginSuccess(res.data));
        sessionStorage.setItem("customer", JSON.stringify(res.data.customer));
        res.data.message.map((msg) => toast.success(msg));
        setTimeout(() => {
            window.location.href = "/homepage";
        }, 2000);
    } catch (error) {
        dispatch(loginFail());
        error.response.data.message.map((msg) => toast.error(msg));
    }
};



// get participant
export const getCustomer = () => async (dispatch) => {
    try {
        dispatch(getCustomerRequest());
        const res = await axios.get("/api/customer/view-participant");
        dispatch(getCustomerSuccess(res.data));
    } catch (error) {
        dispatch(getCustomerFail());
    }
};


// voting 
export const voting = (data,id) => async (dispatch) => {
    try {
        dispatch(votingRequest());
        const res = await axios.post(`/api/customer/voting/${id}`, data);
        dispatch(votingSuccess(res.data));
        res.data.message.map((msg) => toast.success(msg));
    
            window.location.href = "/";
      
    } catch (error) {
        dispatch(votingFail());
        error.response.data.message.map((msg) => toast.error(msg));
    }
};




// already voted
export const alreadyVoted = (id) => async (dispatch) => {
    try {
        dispatch(alreadyVotedRequest());
        const res = await axios.get(`/api/customer/already-voted/${id}`);
        dispatch(alreadyVotedSuccess(res.data));
    } catch (error) {
        dispatch(alreadyVotedFail());
    }
};






// logout
export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        const res = await axios.get("/api/customer/logout");
        dispatch(logoutSuccess(res.data));
        toast.success("Logout Success");
    } catch (error) {
        dispatch(logoutFail());
        toast.error("Logout Fail");
    }
};
