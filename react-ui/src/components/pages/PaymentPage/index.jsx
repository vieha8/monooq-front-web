import React, { Component } from 'react';
import numeral from 'numeral';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Path from 'config/path';
import { formatDate, formatStringSlash } from 'helpers/date';
import { requestActions } from 'redux/modules/request';
import withAuthRequire from 'components/hooks/withAuthRequire';
import BaseTemplate from 'components/templates/BaseTemplate';
import Payment from 'components/LV3/Payment';
import LoadingPage from 'components/LV3/LoadingPage';

class PaymentPage extends Component {
  constructor(props) {
    super(props);
    const { dispatch, match } = this.props;
    const requestId = match.params.request_id;
    dispatch(requestActions.fetchRequest(requestId));
  }

  render() {
    const {
      match,
      request,
      paymentUrl,
      isPaymentSuccess,
      isPaymentFailed,
      errMsgPayment,
      isSending,
    } = this.props;

    const space = (request && request.space) || {};
    const requestId = match.params.request_id;

    if (!requestId) {
      return <Redirect to={Path.messageList()} />;
    }

    // TODO: リクエスト取得失敗時のエラーハンドリング
    if (!request) {
      return <LoadingPage />;
    }

    return (
      <BaseTemplate>
        <Payment
          space={space}
          paymentData={{
            beginAt: formatDate(new Date(request.startDate), formatStringSlash),
            endAt: formatDate(new Date(request.endDate), formatStringSlash),
            isUndecided: request.isUndecided,
            price: numeral(request.price).format('0,0'),
            pricePlusFee: request.pricePlusFee,
            pricePlusFeeMonthly: String(
              Math.floor(
                request.pricePlusFee / (request.isUndecided === 1 ? 1 : request.usagePeriod),
              ),
            ),
            isTakelateBefore: request.isTakelateBefore,
          }}
          paymentUrl={paymentUrl}
          isPaymentSuccess={isPaymentSuccess}
          paidError={isPaymentFailed}
          errMsgPayment={errMsgPayment}
          buttonLoading={isSending}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  request: state.request.request,
  paymentUrl: state.request.payment.url,
  isPaymentSuccess: state.request.payment.isSuccess,
  isPaymentFailed: state.request.payment.isFailed,
  errMsgPayment: state.request.payment.errMsg,
  isSending: state.request.payment.isSending,
});

export default withAuthRequire(connect(mapStateToProps)(PaymentPage));
