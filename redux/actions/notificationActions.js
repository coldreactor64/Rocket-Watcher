import AsyncStorage from '@react-native-community/async-storage';

import {
    ADD_NOTIFICATION,
    LOAD_NOTIFICATION,
    REMOVE_NOTIFICATION
} from './actionTypes'

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
    //TODO: Add removal of that scheduled notification

    let notifications = await readNotifications();//Current notifications stored
    let notificationIndex = notifications.findIndex(item => item.id === id); //find the notification to delete's index
    // eslint-disable-next-line no-unused-vars
    let deleted; // deleted notification

    if(notificationIndex == 0){
        deleted = notifications.splice(0, 1);//If index is 0 then you need to splice it 0, 1 not 0,0
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
    const notifications = await readNotifications();
    //console.log(`loadNotifications ${notifications}`)
    dispatch({
        type: LOAD_NOTIFICATION,
        notifications: notifications
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



