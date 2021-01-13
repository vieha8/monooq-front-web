import React, { Fragment } from 'react';
import styled from 'styled-components';

const PaymentUrl = styled.a`
  word-break: break-all;
`;

export default ({ paymentMethod, paymentUrl }) => (
  <Fragment>
    {paymentMethod === 0 ? (
      <Fragment>
        メッセージ画面からスペースの住所を確認し、荷物を届けましょう。
        <br />
        <br />
        具体的な搬入日時はお決まりですか？
        <br />
        まだの場合はホストと調整を行いましょう。
      </Fragment>
    ) : (
      <Fragment>
        下記から決済画面に移動し、お支払いをお願いします。
        <br />
        <br />
        <PaymentUrl href={paymentUrl} target="_blank" rel="noopener noreferrer">
          {paymentUrl}
        </PaymentUrl>
        <br />
        <br />
        決済画面URLなどのお支払い情報はご登録メールアドレスにもお送りしております。
      </Fragment>
    )}
  </Fragment>
);
