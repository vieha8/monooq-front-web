// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import { Dimens, FontSizes } from 'variables';
import { salesActions } from 'redux/modules/sales';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import SalesAmountItem from 'components/atomic/LV2/SalesAmountItem';
import Button from 'components/atomic/LV1/Button';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import { selectDepositType } from 'helpers/prefectures';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

const InputText = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const SubmitButton = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const SalesAmountItemWrap = styled.div`
  ${media.phone`
    margin-top: 20px;
  `};
`;

const MsgWrap = styled.div`
  margin: 20px auto;
  font-size: ${FontSizes.medium}px;
  line-height: 26px;
  ${media.phone`
    font-size: ${FontSizes.small}px;
  `};
`;

const SalesAmountMsgWrap = styled.div`
  margin: 30px auto;
  font-size: ${FontSizes.medium1}px;
  font-weight: 700;
  line-height: 16px;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
  `};
`;

const ButtonWrap = styled.div`
  ${media.phone`
    display: block;
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: 1000;
    text-align: center;
    padding: 0 15px 15px;
  `};
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
      accountType: '',
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
    const { sales, history } = this.props;

    this.payouts = sales.reduce((a, x) => (a += x.PriceMinusFee), 0);
    this.payouts = numeral(this.payouts).format('0,0');

    if (this.payouts < 2400) {
      return (
        <Fragment>
          <SalesAmountItemWrap>
            <SalesAmountItem amount={this.payouts} />
          </SalesAmountItemWrap>
          <MsgWrap>
            振込申請は2,400円以上から可能です。
            <br />
            モノオクでスペースを登録してスペースを活用しましょう！
          </MsgWrap>
          <ButtonWrap>
            <Button primary fontbold center onClick={() => history.push(Path.createSpaceInfo())}>
              スペースを登録する。
            </Button>
          </ButtonWrap>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <SalesAmountItemWrap>
          <SalesAmountItem amount={this.payouts} />
        </SalesAmountItemWrap>
        <SalesAmountMsgWrap>振込先口座を指定してください。</SalesAmountMsgWrap>
        <InputText>
          <InputForm
            label="金融機関"
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
          <SelectForm
            label="預金種目"
            options={selectDepositType('選択してください')}
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
            確認画面へ
          </Button>
        </SubmitButton>
      </Fragment>
    );
  };

  leftContentComplete = () => {
    const { history } = this.props;

    return (
      <Fragment>
        <MsgWrap>
          振込申請が完了しました。
          <br />
          振込完了はメールにてお知らせいたします。しばらくお待ちください。
        </MsgWrap>
        <ButtonWrap>
          <Button primary fontbold center onClick={() => history.push(Path.top())}>
            トップへ
          </Button>
        </ButtonWrap>
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
            headline="振込申請の完了"
            leftContent={this.leftContentComplete()}
            rightContent={<ServiceMenu />}
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
