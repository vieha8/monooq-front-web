// @flow

import React, { Component } from 'react';

export default function handleBeforeUnload(WrappedComponent: Component) {
  class handleBeforeUnloadComponent extends Component {
    componentDidMount() {
      // window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    componentWillUnmount() {
      window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    handleBeforeUnload = e => {
      e.preventDefault();
      e.returnValue = 'データが保存されませんが、よろしいですか?';
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return handleBeforeUnloadComponent;
}
