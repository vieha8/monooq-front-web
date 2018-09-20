import React from 'react';
import ErrorContainer from 'containers/Static/Error';
import firebase from 'firebase/app';
import { connect } from 'react-redux';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    const db = firebase.firestore();

    const data = {
      error: error.toString(),
      info: JSON.stringify(info.componentStack),
      timestamp: new Date(),
    };
    if (this.props.auth.user.ID) {
      data.userId = this.props.auth.user.ID;
    }
    if (this.props.router.location.pathname) {
      data.path = this.props.router.location.pathname;
    }
    db.collection('errors').add(data);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorContainer />;
    }
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  router: state.router,
});

export default connect(mapStateToProps)(ErrorBoundary);
