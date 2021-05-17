import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import * as Localization from 'expo-localization';


const details = {
    title: 'test event',
    // startDate: Calendar.DayOfTheWeek.Monday,
    // endDate: Calendar.DayOfTheWeek.Thursday,
    startDate: '2021-05-17T15:00.00.000Z',
    endDate: '2021-05-18T15:00.00.000Z',  
    location: 'Test location',
    timeZone: Localization.timezone,
    endTimeZone: Localization.timezone,
  }

//Gets an array of calendar objects with details about the different calendars 
//stored on the device.
async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  // may use for reminders: Calendar.EntityTypes.REMINDER (for the Reminders app)
  const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
  return defaultCalendars[0].source;
  
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
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
    isVisible: true
  });
  const newEvent = await Calendar.createEventAsync(newCalendarID, details);

  console.log(`Your new calendar ID before event is: ${newCalendarID}`);
  console.log(`Your new event is: ${newEvent}`);
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

export default function CalendarExpo() {
    useEffect(() => {
      (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          
          console.log('Here are all your calendars:');
          console.log({ calendars });
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