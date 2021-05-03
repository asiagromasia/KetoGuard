import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import SmoothPicker from "react-native-smooth-picker";
import CurrentWeight from './CurrentWeight';

// const Bubble = props => {
//     const { children, selected, horizontal } = props;
//     return (
//       <View
//         style={[
//           horizontal ? styles.itemStyleHorizontal : styles.itemStyleVertical,
//           selected &&
//             (horizontal
//               ? styles.itemSelectedStyleHorizontal
//               : styles.itemSelectedStyleVertical)
//         ]}
//       >
//         <Text
//           style={{
//             textAlign: "center",
//             fontSize: selected ? 20 : 17,
//             color: selected ? "#006E4F" : "#006E4F",
//             fontWeight: selected ? "bold" : "normal",          
//           }}
//         >
//           {children}
//         </Text>
//       </View>
//     );
// }

export default function Input() {
  return (
    <>
        <Header />
        <View style={styles.welcome}>
            <Text style={styles.wlcm}>Please enter your current weight:</Text>
        </View>
        <CurrentWeight />
        <View style={styles.welcome}>
            <Text style={styles.wlcm}>Please enter your goal weight:</Text>
        </View>
        {/* <View style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: '#F5FCFF',
            width: 300,
            flexDirection: 'row'
        }}>
        <SmoothPicker
            initialScrollToIndex={selected}
            onScrollToIndexFailed={() => {}}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            scrollAnimation

            bounces={true} ///different
            offsetSelection={40}   //different
            
            data={Array.from({ length: 15 }, (_, i) => 0 + i)}
            onSelected={({ item, index }) => this.handleChange(index)}
            renderItem={({ item, index }) => (
              <Bubble selected={index === selected}>{item}</Bubble>
            )}
          />
          </View> */}
    </>
  );
}
const styles = StyleSheet.create({
    welcome: {
        height: "25%",
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
        paddingTop: 60,
        paddingBottom: 30,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      },
      wrapperHorizontal: {
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        color: "black",
        marginBottom: 80
      },
      wrapperVertical: {
        width: 100,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        color: "black"
      },
      itemStyleVertical: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        paddingTop: 0,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 0,
        backgroundColor: "#D9F5ED"
      },
      itemSelectedStyleVertical: {
        paddingTop: 0,
        borderWidth: 2,
        borderColor: "#DAA520",
        justifyContent: "center",
        alignItems: "center",
    
        backgroundColor: "#D9F5ED"
      },
      itemStyleHorizontal: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        paddingTop: 0,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 0,
        backgroundColor: "#D9F5ED"
      },
      itemSelectedStyleHorizontal: {
        paddingTop: 0,
        borderWidth: 2,
        borderColor: "#DAA520",
        justifyContent: "center",
        alignItems: "center",    
        backgroundColor: "#D9F5ED"
      }
});