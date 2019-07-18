import AsyncStorage from '@react-native-community/async-storage';

import {
    ADD_NOTIFICATION,
    LOAD_NOTIFICATION,
    REMOVE_NOTIFICATION
} from './actionTypes'

/**
 * @function saveNewNotification - Saves new notification
 * @param {id} id 
 * @returns {Array} New notifications
 */
export const saveNewNotification = async (id) => {
    const currentNotifications = await readNotifications();

    const addedNotification =  [{
        "id": id,
        'notification': true
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
    let currentNotifString = "";
    try {
        const readValue = await AsyncStorage.getItem('notifications')
        if (readValue !== null) { //If not null return notification string
            currentNotifString = readValue;
        }
        else {//if null for some reason return empty JSON
            return [];
        }
    }
    catch (e) {
        console.log(e);
        return [];//if error just return empty JSON
    }
    const currentNotificationJSON = JSON.parse(currentNotifString);
    return [...currentNotificationJSON];
}
/**
 * @function removeNotification
 * @param {id} id id of notifcation to remove
 * @returns {dispatch}
 */
export const removeNotification = (id) => async dispatch => {

    let notifications = await readNotifications();
    let notificationIndex = notifications.findIndex(item => item.id === id);
    // eslint-disable-next-line no-unused-vars
    let deleted;
    if(notificationIndex == 0){
        deleted = notifications.splice(0, 1);
    }
    else{
        deleted = notifications.splice(notificationIndex, notificationIndex);
    }


    const notificationsString = JSON.stringify(notifications);
    await AsyncStorage.setItem("notifications", notificationsString);


    dispatch({
        type: REMOVE_NOTIFICATION,
        notifications: notifications
    });
}

export const loadNotifications = () => async dispatch => {
    const notifications = await readNotifications();
    //console.log(`loadNotifications ${notifications}`)
    dispatch({
        type: LOAD_NOTIFICATION,
        notifications: notifications
    });
    
}

export const addNotification = (id) => async dispatch => {
    const newNotifications = await saveNewNotification(id);
    dispatch({
        type: ADD_NOTIFICATION,
        notifications: newNotifications
    });

}



