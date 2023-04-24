import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        allowLikes: true,
        allowDislikes: true
    },
    reducers: {
        toggleAllowLikes: (state) => {
           state.allowLikes = !state.allowLikes;
        },

        toggleAllowDislikes: (state) => {
            state.allowDislikes = !state.allowDislikes;
        }
    
    }
});

export const { toggleAllowLikes, toggleAllowDislikes} = settingsSlice.actions;
export default settingsSlice.reducer;