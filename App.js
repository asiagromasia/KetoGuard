import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import SmoothPicker from 'react-native-smooth-picker';
// import Header from './components/garbage/Header';
// import SmoothPCla from './components/SmoothPCla';
// import SmoothPNrFun from './components/garbage/SmoothPNrFun';
// import SmP from './components/garbage/SmP';
// import CurrentWeight1 from './components/garbage/CurrentWeight1';
// import CalendarExpo from './components/garbage/CalendarExpoDel';
// import CalendarEvent from './components/garbage/CalendarEvent';

import Welcome from './components/Welcome';
import Input from './components/Input';
import CalendarExpoEv from './components/CalendarExpoEv';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#f5ce42',
          //height: "30%"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Home" component={Welcome} options={{ title: 'Overview' }} />
        <Stack.Screen name="Input" component={Input} options={{ title: 'Weight Input' }} />
        <Stack.Screen name="Calendar" component={CalendarExpoEv} options={{ title: 'Plan' }} />
      </Stack.Navigator>

    </NavigationContainer> 
    
  );
}
   