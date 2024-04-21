import { createSlice } from "@reduxjs/toolkit";
import { AddProject ,getProjectByDepartment} from "./ProjectAction";
const initialState = {
    setProject: [],
    isSuccess: false,
    isError: false,
    message: "",
    loading: true,
};
const ProjectSLice = createSlice({
    name: "Project",
    initialState: initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddProject.pending, (state) => {
                state = { ...state, loading: true };
            })
            .addCase(AddProject.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isSuccess = true;
                    state.message = action.payload;
            })
            .addCase(AddProject.rejected, (state, { payload }) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = payload;
            });
            builder
            .addCase(getProjectByDepartment.pending, (state) => {
                state = { ...state, loading: true };
            })
            .addCase(getProjectByDepartment.fulfilled, (state, action) => {
                if (action?.payload) {
                    state.isError = false;
                    state.isSuccess = true;
                    state.loading=false
                    state.setProject = action.payload;
                }
            })
            .addCase(getProjectByDepartment.rejected, (state, { payload }) => {
                state.isError = true;
                state.loading = false;
                state.isSuccess = false;
                state.message = payload;
            });
    },
});
export default ProjectSLice.reducer;
export const userSelector = (state) => state.Offers;
export const { clearState } = ProjectSLice.actions;