import Keen from 'keen-tracking';
import { captureException } from '@sentry/browser';

// Record all actions to a single event stream
const EVENT_STREAM_NAME = 'redux_actions';

// Omit noisy actions if necessary
const OMITTED_ACTIONS = [
  // '@@router/LOCATION_CHANGE'
];

const PROJECT_ID = '5cb6df09c9e77c0001ee1cad';
const WRITE_KEY =
  'C545007EA59DB8AE1CBD4BD5315B9D2416DAB411D356F3D390EAC5F5A8B8F3229983E6EE3A17B200D3D700EA318AFE356E560973FF92AAE0E98235419ADA94F2653DCF749976C22134FEA056D72F98A1E948C74B99B5D39689CCF52E8BFC80BD';

// Define a client instance
const client = new Keen({
  projectId: PROJECT_ID,
  writeKey: WRITE_KEY,
});

if (process.env.NODE_ENV !== 'production') {
  // Optionally prevent recording in dev mode
  Keen.enabled = true;
  // Display events in the browser console
  client.on('recordEvent', Keen.log);
}

// Track a 'pageview' event and initialize auto-tracking data model
client.initAutoTracking({
  recordClicks: false,
  recordFormSubmits: false,
  recordPageViews: true,
});

const reduxMiddleware = ({ getState }) => {
  return next => action => {
    const { auth } = getState();
    const returnValue = next(action);
    const eventBody = {
      action,
      user: auth.user,
      env: process.env.NODE_ENV,
      /*
          Include additional properties here, or
          refine the state data that is recorded
          by cherry-picking specific properties
      */
    };
    // Filter omitted actions by action.type
    // ...or whatever you name this property
    if (OMITTED_ACTIONS.indexOf(action.type) < 0) {
      try {
        client.recordEvent(EVENT_STREAM_NAME, eventBody);
      } catch (e) {
        captureException(e);
      }
    }
    return returnValue;
  };
};

export default reduxMiddleware;
