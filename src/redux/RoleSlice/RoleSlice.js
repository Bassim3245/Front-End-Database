import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: {
    view_user_profile: {
      value: true,
      id: 2000,
    },
    view_landing: {
      value: true,
      id: 2000,
    },
    view_user: {
      value: false,
      id: 1,
    },
    add_user: {
      value: false,
      id: 2,
    },
    update_user: {
      value: false,
      id: 3,
    },
    delete_user: {
      value: false,
      id: 4,
    },
    view_group: {
      value: false,
      id: 5,
    },
    assign_role_to_group: {
      value: false,
      id: 6,
    },
    assign_group_to_user: {
      value: false,
      id: 7,
    },
    show_roles: {
      value: false,
      id: 8,
    },
    view_image_type: {
      value: false,
      id: 9,
    },
    add_image_type: {
      value: false,
      id: 10,
    },
    update_image_type: {
      value: false,
      id: 11,
    },
    delete_image_type: {
      value: false,
      id: 12,
    },

    view_image: {
      value: false,
      id: 13,
    },
    add_image: {
      value: false,
      id: 14,
    },
    update_image: {
      value: false,
      id: 15,
    },
    delete_image: {
      value: false,
      id: 16,
    },

    view_driver_id_type: {
      value: false,
      id: 17,
    },
    view_vehicle_type: {
      value: false,
      id: 18,
    },
    view_vehicle_plate_type: {
      value: false,
      id: 19,
    },
    add_image_to_vehicle_plate_type: {
      value: false,
      id: 20,
    },
    view_vehicle_plate_government: {
      value: false,
      id: 21,
    },
    view_vehicle_plate_letter: {
      value: false,
      id: 22,
    },
    view_order_status: {
      value: false,
      id: 23,
    },
    view_order: {
      value: false,
      id: 24,
    },
    add_order: {
      value: false,
      id: 25,
    },
    update_order: {
      value: false,
      id: 26,
    },
    delete_order: {
      value: false,
      id: 27,
    },
    view_vehicle: {
      value: false,
      id: 28,
    },
    add_vehicle: {
      value: false,
      id: 29,
    },
    update_vehicle: {
      value: false,
      id: 30,
    },
    delete_vehicle: {
      value: false,
      id: 31,
    },
    change_order_status: {
      value: false,
      id: 32,
    },
    view_takeel_issue_source: {
      value: false,
      id: 33,
    },
    add_takeel_issue_source: {
      value: false,
      id: 34,
    },
    update_takeel_issue_source: {
      value: false,
      id: 35,
    },
    delete_takeel_issue_source: {
      value: false,
      id: 36,
    },
    export_as_pdf: {
      value: false,
      id: 37,
    },
    view_user_list_for_search: {
      value: false,
      id: 38,
    },
    view_transfer_type: {
      value: false,
      id: 39,
    },
    add_transfer_type: {
      value: false,
      id: 40,
    },
    update_transfer_type: {
      value: false,
      id: 41,
    },
    delete_transfer_type: {
      value: false,
      id: 42,
    },
    show_notification: {
      value: false,
      id: 43,
    },
    add_receipt_number: {
      value: false,
      id: 44,
    },
  },

  Permission: {
    Add_General_Data: {
      value: false,
      _id: "661387b29e90980ff43478f6",
    },
    Delete_General_Data: {
      value: false,
      _id: "661387b29e90980ff43478f6",
    },
    Update_General_Data: {
      value: false,
      _id: "661387ba9e90980ff43478fa",
    },
    View_General_Data: {
      value: false,
      _id: "661387c99e90980ff43478fe",
    },
    ADD_Data_Users: {
      value: false,
      _id: "661387e79e90980ff4347902",
    },
    Delete_Data_Users: {
      value: false,
      _id: "661387f19e90980ff4347906",
    },
    Update_Data_Users: {
      value: false,
      _id: "661387f99e90980ff434790a",
    },
    Edit_Permission_Users: {
      value: false,
      _id: "661388159e90980ff434790e",
    },
    Add_data_project: {
      value: false,
      _id: "6613882e9e90980ff4347912",
    },
    Delete_data_project: {
      value: false,
      _id: "6613883c9e90980ff4347916",
    },
    Update_data_project: {
      value: false,
      _id: "661388469e90980ff434791a",
    },
    View_data_project: {
      value: false,
      _id: "661388639e90980ff434791e",
    },
    View_data_Product: {
      value: false,
      _id: "6613886e9e90980ff4347922",
    },
    Add_data_Product: {
      value: false,
      _id: "6613887d9e90980ff4347926",
    },
    Delete_data_Product: {
      value: false,
      _id: "661388889e90980ff434792a",
    },
    Update_data_Product: {
      value: false,
      _id: "6613888f9e90980ff434792e",
    },
  },
};

export const RolesReducer = createSlice({
  name: "rolesData",
  initialState: initialState,
  reducers: {
    setRolesRedux: (state, action) => {
      state.roles = action.payload;c
    },
  },
});

export const { setRolesRedux } = RolesReducer.actions;

export default RolesReducer.reducer;
