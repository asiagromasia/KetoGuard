import SmoothPicker from "react-native-smooth-picker";
import * as React from 'react';
import {Component} from 'react';
import Number from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';



export default class SmP extends Component {
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
        renderItem={({ item, index }) => (
          <Number selected={index === selected}>{item}</Number>
        )}
      />
      </View>
    );
  }
}