// @flow

import React, { Component } from 'react';

import { requestActions } from 'redux/modules/request';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/LV2/Footer';
import HubRequest from 'components/atomic/LV3/HubRequest';
import HubRequestCompleted from 'components/atomic/LV3/HubRequest/Completed';

import { checkLogin, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  user: {
    ID: number,
    Email: string,
  },
};

class HubRequestContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    checkLogin(this.props);

    this.state = {
      baggageSize: '約1畳',
      cargoTime: '9時〜12時',
      hasChanged: false,
      email: props.user.Email,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user.ID && nextProps.user.ID) {
      const user = nextProps.user;
      this.setState({
        imageUri: user.ImageUrl,
        name: user.Name,
        email: user.Email,
        prefCode: user.PrefCode,
        profile: user.Profile,
      });
    }
  }

  onFocusChangeDatePicker: Function;
  onFocusChangeDatePicker = (name, focus) => {
    const { state } = this;
    state[name] = focus;
    this.setState(state);
  };

  onDateChange: Function;
  onDateChange = (name, date) => {
    const { state } = this;
    state[name] = date;
    this.setState({
      ...state,
      dateFocus: null,
    });
  };

  onClickButton: Function;
  onClickButton = () => {
    const { user } = this.props;

    this.setState({ hasChanged: false, errors: {} });

    if (this.validate()) {
      this.props.dispatch(requestActions.sendHubRequest({ userId: user.ID, body: this.state }));
    }

    this.setState({ hasChanged: true });
    window.scrollTo(0, 0);
  };

  handleChangeUI: Function;
  handleChangeUI = (propsName: string, value) => {
    const { state } = this;
    state[propsName] = value;
    this.setState(state);
  };

  validate: Function;
  validate = () => {
    const {
      startDate,
      endDate,
      baggageSize,
      baggageInfo,
      cargoDate,
      cargoTime,
      address,
      tel,
      email,
    } = this.state;
    return (
      startDate &&
      endDate &&
      baggageSize &&
      baggageInfo &&
      cargoDate &&
      cargoTime &&
      address &&
      tel &&
      email
    );
  };

  render() {
    // const auth = checkAuthState(this.props);
    // if (auth) {
    //   return auth;
    // }

    const { user } = this.props;

    const {
      startDate,
      endDate,
      startDateFocus,
      endDateFocus,
      baggageSize,
      baggageInfo,
      cargoDate,
      cargoDateFocus,
      cargoTime,
      address,
      tel,
      email,
      hasChanged,
    } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={hasChanged ? 'モノオクハブお申込み完了' : 'モノオクハブお申込み'}
        rightContent={
          hasChanged ? (
            <HubRequestCompleted userId={user.ID} />
          ) : (
            <HubRequest
              schedule={{
                beginDate: startDate,
                beginDateFocused: startDateFocus,
                onFocusChangeBegin: focus => this.onFocusChangeDatePicker('startDateFocus', focus),
                onDateChangeBegin: date => this.onDateChange('startDate', date),
                endDate,
                endDateFocused: endDateFocus,
                onFocusChangeEnd: focus => this.onFocusChangeDatePicker('endDateFocus', focus),
                onDateChangeEnd: date => this.onDateChange('endDate', date),
              }}
              baggageSize={baggageSize}
              onChangeBaggageSize={value => this.handleChangeUI('baggageSize', value)}
              baggageInfo={baggageInfo}
              onChangeBaggageInfo={value => this.handleChangeUI('baggageInfo', value)}
              cargoDate={cargoDate}
              cargoDateFocused={cargoDateFocus}
              onFocusChangeCargo={focus => this.onFocusChangeDatePicker('cargoDateFocus', focus)}
              onDateChangeCargo={date => this.onDateChange('cargoDate', date)}
              cargoTime={cargoTime}
              onChangeCargoTime={value => this.handleChangeUI('cargoTime', value)}
              address={address}
              onChangeAddress={value => this.handleChangeUI('address', value)}
              tel={tel}
              onChangeTel={value => this.handleChangeUI('tel', value)}
              email={email}
              onChangeEmail={value => this.handleChangeUI('email', value)}
              buttonDisabled={!this.validate()}
              onClickButton={this.onClickButton}
            />
          )
        }
        footer={<Footer />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    user: state.auth.user || {},
  });

export default connect(
  HubRequestContainer,
  mapStateToProps,
);
