import KeenTracking from 'keen-tracking';
import { captureException } from '@sentry/browser';

const PROJECT_ID = '5cb6df09c9e77c0001ee1cad';
const WRITE_KEY =
  'C545007EA59DB8AE1CBD4BD5315B9D2416DAB411D356F3D390EAC5F5A8B8F3229983E6EE3A17B200D3D700EA318AFE356E560973FF92AAE0E98235419ADA94F2653DCF749976C22134FEA056D72F98A1E948C74B99B5D39689CCF52E8BFC80BD';

export const keenClient = new KeenTracking({
  projectId: PROJECT_ID,
  writeKey: WRITE_KEY,
});

const { helpers } = KeenTracking;
const { utils } = KeenTracking;

const sessionCookie = utils.cookie('keen-monooq');
if (!sessionCookie.get('keen_uuid')) {
  sessionCookie.set('keen_uuid', helpers.getUniqueId());
  sessionCookie.set('first_visited_at', new Date().toISOString());
  sessionCookie.set('first_referrer', document.referrer);
}

export const recordEvent = (eventName, body) => {
  const eventBody = {
    ...body,
    env: process.env.NODE_ENV,
    // eslint-disable-next-line no-template-curly-in-string
    ip_address: '${keen.ip}',
    // eslint-disable-next-line no-template-curly-in-string
    user_agent: '${keen.user_agent}',
    page: {
      url: document.location.href,
    },
    timestamp: new Date().toISOString(),
    visitor: {
      uuid: sessionCookie.get('keen_uuid'),
      first_visited_at: sessionCookie.get('first_visited_at'),
      first_referrer: sessionCookie.get('first_referrer'),
    },
    keen: {
      addons: [
        {
          name: 'keen:ip_to_geo',
          input: {
            ip: 'ip_address',
          },
          output: 'ip_geo_info',
        },
        {
          name: 'keen:ip_to_geo',
          input: {
            ip: 'ip_address',
          },
          output: 'ip_geo_info',
        },
        {
          name: 'keen:url_parser',
          input: {
            url: 'page.url',
          },
          output: 'parsed_page_url',
        },
        {
          name: 'keen:referrer_parser',
          input: {
            page_url: 'page.url',
            referrer_url: 'referrer.url',
          },
          output: 'referrer.info',
        },
        {
          name: 'keen:date_time_parser',
          input: {
            date_time: 'keen.timestamp',
          },
          output: 'timestamp_info',
        },
        {
          name: 'keen:date_time_parser',
          input: {
            date_time: 'visitor.first_visited_at',
          },
          output: 'visitor.first_visited_info',
        },
        {
          name: 'keen:referrer_parser',
          input: {
            page_url: 'page.url',
            referrer_url: 'visitor.first_referrer',
          },
          output: 'visitor.first_referrer_info',
        },
      ],
    },
  };
  keenClient.recordEvent(eventName, eventBody).catch(err => {
    captureException(err);
  });
};
