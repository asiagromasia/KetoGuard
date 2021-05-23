import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import * as Localization from 'expo-localization';

//details about event
const details = {
    title: 'test event',
    // startDate: Calendar.DayOfTheWeek.Monday,
    // endDate: Calendar.DayOfTheWeek.Thursday,
    startDate: '2021-05-20T15:00.00.000Z',
    endDate: '2021-05-21T15:00.00.000Z',  
    location: 'Test location',
    // recurrenceRule: {
    //     frequency: Calendar.Frequency.WEEKLY,
    //     "interval": 1,
    //   },
    timeZone: Localization.timezone,
    endTimeZone: Localization.timezone,
  }

  
//Gets an array of calendar objects with details about the different calendars 
//stored on the device. This is instead of Calendar.Default- not supported anymore
async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  // may use for reminders: Calendar.EntityTypes.REMINDER (for the Reminders app)
  const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
  return defaultCalendars[0].source;
  
}
async function getDefaultCalendarId() {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    
    const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    return defaultCalendars[0].id;
    
  }

// const getDefaultCalendarSource = async () => {
//     const defaultCalendar = await Calendar.getDefaultCalendarAsync();
//     return defaultCalendar.source;
// }

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
    isVisible: true
  });
  //const newEvent = await Calendar.createEventAsync(newCalendarID, details);
//   const newEvent = await Calendar.createEventAsync(newCalendarID, details).then((eventId)=>{    
//     console.log(eventId)
//     alert(eventId)
//     })

// const newEvent = 
// Platform.OS === 'ios' ? await Calendar.createEventAsync(newCalendarID, details) : {alert(eventId)};
    const newEvent = await Calendar.createEventAsync(newCalendarID, details)
                .then( event => {
                    console.log('success',event);
                    Alert.alert('Created newEvent #' + event);
                    })
                .catch( error => {
                    console.log('failure',error);
                    });

    // creates event directly on the defaulted calendar
    try {
    let result = await Calendar.createEventAsync(getDefaultCalendarId(), {
        title: 'my new event',
        startDate: new Date(),
        endDate: new Date(),
      });
    console.log(result);
    Alert.alert('Created event #' + result);
    } catch (e) {
        console.log({ e });
    }
  console.log(`Your new calendar ID before event is: ${newCalendarID}`);
  //console.log(`Your new event is: ${eventId}`);
  console.log(`Your new event is: ${newEvent}`);
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}
let calendarIdDel = '20';
//to delete calendar
//export const deleteCalendarId = async () => {
    //const calendarId = await SecureStore.getItemAsync(nameCalendarStore);
    
    // if (calendarIdDel) {
    //   await Calendar.deleteCalendarAsync(calendarIdDel);
    //   console.log('deleted')
    //   //await SecureStore.deleteItemAsync(nameCalendarStore);
    // }
  //};


export default function CalendarExpo() {
    useEffect(() => {
      (async () => {
        //const { status } = await Calendar.requestCalendarPermissionsAsync();
        const { status } = await Permissions.askAsync(Permissions.CALENDAR);
        if (status === 'granted') {
          const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          
        //   if (calendarIdDel===20) {
        //     await Calendar.deleteCalendarAsync(calendarIdDel);
        //     console.log('deleted2')}
            
          console.log('Here are all your calendars:');
          console.log({ calendars });
          ///deleteCalendarId();
        }
      })();
    }, []);


  
    return (
        <>
        <View style={styles.container}>
        <Text style={styles.wlcm}>Here is your plan:</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.wlcm}>Add it to your calendar</Text>

            <Button title="Create a new calendar" onPress={createCalendar} color="#85944d" />
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
});