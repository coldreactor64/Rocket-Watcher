import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from "react-native-push-notification";
import moment from 'moment'
import {
    ADD_NOTIFICATION,
    LOAD_NOTIFICATION,
    REMOVE_NOTIFICATION
} from './actionTypes'

//TODO: Also find way to delete notification from async storage after it fires



/**
 * @function saveNewNotification - Saves new notification
 * @param {string} id   - ID of launch
 * @param {string} time - Time of launch
 * @returns {array} New notifications
 */

export const saveNewNotification = async (id, time) => {
    const currentNotifications = await readNotifications();

    const addedNotification =  [{
        id: id,
        time: time,
        notify: true
    }]
    scheduleNewLocalNotification(addedNotification[0]);
    const newNotifications = currentNotifications.concat(addedNotification);

    const notificationsString = JSON.stringify(newNotifications);
    await AsyncStorage.setItem("notifications", notificationsString);
    return newNotifications;
}


/**
 * @function readNotifications Reads the async storage to get current notifications
 * @returns {Array} Array filled with current Ids of launches with notifications
 */
export const readNotifications = async () => {

    let currentNotifString = ""; //Current notifications stored as a string in async storage
    try {

        const readValue = await AsyncStorage.getItem('notifications')//Read string value
        if (readValue !== null) { //If not null return notification string
            currentNotifString = readValue;
        }
        else {//if null for some reason return empty JSON
            return [];
        }

    }
    catch (e) {//Catch any errors and log them
        console.log(e);
        return [];//if error just return empty JSON Array
    }
    const currentNotificationJSON = JSON.parse(currentNotifString);//Turn string into JSON    
    return [...currentNotificationJSON]; //Place into an array

}


/**
 * @function removeNotification
 * @param {id} id id of notifcation to remove
 * @returns {dispatch} new notification state
 */
export const removeNotification = (id) => async dispatch => {
    

    let notifications = await readNotifications();//Current notifications stored
    let notificationIndex = notifications.findIndex(item => item.id === id); //find the notification to delete's index
    // eslint-disable-next-line no-unused-vars
    let deleted; // deleted notification

    if(notificationIndex == 0){
        deleted = notifications.splice(0, 1);//If index is 0 then you need to splice it 0, 1 not 0,0
        cancelLocalNotification(deleted.id);//Cancel the local notification
    }
    else{
        deleted = notifications.splice(notificationIndex, 1);//Reminder splice goes splice(index, how many to remove) not splice(index, index)
    }

    
    const notificationsString = JSON.stringify(notifications);//Make it a string again
    await AsyncStorage.setItem("notifications", notificationsString);//set it again

    //update current notification state
    dispatch({
        type: REMOVE_NOTIFICATION,
        notifications: notifications
    });
}

/**
 * @function loadNotifications - Loads and updates current notification state in the store
 * @returns {dispatch} - dispatches to reducer
 */

export const loadNotifications = () => async dispatch => {
    PushNotification.cancelAllLocalNotifications();
    const notifications = await readNotifications();
    let updatedNotifications = [];

    for (let i = 0; i < notifications.length; i++) {
        const currentTime = moment();
        const notificationTime = moment(notifications[i].time)//Get current and notification time

        if (currentTime.isBefore(notificationTime)){//If the current time is before notification time, we're good
            updatedNotifications.push(notifications[i]);//Push to array
            scheduleNewLocalNotification(notifications[i]);//Schedule the local notification
        }
        else {
            PushNotification.cancelLocalNotifications({id: notifications[i].id});//else cancel it
        }
    }

    dispatch({
        type: LOAD_NOTIFICATION,
        notifications: updatedNotifications
    });

}

/**
 * @function addNotification - adds a new notification to the store
 * @param {string} id - ID of launch
 * @param {string} time - Time to schedule
 * @returns {dispatch} - dispatches to reducer
 */

export const addNotification = (id, time) => async dispatch => {
    const newNotifications = await saveNewNotification(id, time);
    dispatch({
        type: ADD_NOTIFICATION,
        notifications: newNotifications
    });

}

/**
 * @function scheduleNewLocalNotifications - Schedule 1 new notification locally
 * @param {Array} newNotification
 * @returns {void}
 */

export const scheduleNewLocalNotification = (newNotification) => {
    const notifdate = moment(newNotification.time).subtract(15, "minutes").toDate();
    PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        id: newNotification.id, 
        message: "Upcoming Rocket Launch in 15 minutes!",
        date: notifdate
    });

}

/**
 * @function cancelLocalNotification - Cancels one local notification
 * @param {string} notificationID
 * @returns {void}
 */

export const cancelLocalNotification = (notificationID) =>{
    PushNotification.cancelLocalNotifications({id: notificationID})
}
