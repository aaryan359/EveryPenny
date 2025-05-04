/* eslint-disable prettier/prettier */
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginPayload, SignupPayload, AuthState } from '../../types/auth';
import { AuthService } from '../../api/auth';


const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

//Storing Token
const storeCompanyData = async (token: string) => {
  try {
    if (token) {
      const token1 = token.toString();
      console.log("type of token is",token1);
      await AsyncStorage.setItem('companyToken', token1);
      console.log('Token stored');
    }
  } catch (error) {
    console.error('Error storing data', error);
  }
};

export const Login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginPayload, {rejectWithValue, dispatch}:any) => {
    try {
      const response = await AuthService.login(credentials);
      await storeCompanyData(response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Something unexpected happened',
      );
    }
  },
);

export const Signup = createAsyncThunk(
  'auth/signup',
  async (credentials: SignupPayload, {rejectWithValue, dispatch}:any) => {
    try {
      const response = await AuthService.signup(credentials);
      console.log('company registered');
      await storeCompanyData(response.token);
      await dispatch(refreshCurrentCompany()).unwrap();
      console.log('company token stored', response.token);
      return response;
    } catch (error: any) {
      console.log('error', error);
      return rejectWithValue(
        error.response?.data?.message || 'Something unexpected happened',
      );
    }
  },
);


export const Logout = createAsyncThunk(
  'auth/logout',
  async (_:any, {rejectWithValue}:any) => {
    try {
      await AsyncStorage.removeItem('companyToken');
      await AsyncStorage.removeItem('companyData');
      return;
    } catch (error: any) {
      return rejectWithValue('Something unexpected happened');
    }
  }
)


export const CheckAuthentication = createAsyncThunk(
  'auth/checkAuthentication',
  async (_: any, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('companyToken');
      if (!token) {
        return rejectWithValue('No token found');
      }

      // Call backend to verify token
      const isValid = await AuthService.verifyToken(token); // You need to implement this

      if (!isValid) {
        await AsyncStorage.removeItem('companyToken');
        return rejectWithValue('Invalid token');
      }

      return token;
    } catch (error: any) {
      return rejectWithValue('Something unexpected happened');
    }
  }
);




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state:any, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        state.error = null;
      }
    },
    logout(state:any) {
      state.token = '';
      state.error = null;
    },
    clearAuthError: (state:any) => {
      state.error = null; // Add action to clear error
    },
  },
  extraReducers(builder:any) {
      builder
      //signup
      .addCase(Signup.pending, (state:any, action:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Signup.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(Signup.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //login
      .addCase(Login.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Login.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(Login.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(CheckAuthentication.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        CheckAuthentication.fulfilled,
        (state:any, action: PayloadAction<string | null>) => {
        state.loading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.token = action.payload;
        } else {
          state.isAuthenticated = false;
        }
        state.error = null;
      })
      .addCase(CheckAuthentication.rejected, (state:any, action:any) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(Logout.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state:any) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = '';
      })
      .addCase(Logout.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }
});

export const {setAuthenticated, logout, clearAuthError} = authSlice.actions;
export default authSlice.reducer;
