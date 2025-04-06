
import apiClient from '../config/client';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginPayload, SignupPayload, ResetPasswordPayload } from '../types/auth';

export const AuthService = {
    login: async (credentials: LoginPayload) => {
        const response = await apiClient.post('/api/companies/login', credentials);
        return response.data;
    },

    signup: async (userData: SignupPayload) => {
        const response = await apiClient.post('/api/companies/register', userData);
        return response.data;
    },

    resetPassword: async (resetData: ResetPasswordPayload) => {
        const response = await apiClient.get('/api/companies/reset-password', resetData);
        return response.data;
    },

}