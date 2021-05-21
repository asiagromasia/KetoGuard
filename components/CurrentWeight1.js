import React, { useRef, useState } from 'react';
//import * as React from 'react';
import {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SmoothPicker from "react-native-smooth-picker";


const numer = Array.from({ length: 200 }, (_, i) => 100 + i)

const opacities = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};
const sizeText = {
  0: 40,
  1: 15,
  2: 10,
};

const Item = React.memo(({isLastIndex, opacity, selected, vertical, fontSize, name}) => {
  return (
    <View
      style={[styles.OptionWrapper, { marginBottom: isLastIndex ? -25 : 0, opacity, borderColor: selected ? '#ABC9AF' : 'transparent', width: vertical ? 150 : 'auto'}]}
    >
    <Text style={{fontSize}}>
      {name}
    </Text>
  </View>
  );
});




const ItemToRender = ({item, index}, indexSelected, vertical, lastIndex) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);
  const isLastIndex = index >= lastIndex;

  let opacity = opacities[gap];
  if (gap > 3) {
    opacity = opacities[4];
  }
  let fontSize = sizeText[gap];
  if (gap > 1) {
    fontSize = sizeText[2];
  }

  return <Item isLastIndex={isLastIndex} opacity={opacity} selected={selected} vertical={vertical} fontSize={fontSize} name={item}/>;
};

export default function CurrentWeight() {

  function handleChange(index) {
    setSelected(index);
    refPicker.current.scrollToIndex({
      animated: false,
      index: index,
      // viewPosition:0.5,
      viewOffset: -30
    });
  }

  const [ selected, setSelected ] = useState(4);
  const refPicker = useRef(null);
  return (
    <View style={styles.container}>
      <View style={styles.wrapperHorizontal}>
        <SmoothPicker
          initialScrollToIndex={selected}
          refFlatList={refPicker}
          onScrollToIndexFailed={() => {}}
          keyExtractor={(_, index) => index.toString()}
          horizontal={true}
          scrollAnimation
          showsHorisontalScrollIndicator={false}
          data={numer}
          onSelected={({ item, index }) => handleChange(index)}
          renderItem={option => ItemToRender(option, selected, true)}
          magnet
        />
        <Text>{`Your selection is ${numer[selected]} lbn`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  wrapperHorizontal: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    color: 'black'
  },
  OptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 70,
    width: 50,
    borderWidth: 4,
    borderRadius: 50,
    backgroundColor: "#D9F5ED"
  },
});