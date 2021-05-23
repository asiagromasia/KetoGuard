import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
    return (
      <View style={styles.header}>      
        <Text style={styles.text}>Keto Guard</Text>
      </View>
        
    );
  };
  
  const styles = StyleSheet.create({
    header: {
      //flex:1,
      backgroundColor: "#f5ce42",
      flexDirection: 'column',
      //height: "15%"
      //paddingBottom: Platform.OS === "ios" ? '4%' : '3%',
      paddingTop: Platform.OS === "ios" ? '8%' : '4%',
    },
  
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 25,
      fontStyle: "normal",
      letterSpacing: 0.7,
      color: "#ffffff",
      textAlign: 'center',
      marginBottom: 15
    },
  
  });
  
  export default Header;