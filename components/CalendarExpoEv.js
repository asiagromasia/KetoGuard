import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform, Alert,TouchableOpacity,FlatList } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import * as Localization from 'expo-localization';
import { event } from 'react-native-reanimated';
import Plan from './Plan';

let finishDate = '2021-08-26T16:00.00.000Z';

//details about event
const details = {
    title: 'test event',
    // startDate: '2021-05-26T16:00.00.000Z',
    // endDate: Calendar.DayOfTheWeek.Thursday,
    startDate: new Date(),
    endDate: new Date(),  
    notes:'today your weight should be:',
    location: 'Test location',
    accessLevel: Calendar.EventAccessLevel.PRIVATE,
    recurrenceRule: {
        // daysOfTheWeek:2,
        frequency: Calendar.Frequency.WEEKLY,
        interval: 1,
        ///endDate: finishDate(),
        //occurrence: occurrenceNb,
        occurrence: 5
    },
    timeZone: Localization.timezone,
    endTimeZone: Localization.timezone
    
  }
const evR = {
  // daysOfTheWeek:2,
  frequency: Calendar.Frequency.WEEKLY,
  interval: 1,
  ///endDate: finishDate(),
  //occurrence: occurrenceNb,
  occurrence: 5
}
  
//Gets an array of calendars (objects) with details about the different calendars 
//stored on the device. This is instead of Calendar.Default- not supported anymore
async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  // may use for reminders: Calendar.EntityTypes.REMINDER (for the Reminders app)
  const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
  return defaultCalendars[0].source;
  
}
//getting just defaulted calendar id needed for creating event
async function getDefaultCalendarId() {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    
    const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    return defaultCalendars[0].id;
  }

//output agenda1
async function agenda1(){
  try{
//const ev = await Calendar.getEventAsync(result);
const plan = Calendar.EVENT.filter(each => each.startDate, each.notes  //each.notes
  )
return plan;
} catch (e) {
  console.log({ e });
}

}
// gives only info about deafaulted calendar
// const getDefaultCalendarSource = async () => {
//     const defaultCalendar = await Calendar.getDefaultCalendarAsync();
//     return defaultCalendar.source;
// }

//creates new calendar and adds new event in it - if visible it shows events in default calendar 
async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Keto Guard Calendar',
    color: '#85944d',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    isPrimary: false,
    isLocalAccount: true,
    isSynced: true,
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
    isVisible: true,
    allowsModifications: true
  });
  
    // creates new event- promise
    const newEvent = await Calendar.createEventAsync(newCalendarID, details)
                .then( event => {
                    console.log('success',event);
                    Alert.alert('Created newEvent #' + event);
                    })
                    
                .catch( error => {
                    console.log('failure',error);
                    });
    const ev = await Calendar.getEventAsync(event, evR)
    .then( event => {
      console.log(ev);
      console.log('success ev',event);
      
      Alert.alert('Created print #' + event);
      })
      
  .catch( error => {
      console.log('failure ev',error);
      });
     
      console.log(ev);                  
  console.log(`Your new calendar ID before event is: ${newCalendarID}`);
  
}


export default function CalendarExpoEv({ route, navigation }) {
  const { current } = route.params;
  const { goal } = route.params;
  //a = current - goal;
  const occurrenceNb = current - goal;
  //const ev = {};

    useEffect(() => {
      (async () => {
        try {
          const { status } = await Calendar.requestCalendarPermissionsAsync();
        // const { status } = await Permissions.askAsync(Permissions.CALENDAR); not good anymore
          if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
              //console.log(calendars);
              let result = await Calendar.createEventAsync(calendars[0].id, {
                title: 'my new event from effect',
                startDate: new Date(),
                endDate: new Date(),
              });
              const ev = await Calendar.getEventAsync(result,evR);
              console.log(ev)
              console.log(result);
              //Alert.alert('Created event #' + result); 
              console.log({agenda1});
              
          }
        } catch (error) {
          console.error('Problem', error)
        }
      })();
    }, []);


    console.log(current);
    console.log(goal);
    //i=Calendar.EVENT.id;
    return (
        <>
        <View style={styles.container}>
          <Text style={styles.wlcm}>Current weight: {current} lbn</Text>
          <Text style={styles.wlcm}>Goal weight: {goal} lbn </Text>        
          <Text style={styles.wlcm}>You need {occurrenceNb} weeks </Text>
          <Text style={styles.wlcm}>Here is your plan:</Text>
        </View>
        <View style={{flex: 1}}>
        <Plan />
        </View>
        <View style={styles.container2}>
            <Text style={styles.wlcm}>Add it to your phone calendar:</Text>            
        </View>        
        <View style={styles.b}>
          <TouchableOpacity style={styles.button} onPress={createCalendar}>
                  <Text style={styles.text}>Create a new calendar</Text>
          </TouchableOpacity>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    marginTop:15,
    paddingTop:10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container2: {
    backgroundColor: '#fff',
    paddingTop:15,
    alignItems: 'center',
    justifyContent: 'space-around',
   },
  wlcm: {
    color: '#888',
    fontSize: 25,
    fontWeight: '500',
    marginHorizontal: 15,
    marginBottom: 10
  },
  calendar: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    alignItems:'center',
    justifyContent: 'space-around',
    backgroundColor: '#85944d',
    marginHorizontal:60,
    //marginBottom:220,
    marginTop: 15,
    alignItems: 'center',
    padding: 13,
    borderRadius: 25
  },
  b:{
    // alignItems: 'flex-end',
     marginBottom:40
   },
   text: {
    fontSize: 22,
    color: '#fff',
	  fontWeight: 'bold'
	},
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});

//<Button title="Create a new calendar" onPress={createCalendar} color="#85944d" />