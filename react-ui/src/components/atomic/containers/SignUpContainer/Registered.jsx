// @flow

import React, { Component } from 'react';
import Registered from 'components/atomic/LV3/Registered';
import Path from 'config/path';

type PropTypes = {
  history: {
    push: Function,
  },
  user: {
    ID: number,
    ImageUrl: string,
    Name: string,
  },
};

export default class RegisteredContainer extends Component<PropTypes> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickUser = () => {
    const { history } = this.props;
    history.push(Path.top());
  };

  onClickHost = () => {
    const { history } = this.props;
    history.push(Path.createSpaceInfo());
  };

  render() {
    const { user } = this.props;

    return (
      <Registered
        userId={user.ID}
        image={user.ImageUrl}
        name={user.Name}
        onClickUser={this.onClickUser}
        onClickHost={this.onClickHost}
      />
    );
  }
}
