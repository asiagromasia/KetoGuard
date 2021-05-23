import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import SmoothPicker from "react-native-smooth-picker";

const Item = React.memo(
    ({ selected, vertical, fontSize, name, isLastIndex }) => {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            opacity: isLastIndex ? 0 : 1,
            backgroundColor: selected ? '#ABC9AF' : 'red',
            borderColor: 'transparent',
            width: 150,
            marginBottom: isLastIndex ? -25 : 0,
          }}>
          <Text style={{ fontSize: 20 }}>{name}</Text>
        </View>
      );
    }
  );
  

const ItemToRender = ({ item, index }, indexSelected, vertical, lastIndex) => {
    const selected = index === indexSelected;
    const isLastIndex = index >= lastIndex;
    const gap = Math.abs(index - indexSelected);
  
    let opacity = opacities[gap];
    if (gap > 3) {
      opacity = opacities[4];
    }
    let fontSize = sizeText[gap];
    if (gap > 1) {
      fontSize = sizeText[2];
    }
  
    return (
      <Item
        selected={selected}
        vertical={vertical}
        fontSize={fontSize}
        name={item}
        isLastIndex={isLastIndex}
      />
    );
  };

  const numberArray = new Array(32).fill(1).map((x, i) => x * (i + 1));
  function handleChange(index) {
    setSelected(index >= numberArray.length - 1 ? numberArray.length - 2 : index);
  }

export default class SmoothPCla extends Component {
    
    state = {
      selected: null
    };
  
    handleChange = index => {
      this.setState({
        selected: index
      });
    };
  
    render() {
      const { selected } = this.state;
      return (
        <View>
        <SmoothPicker
          offsetSelection={40}
          magnet
          scrollAnimation
          data={Array.from({ length: 16 }, (_, i) => i)}
          onSelected={({ item, index }) => this.handleChange(index)}
          renderItem={(option) => ItemToRender(option, selected, true, numberArray.length - 1)}
        />
        </View>
      );
    }
}