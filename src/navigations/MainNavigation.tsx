/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';

import AuthNavigation from './AuthNavigation';
import {View, Text} from 'react-native';

import BottomTabNavigation from './BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Toast, {
  ErrorToast,
  BaseToast,
  ToastConfigParams,
  ToastConfig,
} from 'react-native-toast-message';

import {CheckAuthentication} from '../store/slices/authSlice';
import {scale} from '../utils/responsive';

const Stack = createNativeStackNavigator();

function Navigation() {
  // const initializeAuth = async () => {
  //   try {
  //      await dispatch(CheckAuthentication()).unwrap();
  //   } catch (error) {
  //     console.log('Failed to load auth status:', error);
  //   }
  // };

  // useEffect(() => {
  //   initializeAuth();
  // }, [dispatch]);

  const toastConfig: ToastConfig = {
    success: (props: ToastConfigParams<any>) => (
      <BaseToast {...props} contentContainerStyle={{paddingHorizontal: 16}} />
    ),

    error: (props: ToastConfigParams<any>) => (
      <ErrorToast
        {...props}
        style={{borderLeftColor: 'red'}}
        contentContainerStyle={{paddingHorizontal: 16}}
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
    <NavigationContainer>
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
  return <Navigation />;
}
