import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null,
    contact: null,
    name: null,
    data: null,
    place: null,
    guests: null,
    table: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        setDataAndPlace(state, action) {
            state.data = action.payload.data;
            state.guests = action.payload.guests;
            state.place = action.payload.place;
        },
        setTable(state, action) {
            state.table = action.payload.table;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const {setUser, removeUser, setDataAndPlace, setTable} = userSlice.actions;

export default userSlice.reducer;