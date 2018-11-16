// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import { Dimens } from 'variables';
import { salesActions } from 'redux/modules/sales';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import InlineText from 'components/atomic/LV1/InlineText';
import Footer from 'components/atomic/LV2/Footer';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import InputForm from 'components/atomic/LV2/InputForm';
import Button from 'components/atomic/LV1/Button';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

const InputText = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const SubmitButton = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const AlertText = styled.div`
  margin-top: ${Dimens.medium}px;
`;

class SalesContainer extends Component {
  constructor(props) {
    super(props);
    checkLogin(this.props);

    const { dispatch } = this.props;
    dispatch(salesActions.fetchSales());

    this.state = {
      bankName: '',
      branchName: '',
      accountType: '普通',
      accountNumber: '',
      accountName: '',
      isSend: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChangeInput = (name, value) => {
    const { state } = this;
    state[name] = value;
    this.setState(state);
  };

  submitButton = () => {
    const { user, dispatch, sales } = this.props;
    const { bankName, branchName, accountType, accountNumber, accountName } = this.state;
    const userId = user.ID;
    const payouts = sales.reduce((a, x) => (a += x.PriceMinusFee), 0);

    dispatch(
      salesActions.sendPayouts({
        userId,
        bankName,
        branchName,
        accountType,
        accountNumber,
        accountName,
        payouts,
      }),
    );
    window.scrollTo(0, 0);
    this.setState({ isSend: true });
  };

  validate = () => {
    const { bankName, branchName, accountType, accountNumber, accountName } = this.state;
    return (
      bankName &&
      bankName.length > 0 &&
      branchName &&
      branchName.length > 0 &&
      accountType &&
      accountType.length > 0 &&
      accountNumber &&
      accountNumber.length > 0 &&
      accountName &&
      accountName.length > 0
    );
  };

  leftContent = () => {
    const { sales } = this.props;

    this.payouts = sales.reduce((a, x) => (a += x.PriceMinusFee), 0);
    this.payouts = numeral(this.payouts).format('0,0');

    if (this.payouts < 2400) {
      return (
        <InlineText.Base>
          現在の売上は
          {this.payouts}
          円です。振込申請は2,400円以上から可能です。
          <br />
          これは20%のサービス利用手数料を差し引いた金額となります。
        </InlineText.Base>
      );
    }

    return (
      <Fragment>
        <InlineText.Base>
          振込可能な売上は
          {this.payouts}
          円です。
          <br />
          振込先の本人口座をご入力ください。
        </InlineText.Base>
        <InputText>
          <InputForm
            label="金融機関名"
            placeholder="○○銀行"
            onChange={e => this.handleChangeInput('bankName', e.target.value)}
            value={this.state.bankName}
          />
        </InputText>
        <InputText>
          <InputForm
            label="支店名"
            placeholder="○○支店"
            onChange={e => this.handleChangeInput('branchName', e.target.value)}
            value={this.state.branchName}
          />
        </InputText>
        <InputText>
          <InputForm
            label="預金種目"
            placeholder="普通"
            onChange={e => this.handleChangeInput('accountType', e.target.value)}
            value={this.state.accountType}
          />
        </InputText>
        <InputText>
          <InputForm
            label="口座番号"
            placeholder="1234567"
            onChange={e => this.handleChangeInput('accountNumber', e.target.value)}
            value={this.state.accountNumber}
          />
        </InputText>
        <InputText>
          <InputForm
            label="口座名義"
            placeholder="ヤマダ タロウ"
            onChange={e => this.handleChangeInput('accountName', e.target.value)}
            value={this.state.accountName}
          />
        </InputText>
        <SubmitButton>
          <Button fill={1} primary onClick={this.submitButton} disabled={!this.validate()}>
            振込申請をする
          </Button>
        </SubmitButton>
        <AlertText>
          <InlineText.Small>
            上記の売上から振込手数料を差し引いた金額をお支払い致します。
            <br />
            ※振込金額が10,000円以上の場合は、振込手数料は無料となります。10,000円以下の場合、260円の振込手数料を差し引いた金額を入金致します。
          </InlineText.Small>
        </AlertText>
      </Fragment>
    );
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    if (this.props.isLoading) {
      return <LoadingPage />;
    }

    if (this.state.isSend) {
      return (
        <div>
          <MenuPageTemplate
            header={<Header />}
            headline="売上・振込申請"
            leftContent={
              <InlineText.Base>
                申請ありがとうございました。5営業日以内にお振込み致します。
              </InlineText.Base>
            }
            rightContent={<ServiceMenu />}
            footer={<Footer />}
          />
        </div>
      );
    }

    return (
      <div>
        <MenuPageTemplate
          header={<Header />}
          headline="売上・振込申請"
          leftContent={this.leftContent()}
          rightContent={<ServiceMenu />}
          footer={<Footer />}
        />
      </div>
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    sales: state.sales.sales,
    isLoading: state.sales.isLoading,
    user: state.auth.user,
  });

export default connect(
  SalesContainer,
  mapStateToProps,
);
