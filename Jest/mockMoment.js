//Its a mock, but not a mock lulz
const moment = require.requireActual('moment-timezone');
jest.doMock('moment', () => {
  moment.tz.setDefault('America/Los_Angeles');
  return moment;
});
