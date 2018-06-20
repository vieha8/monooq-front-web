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
    const { bankName, branchName, accountType, accountNumber, accountName } = this.state;
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

  rightContent = () => {
    const { sales } = this.props;

    this.payouts = sales.reduce((a, x) => (a += x.PriceMinusFee), 0);
    this.payouts = numeral(this.payouts).format('0,0');

    if (this.payouts === 0) {
      return <InlineText.Base>振込可能な売上はありません。</InlineText.Base>;
    }

    return (
      <Fragment>
        <InlineText.Base>
          振込可能な売上は{this.payouts}円です。<br />
          手数料の説明とか書くよ。<br />
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

    return (
      <div>
        <MenuPageTemplate
          header={<Header />}
          headline="売上確認・振込申請"
          leftContent={<ServiceMenu />}
          rightContent={this.rightContent()}
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
