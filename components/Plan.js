import React, {useState} from 'react';
import _ from 'lodash';
import {View, StyleSheet, SafeAreView, TouchableOpacity, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { Avatar, Card } from 'react-native-paper';
import {onVisibleMonthsChange,chooseDay} from 'react-native-calendars'



const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

const today = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

export default function Plan({occ, curr}) {
  const numItems = occ;
  const current = curr;


  const [items, setItems] = useState({});
  
    const loadItems = (day) => {
        setTimeout(() => {
          
          //for (let i = -15; i < 85; i++) {
          for (let j = numItems; j > 0; j--) {
           // const time = (day.timestamp + i * 24 * 60 * 60 * 1000)*7;
            const dzis = today();
            const time = day.timestamp + (j * 24 * 60 * 60 * 1000)*7;
            const strTime = timeToString(time);
            const we = current-j;
              if (!items[strTime]) {
                items[strTime] = [];
                  items[strTime].push({
                    name:'Your weight should be ' + we + ', week # '+j+' ',
                    height: Math.max(40, Math.floor(Math.random() * 150))
                  });
              };
          }
          const newItems = {};
          Object.keys(items).forEach(key => {
            newItems[key] = items[key];
          });
          //setItems(items?items:newItems);
          setItems(newItems);
        }, 1000);
      };
      
    
// Specify how each item should be rendered in agenda
      const renderItem = (item) => {
        return (
        <TouchableOpacity style={{marginRight:10, marginTop: 15}}>
            <Card>
                <Card.Content>
                <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={styles.nam}>{item.name}</Text>
                        <Avatar.Image source={ require("../assets/ketoIcon.png")} />
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>)
      }

    
    return (
        <View style={{flex: 1}}>
            <Agenda           
            items={items}
            //loadItems={loadItems}
            loadItemsForMonth={loadItems}
            //selected={'2021-05-16'}
            selected = {today}
            renderItem={renderItem}
            //refreshing={false}
            //onVisibleMonthsChange={onVisibleMonthsChange}
            />
        </View>
    );

};

const styles = StyleSheet.create({
  ag:{
    flex: 1,
  },
  nam:{
    color: '#888',
    fontSize: 16,
    fontWeight: '700',
    //marginHorizontal: 1
    //marginBottom: 10
  }
});

//<Text>data from parent is:{datafromParent}</Text>
//**** following are changes needed in node_modules  *****

// onVisibleMonthsChange = months => {
//   _.invoke(this.props, 'onVisibleMonthsChange', months);
//   if (this.props.items && !this.state.firstReservationLoad) {
//   }
// };

// chooseDay = (d, optimisticScroll)=> {
//   const day = parseDate(d);

//   this.setState({
//     calendarScrollable: false,
//     selectedDay: day.clone()
//   });

//   _.invoke(this.props, 'onCalendarToggled', false);

//   if (!optimisticScroll) {
//     this.setState({
//       topDay: day.clone()
//     });
//   }

//   this.setScrollPadPosition(this.initialScrollPadPosition(), true);
//   this.calendar.scrollToDay(day, this.calendarOffset(), true);

//     //_.invoke(this.props, 'loadItemsForMonth', xdateToData(day));
//   _.invoke(this.props, 'onDayPress', xdateToData(day));
// };