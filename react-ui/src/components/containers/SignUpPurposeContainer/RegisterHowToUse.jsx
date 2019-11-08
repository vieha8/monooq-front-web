import React, { Component } from 'react';
import Path from 'config/path';
import { userActions } from 'redux/modules/user';
import RegisterHowToUse from 'components/LV3/RegisterHowToUse';
import ReactGA from 'react-ga';

export default class RegisterHowToUseContainer extends Component {
  constructor(props) {
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
        userId: user.id,
        body: { isHost: Boolean(isHost) },
      }),
    );
    history.push(Path.top());
  };

  handleChangeForm = (name, value) => {
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
        userName={user.name}
        onChangeIsHost={value => this.handleChangeForm('isHost', value)}
        isHost={isHost}
        onClickSkip={() => {
          ReactGA.event({
            category: 'User Register',
            action: 'Skip HowToUse',
          });
          history.push(Path.top());
        }}
        onClickRegisterProfile={this.onClickRegisterProfile}
        buttonLoading={isLoading}
      />
    );
  }
}
