import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  notif: 0,
};
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notif += 1;
      
    },
  },
});
export const { incrementNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
