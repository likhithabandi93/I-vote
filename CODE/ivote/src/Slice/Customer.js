import { createSlice } from "@reduxjs/toolkit";



const Customer = createSlice({
    name: "Customer",
    initialState: {
        loading: false,
        customerData: [],
    },
    reducers: {
        loginRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        loginSuccess: (state, action) => {
            return{
                ...state,
                loading:false,
                customerData: action.payload
            }
        },
        loginFail: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        registerRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        registerSuccess: (state, action) => {
            return{
                ...state,
                loading:false,
                customerData: action.payload
            }
        },
        registerFail: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        getCustomerRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        getCustomerSuccess: (state, action) => {
            return{
                ...state,
                loading:false,
                customerData: action.payload.customer
            }
        },
        getCustomerFail: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        votingRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        votingSuccess: (state, action) => {
            return{
                ...state,
                loading:false,
                customerData: action.payload
            }
        },
        votingFail: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        logoutRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        logoutSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        logoutFail: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        verifyOtpRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        verifyOtpSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        verifyOtpFail: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        resendotpRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        resendotpSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        resendotpFail: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        alreadyVotedRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        alreadyVotedSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        alreadyVotedFail: (state) => {
            return{
                ...state,
                loading:false
            }
        }

    }
});


let { actions, reducer } = Customer;


export const { loginRequest, loginSuccess, loginFail, registerRequest, registerSuccess, registerFail, getCustomerRequest, getCustomerSuccess, getCustomerFail, votingRequest, votingSuccess, votingFail, logoutRequest, logoutSuccess, logoutFail, verifyOtpRequest, verifyOtpSuccess, verifyOtpFail , resendotpFail,resendotpRequest,resendotpSuccess,alreadyVotedFail,alreadyVotedRequest,alreadyVotedSuccess} = actions;

export default reducer;