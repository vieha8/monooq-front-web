import KeenTracking from 'keen-tracking';

const PROJECT_ID = '5cb6df09c9e77c0001ee1cad';
const WRITE_KEY =
  'C545007EA59DB8AE1CBD4BD5315B9D2416DAB411D356F3D390EAC5F5A8B8F3229983E6EE3A17B200D3D700EA318AFE356E560973FF92AAE0E98235419ADA94F2653DCF749976C22134FEA056D72F98A1E948C74B99B5D39689CCF52E8BFC80BD';

export const keenClient = new KeenTracking({
  projectId: PROJECT_ID,
  writeKey: WRITE_KEY,
});
