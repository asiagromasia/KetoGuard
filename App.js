import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function App() {
  return (
    <>
    <View style={styles.welcome}>
      <Text style={styles.wlcm}>Welcome to KetoGuard!</Text>
    </View>
    <View style={styles.container}>
      <Text style={styles.instructions}>After getting the weight info you will have an option to either create a new calendar or add your weekly goals to your current calendar.</Text>
    <StatusBar style="auto" />
    </View>
    <View style={styles.lts}>
      <Text style={styles.ltsl}>So let's start!</Text>
    </View>
    <View>
      <TouchableOpacity style={styles.button} onPress={() => alert('Hello, world!')}>
					<Text style={styles.text}>Go</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wlcm: {
    color: '#888',
    fontSize: 25,
    fontWeight: '500',
    marginHorizontal: 15,
    marginBottom: 10
  },
  container: {
    //flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
    marginBottom: 60
  },
  instructions: {
    color: '#888',
    fontSize: 20,
    fontWeight: '400',
    marginHorizontal: 15,
    marginBottom: 10
  },
  lts: {
    //flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
    marginBottom:10
  },
  ltsl: {
    backgroundColor: '#fff',
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
    marginBottom:10
  },
  button: {
    backgroundColor: 'blue',
    marginHorizontal:150,
    marginBottom:120,
    alignItems: 'center',
    padding: 20,
    borderRadius: 5
	},
  text: {
    fontSize: 20,
    color: '#fff',
		fontWeight: 'bold'
	}
});