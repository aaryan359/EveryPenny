
export interface LoginPayload {
    phone?: string;
    email?: string;
    password?: string;
}


export interface SignupPayload {
    email: string;
    password: string;
    name: string;
    phone: string;
}

export interface ResetPasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export interface AuthState {
    token: string | null;
    error: string | null;
    loading: boolean;
    isAuthenticated: boolean;
}