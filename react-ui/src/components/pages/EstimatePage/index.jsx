import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ErrorMessages } from 'variables';
import { requestActions } from 'redux/modules/request';
import BaseTemplate from 'components/templates/BaseTemplate';
import Estimate from 'components/LV3/Estimate';
import { iskeyDownEnter } from 'helpers/keydown';
import { formatAddComma, formatRemoveComma } from 'helpers/string';
import { isValidSpacePrice } from 'helpers/validations/spacePrice';
import withAuthRequire from 'components/hooks/withAuthRequire';

const Validate = {
  Price: {
    Max: 300000,
    Min: 3000,
  },
};

class EstimatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      error: {},
    };
  }

  onDateChange = (name, date) => {
    const { state } = this;
    state[name] = date;
    this.setState({
      ...state,
      dateFocus: null,
    });
  };

  onFocusChangeDatePicker = (name, focus) => {
    const { state } = this;
    state[name] = focus;
    this.setState(state);
  };

  handleChangePrice = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];
    let returnValue = formatRemoveComma(value);

    const { result, reason } = isValidSpacePrice(returnValue);
    if (result) {
      returnValue = formatAddComma(returnValue);
    } else {
      errors.push(reason);
    }

    state[propName] = returnValue;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  sendRequest = () => {
    const { user, match, dispatch } = this.props;
    const userId = user.id;
    const roomId = match.params.message_room_id;
    const { begin, end, price } = this.state;
    dispatch(
      requestActions.estimate({
        userId,
        roomId,
        startDate: begin.toDate(),
        endDate: end.toDate(),
        price: formatRemoveComma(price),
      }),
    );
  };

  onKeyDownSend = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.sendRequest();
    }
  };

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
      <BaseTemplate>
        <Estimate
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
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isSending: state.request.estimate.isSending,
});

export default withAuthRequire(connect(mapStateToProps)(EstimatePage));
