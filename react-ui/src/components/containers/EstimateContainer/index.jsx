// @flow

import React, { Component } from 'react';

import { requestActions } from 'redux/modules/request';
import { ErrorMessages } from 'variables';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import InputEstimate from 'components/LV3/InputEstimate';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';
import { formatAddComma, formatRemoveComma } from 'helpers/string';

const Validate = {
  Price: {
    Num: /^[0-9]+$/,
    Max: 300000,
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
    this.state = {
      price: '',
      error: {},
    };
  }

  onDateChange: Function;

  onDateChange = (name, date) => {
    const { state } = this;
    state[name] = date;
    this.setState({
      ...state,
      dateFocus: null,
    });
  };

  onFocusChangeDatePicker: Function;

  onFocusChangeDatePicker = (name, focus) => {
    const { state } = this;
    state[name] = focus;
    this.setState(state);
  };

  handleChangePrice: Function;

  handleChangePrice = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];
    let returnValue = formatRemoveComma(value);

    if (returnValue.length === 0) {
      errors.push(ErrorMessages.PleaseInput);
    } else {
      if (!Number(returnValue) || !String(returnValue).match(Validate.Price.Num)) {
        errors.push(ErrorMessages.PriceNumber);
      } else {
        if (returnValue < Validate.Price.Min) {
          errors.push(ErrorMessages.EstimateMin(Validate.Price.Min));
        }
        if (returnValue > Validate.Price.Max) {
          errors.push(ErrorMessages.EstimateMax(Validate.Price.Max));
        }
        returnValue = formatAddComma(returnValue);
      }
    }

    state[propName] = returnValue;
    error[propName] = errors;
    this.setState({ ...state, error });
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
        price: formatRemoveComma(price),
      }),
    );
  };

  onKeyDownSend: Function;

  onKeyDownSend = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.sendRequest();
    }
  };

  validate: Function;

  validate = () => {
    const { begin, end, price } = this.state;

    const checkPrice = formatRemoveComma(price);

    return (
      begin &&
      end &&
      begin.diff(end, 'hours') < 24 &&
      checkPrice &&
      checkPrice >= Validate.Price.Min &&
      checkPrice <= Validate.Price.Max
    );
  };

  render() {
    const { isSending } = this.props;
    const { begin, end, error, price, beginFocus, endFocus } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="見積もりを送る"
        leftContent={
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
              errors: error.price,
              onChange: value => this.handleChangePrice('price', value),
              value: price,
            }}
            buttonDisabled={!this.validate()}
            buttonLoading={isSending}
            onClickSend={this.sendRequest}
            onKeyDownSend={this.onKeyDownSend}
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isSending: state.request.estimate.isSending,
});

export default authRequired(connect(mapStateToProps)(EstimateContainer));
