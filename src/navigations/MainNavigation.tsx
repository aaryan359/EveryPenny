/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import {ThemeProvider, useTheme} from '../Theme/ThemeContext';
import BottomTabNavigation from './BottomTabNavigation';
import {RootState} from '../store/store';
import {CheckAuthentication} from '../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import Toast, {
  ErrorToast,
  BaseToast,
  ToastConfigParams,
  ToastConfig,
} from 'react-native-toast-message';
import {scale} from '../Utils/responsive';
import {getGlobalStyles} from '../Theme/GlobalStyle';
const Stack = createNativeStackNavigator();
import {View, Text} from 'react-native';
import {refreshCurrentCompany} from '../store/slices/companySlice';



function Navigation() {
  const authState = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const {theme} = useTheme();
  const styles = getGlobalStyles(theme);

  const initializeAuth = async () => {
    try {
       await dispatch(CheckAuthentication()).unwrap();
       await dispatch(refreshCurrentCompany()).unwrap();
    } catch (error) {
      console.log('Failed to load auth status:', error);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, [dispatch]);

  const toastConfig: ToastConfig = {
    success: (props: ToastConfigParams<any>) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: '#FE8723',
          borderRadius: scale(16),
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        contentContainerStyle={{paddingHorizontal: 16}}
        text1Style={{
          fontSize: scale(16),
          fontWeight: '400',
          fontFamily: styles.GlobalText.fontFamily,
        }}
        text2Style={{
          fontSize: scale(14),
          fontFamily: styles.GlobalText.fontFamily,
          fontWeight: '400',
        }}
      />
    ),

    error: (props: ToastConfigParams<any>) => (
      <ErrorToast
        {...props}
        style={{borderLeftColor: 'red'}}
        contentContainerStyle={{paddingHorizontal: 16}}
        text1Style={{
          fontSize: scale(16),
          fontFamily: styles.GlobalText.fontFamily,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: scale(14),
          fontFamily: styles.GlobalText.fontFamily,
          fontWeight: '400',
        }}
      />
    ),

    tomatoToast: ({text1, props}: ToastConfigParams<any>) => (
      <View
        style={{height: scale(60), width: '100%', backgroundColor: 'tomato'}}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };



  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        {!authState.isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigation}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Dashboard"
            component={BottomTabNavigation}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
      <Toast config={toastConfig} topOffset={scale(55)} />
    </NavigationContainer>
  );
}




export default function MainNavigation() {
  return (
    
    <ThemeProvider>
           <Navigation />
    </ThemeProvider>
   
  );
}
