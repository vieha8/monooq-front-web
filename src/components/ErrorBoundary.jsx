import React from 'react';
import ErrorContainer from 'containers/Static/Error';
import firebase from "firebase";

require('firebase/firestore');

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    const db = firebase.firestore();
    db.collection('errors').add({
      error: error.toString(),
      info: JSON.stringify(info.componentStack),
      timestamp: new Date(),
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorContainer />;
    }
    return this.props.children;
  }
}
