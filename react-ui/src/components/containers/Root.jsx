import React from 'react';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { initActions } from 'redux/modules/init';
import LoadingPage from 'components/LV3/LoadingPage';
import SystemError from 'components/LV3/SystemError';

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
    props.dispatch(initActions.init());
  }

  incompatibleMessage = () => (
    <p>
      大変恐縮ですが、現在お使いのブラウザでモノオクはご利用いただけません。
      <br />
      Google Chrome、Safari、Firefox、Microsoft Edge等のブラウザの最新版をご利用ください。
    </p>
  );

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  render() {
    const { isInitialized, children } = this.props;
    const { isIncompatible, hasError } = this.state;

    if (hasError) {
      return <SystemError />;
    }

    if (isIncompatible) {
      return this.incompatibleMessage();
    }

    if (!isInitialized) {
      return <LoadingPage />;
    }

    return children;
  }
}

const mapStateToProps = state => ({
  isInitialized: state.init.isInitialized,
});

export default connect(mapStateToProps)(Root);
