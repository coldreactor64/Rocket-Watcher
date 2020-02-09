jest.mock('react-native-push-notification', () => {
    return {
      cancelAllLocalNotifications: jest.fn(),
      cancelLocalNotifications: jest.fn(),
      localNotificationSchedule: jest.fn()
    }
  });