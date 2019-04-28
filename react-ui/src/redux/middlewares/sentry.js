import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';

Raven.config('https://d3223c25da3e4dcda892c9ac1cf7b0be@sentry.io/1287932').install();

export default createRavenMiddleware(Raven, {});
