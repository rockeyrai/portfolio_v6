import { db, User } from "@/app/lib/db";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      // Persist to Dexie
      db.users.add(action.payload);
    },
    removeUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((u) => u.id !== action.payload);
      db.users.delete(action.payload);
    },
  },
});

export const { setUsers, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
