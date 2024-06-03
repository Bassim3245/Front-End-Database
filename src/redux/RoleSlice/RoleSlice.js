import { createSlice } from "@reduxjs/toolkit";
import { getRoleAndUserId } from "./rolAction";
const initialState = {
  Permission: [],
  isError: false,
  isSuccess: false,
  loading: false,
  roles: {
    Add_General_Data: {
      value: false,
      _id: "6652ff121aa5fccdbf9bc15d",
    },
    Delete_General_Data: {
      value: false,
      _id: "6652ff2c1aa5fccdbf9bc1a1",
    },
    Update_General_Data: {
      value: false,
      _id: "6652ff631aa5fccdbf9bc1e5",
    },
    View_General_Data: {
      value: false,
      _id: "6652ff771aa5fccdbf9bc208",
    },
    ADD_Data_Users: {
      value: false,
      _id: "6649dec0fc1a4f7c44fe04c5",
    },
    Delete_Data_Users: {
      value: false,
      _id: "6649deddfc1a4f7c44fe04cd",
    },
    Update_Data_Users: {
      value: false,
      _id: "6649ded0fc1a4f7c44fe04c9",
    },
    Edit_Permission_Users: {
      value: false,
      _id: "661388159e90980ff434790e",
    },
    Add_data_project: {
      value: false,
      _id: "6649defefc1a4f7c44fe04d1",
    },
    Delete_data_project: {
      value: false,
      _id: "6649df17fc1a4f7c44fe04d9",
    },
    Update_data_project: {
      value: false,
      _id: "6649df09fc1a4f7c44fe04d5",
    },
    View_data_project: {
      value: false,
      _id: "6649df6cfc1a4f7c44fe04ed",
    },
    View_data_Product: {
      value: false,
      _id: "6649df78fc1a4f7c44fe04f1",
    },
    Add_data_Product: {
      value: false,
      _id: "6649df29fc1a4f7c44fe04dd",
    },
    Delete_data_Product: {
      value: false,
      _id: "6649df40fc1a4f7c44fe04e5",
    },
    Update_data_Product: {
      value: false,
      _id: "6649df34fc1a4f7c44fe04e1",
    },
    Delay_Projects: {
      value: false,
      _id: "6652ebe5a224c4f61e6ecb24",
    },
    set_Permission_to_user: {
      value: false,
      _id: "664c6075fd728c88a9349dad",
    },
    view_data_Received: {
      value: false,
      _id: "664c60e7fd728c88a9349db1",
    },
    view_data_send: {
      value: false,
      _id: "664c6149fd728c88a9349dc6",
    },
    view_data_CancelSend: {
      value: false,
      _id: "664c613ffd728c88a9349dc4",
    },
    view_data_dashboard: {
      value: false,
      _id: "664c60aefd728c88a9349daf",
    },
    view_data_Business_representatives: {
      value: false,
      _id: "6649e29efc1a4f7c44fe055a",
    },
    view_data_Performance_analytics: {
      value: false,
      _id: "6649e295fc1a4f7c44fe0556",
    },
    view_data_Business_requirements_analysis: {
      value: false,
      _id: "6649e2b1fc1a4f7c44fe055e",
    },
    view_data_price_offer: {
      value: false,
      _id: "6649e25bfc1a4f7c44fe0551",
    },
    view_data_delay_Project: {
      value: false,
      _id: "6652edaaa224c4f61e6ecb26",
    },
    send_Project_from_HR_to_heade_Of_Department: {
      value: false,
      _id: "6649e129fc1a4f7c44fe050b",
    },
    send_Project_from_Assistance_to_heade_Of_Department: {
      value: false,
      _id: "6649e16bfc1a4f7c44fe053a",
    },
    send_Project_from_HR_to_Assistance: {
      value: false,
      _id: "6649e181fc1a4f7c44fe053e",
    },
    show_Profile: {
      value: false,
      _id: "6649e52afc1a4f7c44fe0564",
    },
    Export_data_aS_pdf: {
      value: false,
      _id: "665378ffcf020c0b9cc881dc",
    },
    Export_data_aS_excel: {
      value: false,
      _id: "66537906cf020c0b9cc881de",
    },
    open_Project: {
      value: false,
      _id: "66537941cf020c0b9cc881e5",
    },
    request_edit: {
      value: false,
      _id: "66537950cf020c0b9cc881e7",
    },
    send_project_from_Employ_to_HOD: {
      value: false,
      _id: "66537985cf020c0b9cc881f2",
    },
    view_notifction: {
      value: false,
      _id: "665379e0cf020c0b9cc88205",
    },
    view_filles: {
      value: false,
      _id: "665379eecf020c0b9cc88207",
    },
    view_data_mutual_projects: {
      value: false,
      _id: "66543b3d349d96377f2a327f",
    },
    Assistance_Task: {
      value: false,
      _id: "66543eec349d96377f2a33f1",
    },
    Technical_Department: {
      value: false,
      _id: "66543f71349d96377f2a341b",
    },
    Event_Assistance: {
      value: false,
      _id: "665443c9349d96377f2a343c",
    },
    form_Mutual_projects: {
      value: false,
      _id: "66544555349d96377f2a34b1",
    },
    data_project_send_from_HOD_to_HR_Assistance: {
      value: false,
      _id: "66544648349d96377f2a34e3",
    },
    add_file_project: {
      value: false,
      _id: "6649e020fc1a4f7c44fe0503",
    },
    delete_file_project: {
      value: false,
      _id: "6649e020fc1a4f7c44fe0503",
    },
    Technical_Departmernt: {
      value: false,
      _id: "66543f71349d96377f2a341b",
    },
    Information_Technology: {
      value: false,
      _id: "665d8b0b9c85da7ef30be4ad",
    },
    Quantity_Tables: {
      value: false,
      _id: "665d8b289c85da7ef30be4af",
    },
    M_Dashboards: {
      value: false,
      _id: "665d8b519c85da7ef30be4b1",
    },
    Human_Resource: {
      value: false,
      _id: "665d8afd9c85da7ef30be4a9",
    },
    Project_Manger: {
      value: false,
      _id: "665da1cdd663f86ca0c868f8",
    },
  },
};

export const RolesReducer = createSlice({
  name: "RolesData",
  initialState: initialState,
  reducers: {
    setRolesRedux: (state, action) => {
      state.roles = action.payload;
    },
    getRoleRedux: (state) => {
      return state.roles;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoleAndUserId.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(getRoleAndUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true; // registration isSuccessful
        state.Permission = action.payload;
      })
      .addCase(getRoleAndUserId.rejected, (state, action) => {
        state.loading = false;
        state.isError = action.payload;
        state.message = action.payload;
      });
  },
});
export const { setRolesRedux, getRoleRedux } = RolesReducer.actions;
export default RolesReducer.reducer;
export const userSelector = (state) => state.RolesData;
