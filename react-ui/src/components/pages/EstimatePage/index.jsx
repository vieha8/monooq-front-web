import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ErrorMessages } from 'variables';
import { requestActions } from 'redux/modules/request';
import { iskeyDownEnter } from 'helpers/keydown';
import { formatAddComma, formatRemoveComma } from 'helpers/string';
import { isNumber } from 'helpers/validations/number';
import { isValidSpacePrice } from 'helpers/validations/spacePrice';
import { isTrimmedEmpty } from 'helpers/validations/string';
import isValidTatami from 'helpers/validations/tatami';
import BaseTemplate from 'components/templates/BaseTemplate';
import withAuthRequire from 'components/hooks/withAuthRequire';
import Estimate from 'components/LV3/Estimate';

const Validate = {
  UsagePeriod: {
    Max: 24,
    Min: 1,
  },
  Price: {
    Max: 300000,
    Min: 3000,
  },
};

class EstimatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usagePeriod: '',
      price: '',
      tatami: '',
      indexTatami: 0,
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

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];
    let returnValue = formatRemoveComma(value);

    switch (propName) {
      case 'usagePeriod':
        if (!returnValue || returnValue.length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (!isNumber(returnValue)) {
          errors.push(ErrorMessages.UsagePeriodNumber);
        } else if (returnValue < Validate.UsagePeriod.Min) {
          errors.push(ErrorMessages.UsagePeriodMin(Validate.UsagePeriod.Min));
        } else if (returnValue > Validate.UsagePeriod.Max) {
          errors.push(ErrorMessages.UsagePeriodMax(Validate.UsagePeriod.Max));
        }
        break;
      case 'tatami':
        if (!isTrimmedEmpty(Number.toString(returnValue))) {
          const { result, reason } = isValidTatami(returnValue);
          if (!result) {
            errors.push(reason);
          }
        }
        break;
      case 'indexTatami':
        returnValue = value;
        break;
      case 'price': {
        const { result, reason } = isValidSpacePrice(returnValue);
        if (!result) {
          errors.push(reason);
        }
        if (isNumber(returnValue)) {
          returnValue = formatAddComma(returnValue);
        }
        break;
      }
      default:
    }

    state[propName] = returnValue;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  // TODO: 実装
  sendRequest = () => {
    const { user, match, dispatch } = this.props;
    const userId = user.id;
    const roomId = match.params.message_room_id;
    const { begin, end, usagePeriod, price } = this.state;
    dispatch(
      requestActions.estimate({
        userId,
        roomId,
        startDate: begin.toDate(),
        endDate: end.toDate(),
        usagePeriod,
        price: formatRemoveComma(price),
      }),
    );
  };

  onKeyDownSend = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.sendRequest();
    }
  };

  // TODO: 実装
  validate = () => {
    const { begin, end, usagePeriod, tatami, price } = this.state;

    const checkPrice = formatRemoveComma(price);

    return (
      begin &&
      end &&
      begin.diff(end, 'hours') < 24 &&
      usagePeriod &&
      usagePeriod >= Validate.UsagePeriod.Min &&
      usagePeriod <= Validate.UsagePeriod.Max &&
      (!tatami || isValidTatami(tatami).result) &&
      checkPrice &&
      checkPrice >= Validate.Price.Min &&
      checkPrice <= Validate.Price.Max
    );
  };

  // TODO: スペース情報取得(サイズ/価格)
  render() {
    const { isSending } = this.props;
    const { begin, error, usagePeriod, tatami, indexTatami, price, beginFocus } = this.state;

    return (
      <BaseTemplate>
        <Estimate
          schedule={{
            beginDate: begin,
            beginDateFocused: beginFocus,
            onFocusChangeBegin: focus => this.onFocusChangeDatePicker('beginFocus', focus),
            onDateChangeBegin: date => this.onDateChange('begin', date),
          }}
          usagePeriod={{
            errors: error.usagePeriod,
            onChange: value => this.handleChangeUI('usagePeriod', value),
            value: usagePeriod,
          }}
          tatamiProperty={{
            errors: error.tatami,
            tatami,
            onChangeTatami: e => this.handleChangeUI('tatami', e.target.value),
            indexTatami,
            onClickTatamiMethod: v => this.handleChangeUI('indexTatami', v),
          }}
          price={6000}
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
