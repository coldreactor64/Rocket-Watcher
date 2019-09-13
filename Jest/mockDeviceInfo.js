/* eslint-disable*/


jest.mock('react-native-device-info', () => {
    return {
      getTimezone: jest.fn(() => 'America/Chicago')
    };
  });