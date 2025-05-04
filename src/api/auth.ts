
import apiClient from '../config/client';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginPayload, SignupPayload, ResetPasswordPayload } from '../types/auth'


export const AuthService = {
    login: async (credentials: LoginPayload) => {
        const response = await apiClient.post('/api/v1/auth/login', credentials);
        return response.data;
    },

    signup: async (userData: SignupPayload) => {
        const response = await apiClient.post('/api/v1/auth/register', userData);
        return response.data;
    },

    googleLogin:async(code:any) =>{
        const response = await apiClient.post('/api/v1/auth/oauth', code);
        return response.data;
    },
    verifyToken: async ()=> {
        const response = await apiClient.get('/auth/verify') 
        return response.data.valid;
      },

    resetPassword: async (resetData: ResetPasswordPayload) => {
        const response = await apiClient.get('/api/v1/auth/reset-password', { params: resetData });
        return response.data;
    },

}