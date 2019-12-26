import React from 'react';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga';
import { initActions } from 'redux/modules/init';
import SystemError from 'components/LV3/SystemError';
import { parse } from 'helpers/query-string';
import { isAvailableLocalStorage } from 'helpers/storage';

class Root extends React.Component {
  constructor(props) {
    super(props);
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIncompatible =
      userAgent.indexOf('msie') !== -1 ||
      userAgent.indexOf('trident') !== -1 ||
      !localStorage ||
      !sessionStorage;

    this.state = {
      isIncompatible,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    return { hasError: true };
  }

  componentDidMount() {
    const { history, dispatch } = this.props;
    const query = parse(history.location.search);
    if (isAvailableLocalStorage() && query.invite_code) {
      localStorage.setItem('invite_code', query.invite_code);
    }
    const isLp = history.location.pathname.includes('/lp');
    if (!isLp) {
      dispatch(initActions.init());
    }
    ReactGA.initialize('UA-84238514-1');
    Sentry.init({
      dsn: 'https://d3223c25da3e4dcda892c9ac1cf7b0be@sentry.io/1287932',
      environment: process.env.NODE_ENV,
    });
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.configureScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
      });
      Sentry.captureException(error);
    }
  }

  incompatibleMessage = () => (
    <p>
      大変恐縮ですが、現在お使いのブラウザでモノオクはご利用いただけません。
      <br />
      Google Chrome、Safari、Firefox、Microsoft Edge等のブラウザの最新版をご利用ください。
    </p>
  );

  render() {
    const { children } = this.props;
    const { isIncompatible, hasError } = this.state;

    if (hasError) {
      return <SystemError />;
    }

    if (isIncompatible) {
      return this.incompatibleMessage();
    }

    return children;
  }
}

export default connect()(Root);
