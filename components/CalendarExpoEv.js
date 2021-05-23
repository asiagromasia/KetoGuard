import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform, Alert,TouchableOpacity } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import * as Localization from 'expo-localization';

//details about event
const details = {
    title: 'test event',
    // startDate: '2021-05-26T16:00.00.000Z',
    // endDate: Calendar.DayOfTheWeek.Thursday,
    startDate: new Date(),
    endDate: new Date(),  
    location: 'Test location',
    accessLevel: Calendar.EventAccessLevel.PRIVATE,
    recurrenceRule: {
        // daysOfTheWeek:2,
        frequency: Calendar.Frequency.WEEKLY,
        "interval": 1,
    },
    timeZone: Localization.timezone,
    endTimeZone: Localization.timezone
    
  }

  
//Gets an array of calendar objects with details about the different calendars 
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

   
  console.log(`Your new calendar ID before event is: ${newCalendarID}`);
  
}


export default function CalendarExpoEv({ route, navigation }) {
  const { current } = route.params;
  const { goal } = route.params;

    useEffect(() => {
      (async () => {
        try {
          const { status } = await Calendar.requestCalendarPermissionsAsync();
        // const { status } = await Permissions.askAsync(Permissions.CALENDAR);
          if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
              console.log(calendars);
              let result = await Calendar.createEventAsync(calendars[0].id, {
                title: 'my new event',
                startDate: new Date(),
                endDate: new Date(),
              });
              console.log(result);
              Alert.alert('Created event #' + result);      
          }
        } catch (error) {
          console.error('Problem', error)
        }
      })();
    }, []);


    console.log(current);
    console.log(goal);
    return (
        <>
        <View style={styles.container}>
        <Text style={styles.wlcm}>Here is your plan:</Text>
        <Text>current weight: {current} </Text>
        <Text>goal weight: {goal}</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.wlcm}>Add it to your calendar:</Text>
            
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
    flex: 1,
    backgroundColor: '#fff',
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
	}
});

//<Button title="Create a new calendar" onPress={createCalendar} color="#85944d" />