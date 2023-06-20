import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    imageProfile: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log("action", action);
      const { _id, firstName, lastName, email, imageProfile } =
        action.payload.data;
      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.imageProfile = imageProfile;
    },
    logoutRedux: (state, action) => {
        state._id = ""
        state.firstName = ""
        state.lastName = ""
        state.email = ""
        state.imageProfile = ""
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer