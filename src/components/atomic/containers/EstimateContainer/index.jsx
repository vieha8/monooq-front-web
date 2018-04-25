// @flow

import React, { Component } from 'react';

import { requestActions } from 'redux/modules/request';
import { ErrorMessage } from 'strings';

import EstimateTemplate from 'components/atomic/templates/EstimateTemplate';
import Header from 'components/atomic/containers/Header';
import Hint from 'components/atomic/LV2/Hint';
import InputEstimate from 'components/atomic/LV3/InputEstimate';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

const Validate = {
  Price: {
    Min: 3000,
  },
};

type PropTypes = {
  dispatch: Function,
  isSending: boolean,
  user: {
    ID: number,
  },
};

class EstimateContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    this.state = {};
  }

  onDateChange: Function;
  onDateChange = (name, date) => {
    const state = this.state;
    state[name] = date;
    this.setState({
      ...state,
      dateFocus: null,
    });
  };

  onFocusChangeDatePicker: Function;
  onFocusChangeDatePicker = (name, focus) => {
    const state = this.state;
    state[name] = focus;
    this.setState(state);
  };

  handleChangePrice: Function;
  handleChangePrice = (value: string) => {
    const errors = [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    if (isNaN(value) || parseInt(value, 10) < Validate.Price.Min) {
      errors.push(ErrorMessage.EstimateMin(Validate.Price.Min));
    }

    const state = this.state;
    state.price = value;
    this.setState({
      ...state,
      errors,
    });
  };

  sendRequest: Function;
  sendRequest = () => {
    const { user, match } = this.props;
    const userId = user.ID;
    const roomId = match.params.message_room_id;
    const { begin, end, price } = this.state;
    this.props.dispatch(
      requestActions.estimate({
        userId,
        roomId,
        startDate: begin.toDate(),
        endDate: end.toDate(),
        price,
      }),
    );
  };

  validate: Function;
  validate = () => {
    const { begin, end, price } = this.state;

    return (
      begin &&
      end &&
      begin.diff(end, 'hours') < 24 &&
      price !== '' &&
      !isNaN(price) &&
      price >= Validate.Price.Min
    );
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { isSending } = this.props;
    const { begin, end, errors, price, beginFocus, endFocus } = this.state;

    return (
      <EstimateTemplate
        header={<Header />}
        form={
          <InputEstimate
            schedule={{
              beginDate: begin,
              beginDateFocused: beginFocus,
              onFocusChangeBegin: focus => this.onFocusChangeDatePicker('beginFocus', focus),
              onDateChangeBegin: date => this.onDateChange('begin', date),
              endDate: end,
              endDateFocused: endFocus,
              onFocusChangeEnd: focus => this.onFocusChangeDatePicker('endFocus', focus),
              onDateChangeEnd: date => this.onDateChange('end', date),
            }}
            price={{
              errors,
              onChange: value => this.handleChangePrice(value),
              value: price,
            }}
            buttonDisabled={!this.validate()}
            buttonLoading={isSending}
            onClickSend={this.sendRequest}
          />
        }
        hint={
          <Hint
            title="お見積もりのヒント"
            content={['メッセージの相談内容を元に最終的な見積もりを相手に提示しましょう。']}
          />
        }
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    user: state.auth.user,
    isSending: state.request.estimate.isSending,
  });

export default connect(EstimateContainer, mapStateToProps);
