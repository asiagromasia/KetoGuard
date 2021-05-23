import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Button, useWindowDimensions, Alert } from 'react-native';
import Constants from 'expo-constants';


// any pure javascript modules available in npm
import SmoothPicker from 'react-native-smooth-picker';

const opacities = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};
const sizeText = {
  0: 40,
  1: 20,
  2: 10,
};

const Item = React.memo(
  ({ selected, vertical, fontSize, name, isLastIndex }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          //height: 70,
          opacity: isLastIndex ? 0 : 1,
          backgroundColor: selected ? '#D9F5ED' : '#D9F5ED',
          borderColor: selected ? '#ABC9AF' : 'transparent',
          height: selected ? 90 : 'auto',
          //width: vertical ? 150 : 'auto',
          width: selected ? 150 : 75,
          marginBottom: isLastIndex ? -25 : 10,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: selected ? 15 : 'auto',
          paddingRight: selected ? 15 : 'auto',
          borderWidth: 4,
          borderRadius: 50
          
        }}>
        <Text style={{fontSize}}>{name}</Text>
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

export default function WeightChoice({navigation}) {
    const numberArray = new Array(170).fill(100).map((x, i) => x + (i + 1));
    const numberArray2 = new Array(170).fill(100).map((x, i) => x + (i + 1));


  function handleChange(index) {
    setSelected(index >= numberArray.length - 1 ? numberArray.length - 2 : index);
    // console.log('Your selection is' + numberArray[selected])
  }
  function handleChange2(index) {
    setSelected2(index >= numberArray2.length - 1 ? numberArray2.length - 2 : index);
    // console.log('Your selection2 is' + numberArray2[selected2])
  }
//this sets the counter on the page opening
  const [selected, setSelected] = React.useState(50);
  const [selected2, setSelected2] = React.useState(50);
  console.log(numberArray[0])
  console.log(numberArray.length)
  console.log('a2 1st ele='+numberArray2[0])
  console.log('a2 len ='+numberArray2.length)
  //console.log('item='+{item})
  console.log('selected2='+selected2)
  //console.log('index2='+index)
  //console.log('indexselected2='+indexSelected)
//console.log('Your selection is' + numberArray[selected])



  return (
    <>
    <View style={styles.container}>
            <Text style={styles.wlcm}>Please enter your current weight:</Text>
            <Text style={styles.sel}>{`Your selection is ${numberArray[selected]} lbn`}</Text>
        </View>
        <View style={styles.wrapperHorizontal}>
        <SmoothPicker
          initialScrollToIndex={selected}
          initialNumToRender={10}
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
    <View style={styles.container}>
            <Text style={styles.wlcm}>Please enter your goal weight:</Text>
            <Text style={styles.sel}>{`Your selection is ${numberArray2[selected2]} lbn`}</Text>
        </View>
    <View style={styles.wrapperHorizontal}>
        <SmoothPicker
          initialNumToRender={20}
          initialScrollToIndex={selected2}
          onScrollToIndexFailed={() => {}}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={numberArray2}
          horizontal={true}
          scrollAnimation
          onSelected={({ item, index }) => handleChange2(index)}
          renderItem={(option) => ItemToRender(option, selected2, true, numberArray2.length - 1)}
          magnet
        />
    </View>
    
    <View style={styles.b}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendar', {current:numberArray[selected],goal:numberArray2[selected2]})}>
                <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.b}>
      <Text> </Text>
    </View>
    </>
  );
}
const styles = StyleSheet.create({
  b:{
   // alignItems: 'flex-end',
    marginBottom:40
  },
  container: {
    height: "22%",
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    marginTop:15
    
  },
  wlcm: {
    color: '#888',
    fontSize: 25,
    fontWeight: '500',
    marginHorizontal: 15,
    marginBottom: 25
  },
  sel: {
    color: '#888',
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 15,
    marginBottom: 1
  },
  wrapperHorizontal: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    color: 'black',
    flexDirection: 'row', 
    backgroundColor: '#F5FCFF',
    width: 500
        
  },
  button: {
    alignItems:'center',
    justifyContent: 'space-around',
    backgroundColor: '#85944d',
    marginHorizontal:150,
    //marginBottom:220,
    marginTop: 15,
    alignItems: 'center',
    padding: 13,
    borderRadius: 25
  },
  text: {
    fontSize: 22,
    color: '#fff',
	fontWeight: 'bold'
	}
})

{/* <View style={styles.button}>
        <Button title="Submit" onPress={() => navigation.navigate('Calendar')} />
    </View> */}