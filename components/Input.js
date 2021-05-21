import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import SmoothPicker from "react-native-smooth-picker";
import CurrentWeight1 from './CurrentWeight1';
import SmoothPNrFun from './SmoothPNrFun';
import WeightChoice from './WeightChoice';


export default function Input() {
  return (
    <>
        <Header />
        <WeightChoice />
        
    </>
  );
}