// @flow

import React, { Component } from 'react';
import Registered from 'components/atomic/organisms/Registered';
import Path from 'config/path';

type PropTypes = {
  history: {
    push: Function,
  },
  user: {
    ImageUrl: string,
    Name: string,
  },
}

export default class RegisteredContainer extends Component<PropTypes> {
  onClickUser = () => {
    const { history } = this.props;
    history.push(Path.top());
  }

  onClickHost = () => {
    const { history } = this.props;
    history.push(Path.createSpaceInfo());
  }

  render() {
    const { user } = this.props;

    return (
      <Registered
        image={user.ImageUrl}
        name={user.Name}
        onClickUser={this.onClickUser}
        onClickHost={this.onClickHost}
      />
    );
  }
}
