import {storeFactory} from '../../helpers/helperFunctions';
import {addNotification, removeNotification, loadNotifications} from '../../../redux/actions/notificationActions'
import AsyncStorage from '@react-native-community/async-storage';


import moment from 'moment'

const testNotification = [{
    id: 12,
    time: "20200730T080000Z",
    notify: true
},
{
    id: 13,
    time: "20200730T080000Z",
    notify: true
},
{
    id: 14,
    time: "20200730T080000Z",
    notify: true
}]

describe('Test Notification Async Storage', () => {
    test('Grabs notifications from local storage and updates state, with regular data', () => {
        const store = storeFactory();
        AsyncStorage.getItem.mockImplementation(() => JSON.stringify(testNotification));
        return store.dispatch(loadNotifications())
        .then(()=> {
            const newState = store.getState()
            expect(newState.notifications.notifications).toEqual(testNotification)
        })
    })
    test('Grabs notifications from local storage and updates state, with empty data', () => {
        const store = storeFactory();
        AsyncStorage.getItem.mockImplementation(() => null);
        return store.dispatch(loadNotifications())
        .then(()=> {
            const newState = store.getState()
            expect(newState.notifications.notifications).toEqual([])
        })
    })
})
