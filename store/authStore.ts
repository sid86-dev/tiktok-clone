import create from "zustand";
import { persist } from 'zustand/middleware'
import { IUser } from "../types";


const authStore = (set: any) => ({
    userProfile: null,
    addUser: (user: IUser) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null })
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
);

export default useAuthStore;