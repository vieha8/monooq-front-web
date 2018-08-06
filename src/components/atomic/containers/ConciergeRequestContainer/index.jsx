// @flow

import React, { Component } from 'react';

import { requestActions } from 'redux/modules/request';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/LV2/Footer';
import ConciergeRequest from 'components/atomic/LV3/ConciergeRequest';
import ConciergeRequestCompleted from 'components/atomic/LV3/ConciergeRequest/Completed';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  user: {
    ID: number,
  },
};

class HubRequestContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    checkLogin(this.props);

    this.state = {
      baggageSize: '約1畳',
      cargoTime: '9時〜12時',
      notes: '',
      hasChanged: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
      this.props.dispatch(
        requestActions.sendConciergeRequest({ userId: user.ID, body: this.state }),
      );
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
    console.log(this.state);
    const { startDate, endDate, baggageSize, baggageInfo, address, budget } = this.state;
    return startDate && endDate && baggageSize && baggageInfo && address && budget;
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { user } = this.props;

    const {
      startDate,
      endDate,
      startDateFocus,
      endDateFocus,
      baggageSize,
      baggageInfo,
      address,
      budget,
      notes,
      hasChanged,
    } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={
          hasChanged ? 'モノオクコンシェルジュお申込み完了' : 'モノオクコンシェルジュお申込み'
        }
        rightContent={
          hasChanged ? (
            <ConciergeRequestCompleted userId={user.ID} />
          ) : (
            <ConciergeRequest
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
              onChangeCargoTime={value => this.handleChangeUI('cargoTime', value)}
              address={address}
              onChangeAddress={value => this.handleChangeUI('address', value)}
              notes={notes}
              onChangeNotes={value => this.handleChangeUI('notes', value)}
              budget={budget}
              onChangeBudget={value => this.handleChangeUI('budget', value)}
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
