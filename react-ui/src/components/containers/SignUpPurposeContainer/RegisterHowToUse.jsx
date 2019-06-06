// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { userActions } from 'redux/modules/user';
import RegisterHowToUse from 'components/LV3/RegisterHowToUse';
import ReactGA from 'react-ga';

type PropTypes = {
  dispatch: Function,
  isLoading: boolean,
};

type State = {
  image: ?File,
  name: string,
  prefCode: string,
  profile: string,
  isHost: boolean,
  hasChanged: boolean,
};

export default class RegisterHowToUseContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      isHost: 0,
    };
  }

  onClickRegisterProfile = () => {
    const { dispatch, user, history } = this.props;
    const { isHost } = this.state;
    dispatch(
      userActions.updateUser({
        userId: user.ID,
        body: { isHost: Boolean(isHost) },
      }),
    );
    history.push(Path.home());
  };

  handleChangeForm = (name: string, value: any) => {
    const { state } = this;
    state[name] = value;
    state.hasChanged = true;
    this.setState(state);
  };

  render() {
    const { isLoading, history, user } = this.props;
    const { isHost } = this.state;
    return (
      <RegisterHowToUse
        userName={user.Name}
        onChangeIsHost={value => this.handleChangeForm('isHost', value)}
        isHost={isHost}
        onClickSkip={() => {
          ReactGA.event({
            category: 'User Register',
            action: 'Skip HowToUse',
          });
          history.push(Path.home());
        }}
        onClickRegisterProfile={this.onClickRegisterProfile}
        buttonLoading={isLoading}
      />
    );
  }
}
