import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SmoothPicker from "react-native-smooth-picker";
// import CurrentWeight1 from './garbage/CurrentWeight1';
// import SmoothPNrFun from './garbage/SmoothPNrFun';
import WeightChoice from './WeightChoice';


export default function Input({navigation}) {
  return (
   
        <WeightChoice navigation={navigation} />
    
  );
}