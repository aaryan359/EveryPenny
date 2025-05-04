/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function BottomTabNavigation() {
  
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:  '#272727' ,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeNavigation}
        options={() => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}:any) =>
            focused ? (
              <IconWrapper Icon={HomeIcon} color={color} size={size} />
            ) : (
              <IconWrapper Icon={HomeIcon} color={color} size={size} />
            ),
        })}
      />
      <Tab.Screen
        name="InventoryStack"
        component={}
        options={() => ({
          tabBarLabel: 'Inventory',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <IconWrapper Icon={InventIcon} color={color} size={size} />
            ) : (
              <IconWrapper Icon={InventIcon} color={color} size={size} />
            ),
        })}
      />
      <Tab.Screen
        name="BookingsStack"
        component={BookingNavigation}
        options={() => ({
          tabBarLabel: 'Bookings',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <IconWrapper Icon={BookingIcon} color={color} size={size} />
            ) : (
              <IconWrapper Icon={BookingIcon} color={color} size={size} />
            ),
        })}
      />
      <Tab.Screen
        name="PaymentsStack"
        component={InvoiceNavigation}
        options={() => ({
          tabBarLabel: 'Payments',
          tabBarIcon: ({color, size, focused}:any) =>
            focused ? (
              <IconWrapper Icon={Payment} color={color} size={size} />
            ) : (
              <IconWrapper Icon={Payment} color={color} size={size} />
            ),
        })}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileNavigation}
        options={() => ({
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <IconWrapper Icon={SettingIcon} color={color} size={size} />
            ) : (
              <IconWrapper Icon={SettingIcon} color={color} size={size} />
            ),
        })}
      />
    </Tab.Navigator>
  );
}

const InvoiceNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{
          headerTitle: 'Invoice & Payments',
        }}
      />
      <Stack.Screen
        name="InvoiceDetails"
        component={InvoiceDetials}
        options={{
          headerTitle: 'Invoice Details',
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="CreateInvoice"
        component={CreateInvoice}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="ImageCapture"
        component={ImageCapture}
        options={{headerShown: false}}
      />
      <Stack.Screen 
          name="VideoRecording" 
          component={VideoRecording} 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal',
          }}
      />

      <Stack.Screen
        name="AddBike"
        component={AddBike}
        options={{
          headerTitle: 'Add your vehicle',
          headerShown: true
        }}
      />
      <Stack.Screen
        name="InvoiceBackUp"
        component={InvoiceBackUp}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="BackupOption"
        component={BackupOption}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
