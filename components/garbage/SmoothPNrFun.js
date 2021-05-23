import * as React from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './AssetExample';

// or any pure javascript modules available in npm
import SmoothPicker from 'react-native-smooth-picker';

const dataCity = [
  'days',
  'weeks',
  'months',
  'years',  
  'N/A'
];

const opacities = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};
const sizeText = {
  0: 20,
  1: 15,
  2: 10,
};

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

export default function SmoothPNrFun() {
  const numberArray = new Array(200).fill(1).map((x, i) => x * (i + 1));
  function handleChange(index) {
    setSelected(index >= numberArray.length - 1 ? numberArray.length - 2 : index);
  }
  function handleChange2(index) {
    setSelected2(index >= numberArray.length - 1 ? numberArray.length - 2 : index);
  }

  const [selected, setSelected] = React.useState(0);
  const [selected2, setSelected2] = React.useState(0);
  console.log('ye')

  return (
    <>
    <View style={styles.welcome}>
            <Text style={styles.wlcm}>Please enter your current weight:</Text>
            <Text>{`Your selection is ${numberArray[selected]} lbn`}</Text>
        </View>
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        width: 500,
        flexDirection: 'row'
      }}>
        <SmoothPicker
          initialScrollToIndex={selected}
          initialNumToRender={20}
          onScrollToIndexFailed={() => {}}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={numberArray}
          horizontal={true}
          scrollAnimation
          onSelected={({ item, index }) => handleChange(index)}
          renderItem={(option) => ItemToRender(option, selected, true, numberArray.length - 1)}
          magnet
        />
      
    </View>
    <View style={styles.welcome}>
            <Text style={styles.wlcm}>Please enter your goal weight:</Text>
            <Text>{`Your selection is ${numberArray[selected2]} lbn`}</Text>
        </View>
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        width: 500,
        flexDirection: 'row'
      }}>
        <SmoothPicker
          initialNumToRender={20}
          initialScrollToIndex={selected2}
          onScrollToIndexFailed={() => {}}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={numberArray}
          horizontal={true}
          scrollAnimation
          onSelected={({ item, index }) => handleChange2(index)}
          renderItem={(option) => ItemToRender(option, selected2, true, numberArray.length - 1)}
          magnet
        />
        
    </View>
    
    </>
  );
}
const styles = StyleSheet.create({
  welcome: {
   // flex: 1,
   height: "35%",
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
  }
})