import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './components/Header';
import Welcome from './components/Welcome';


export default function App() {
  return (
    <Welcome />
  );
}