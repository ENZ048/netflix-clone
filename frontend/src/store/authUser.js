import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: null,
    isSignUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({isSignUp: true});
        try {
            const res = await axios.post('/api/v1/auth/signup', credentials);
            set({user: res.data.user, isSignUp:false});
            toast.success('Account created successfully!')
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error, "error");
            set({isSignUp: false, user:null})
        }
    },
    login: async (credentials) => {
        set({isLoggingIn: true});
        try {
            const res = await axios.post("/api/v1/auth/login", credentials);
            set({user: res.data.user, isLoggingIn: false});
            toast.success("Logged in Successfully");
        } catch (error) {
            set({isLoggingIn: false, user: null});
            toast.error(error.response.data.message || "Login Failed");
        }
    },
    logout: async () => {
        set({isLoggingOut: true});
        try {
            await axios.post("/api/v1/auth/logout");
            set({user: null, isLoggingOut: false});
            toast.success("Logged out successfully");
        } catch (error) {
            set({isLoggingOut: false});
            toast.error(error.response.data.message || "Logout Failed");
        }

    },
    authCheck: async () => {
        set({isCheckingAuth: true});

        try {
            const res = await axios.get("/api/v1/auth/authCheck");
            set({user: res.data.user, isCheckingAuth: false});
        } catch (error) {
            set({isCheckingAuth: false, user: null});
            console.log(error);
        }
    },
}));