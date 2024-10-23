import { createSlice } from "@reduxjs/toolkit";





const Admin = createSlice({
  name: "Admin",
  initialState: {
     loading: false,
  },
  reducers: {
   loginRequest: (state) => {
    return{
        ...state,
        loading:true
    }
  },
    loginSuccess: (state) => {
        return{
            ...state,
            loading:false
        }
    },
    loginFail: (state) => {
        return{
            ...state,
            loading:false
        }
    },
    addparticipantRequest: (state) => {
        return{
            ...state,
            loading:true
        }
    },
    addparticipantSuccess: (state) => {
        return{
            ...state,
            loading:false
        }
    },
    addparticipantFail: (state) => {
        return{
            ...state,
            loading:false
        }
    },
    getparticipantRequest: (state) => {
        return{
            ...state,
            loading:true
        }
    },
    getparticipantSuccess: (state,actions) => {
        return{
            ...state,
            loading:false,
            participantData: actions.payload.participants
        }
    },
    getparticipantFail: (state) => {
        return{
            ...state,
            loading:false
        }
    },
    updateparticipantRequest: (state) => {
        return{
            ...state,
            loading:true
        }
    },
    updateparticipantSuccess: (state) => {
        return{
            ...state,
            loading:false
        }
    },
    updateparticipantFail: (state) => {
        return{
            ...state,
            loading:false
        }
    },
    deleteparticipantRequest: (state) => {
        return{
            ...state,
            loading:true
        }
    },
    deleteparticipantSuccess: (state) => {
        return{
            ...state,
            loading:false
        }
    },
    deleteparticipantFail: (state) => {
        return{
            ...state,
            loading:false
        }
    },
    getcustomerRequest: (state) => {
        return{
            ...state,
            loading:true
        }
    },
    getcustomerSuccess: (state,actions) => {
        return{
            ...state,
            loading:false,
            customerData: actions.payload.customers
        }
    },
    getcustomerFail: (state) => {
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
    leaderboardRequest: (state) => {
        return{
            ...state,
            loading:true
        }
    },
    leaderboardSuccess: (state,actions) => {
        return{
            ...state,
            loading:false,
            leaderboardData: actions.payload.participants
        }
    },
    leaderboardFail: (state) => {
        return{
            ...state,
            loading:false
        }
    },
    dashboardRequest: (state) => {
        return{
            ...state,
            loading:true
        }
    },
    dashboardSuccess: (state,actions) => {
        return{
            ...state,
            loading:false,
            dashboardData: actions.payload
        }
    },
    dashboardFail: (state) => {
        return{
            ...state,
            loading:false
        }
    }
}
});



let { actions, reducer } = Admin;

export const {
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
    leaderboardRequest,
    leaderboardSuccess,
    leaderboardFail,
    dashboardRequest,
    dashboardSuccess,
    dashboardFail,
} = actions;



export default reducer;