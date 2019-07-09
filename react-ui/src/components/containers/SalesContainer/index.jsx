// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { salesActions } from 'redux/modules/sales';

import ServiceMenu from 'components/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import Header from 'components/containers/Header';
import LoadingPage from 'components/LV3/LoadingPage';
import InputForm from 'components/LV2/InputForm';
import Confirm from 'components/LV2/InputForm/confirm';
import SelectForm from 'components/LV2/SelectForm';
import SalesAmountItem from 'components/LV2/SalesAmountItem';
import Button from 'components/LV1/Button';
import EntryButtons from 'components/LV2/EntryButtons';
import InlineText from 'components/LV1/InlineText';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import { selectDepositType } from 'helpers/depositTypes';
import { iskeyDownEnter } from 'helpers/keydown';

const PRICE_MIN_DEPOSIT = 3000;

const InputText = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const SubmitButton = styled.div`
  max-width: 240px;
  margin: ${Dimens.medium2}px auto 0;
  ${media.phone`
    max-width: 100%;
  `};
`;

const SalesAmountItemWrap = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${props =>
    props.confirm &&
    `
    margin-top: 0;
  `};
  ${media.phone`
    margin-top: ${Dimens.medium_20}px;
    ${props =>
      props.confirm &&
      `
      margin-top: 0;
    `};
  `};
`;

const MsgWrap = styled.div`
  margin: ${Dimens.medium_20}px auto ${Dimens.medium2}px;
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
`;

const SalesAmountMsgWrap = styled.div`
  margin: ${Dimens.medium2}px auto;
  font-size: ${FontSizes.medium_18}px;
  font-weight: 700;
  line-height: 16px;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    display: block;
    width: 100%;
    max-width: 100%;
    position: relative;
    left: 0px;
    bottom: 0px;
    text-align: center;
    padding: 0 0px 15px;
  `};
`;

const ConfirmSalesWrap = styled.div`
  padding: ${Dimens.medium1}px ${Dimens.small2_14}px 0;
  ${props =>
    props.singleline &&
    `
    float: left;
    width: 50%;
  `};
  ${props =>
    props.clearfix &&
    `
    clear: both;
  `};
  ${props =>
    props.bottom &&
    `
    padding-bottom: ${Dimens.medium3}px;
  `};
  ${media.phone`
    padding: ${Dimens.medium_20}px 0px 0;
    ${props =>
      props.bottom &&
      `
      padding-bottom: ${Dimens.small_10}px;
    `};
  `};
`;

const CautionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Dimens.medium1}px ${Dimens.small}px;
  text-align: left;
  ${media.phone`
    padding: ${Dimens.small2_14}px 0;
  `};
`;

const CautionText = styled(InlineText.Base)`
  width: 100%;
  font-size: ${FontSizes.small_12}px;
  margin-bottom: ${Dimens.xsmall}px;
`;

class SalesContainer extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    dispatch(salesActions.fetchSales());

    this.state = {
      bankName: '',
      branchName: '',
      accountType: '1',
      accountNumber: '',
      accountName: '',
      isConfirm: false,
    };
  }

  historyToSpaceInfo = () => {
    const { history } = this.props;
    history.push(Path.createSpaceInfo());
  };

  onKeyDownButtonSpaceInfo = e => {
    if (iskeyDownEnter(e)) {
      this.historyToSpaceInfo();
    }
  };

  historyToHome = () => {
    const { history } = this.props;
    history.push(Path.home());
  };

  onKeyDownButtonHome = e => {
    if (iskeyDownEnter(e)) {
      this.historyToHome();
    }
  };

  handleChangeInput = (name, value) => {
    const { state } = this;
    state[name] = value;
    this.setState(state);
  };

  confirmButton = () => {
    window.scrollTo(0, 0);
    this.setState({ isConfirm: true });
  };

  onKeyDownButtonConfirm = e => {
    if (iskeyDownEnter(e)) {
      this.confirmButton();
    }
  };

  backButton = () => {
    window.scrollTo(0, 0);
    this.setState({ isConfirm: false });
  };

  onKeyDownButtonBack = e => {
    if (iskeyDownEnter(e)) {
      this.backButton();
    }
  };

  submitButton = () => {
    const { dispatch } = this.props;
    const { bankName, branchName, accountType, accountNumber, accountName } = this.state;

    dispatch(
      salesActions.sendPayouts({
        bankName,
        branchName,
        accountType,
        accountNumber,
        accountName,
      }),
    );
    window.scrollTo(0, 0);
  };

  onKeyDownButtonSubmit = e => {
    if (iskeyDownEnter(e)) {
      this.submitButton();
    }
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

  showSales = () => {
    const { before, deposit, pending, paid } = this.props;
    return (
      <SalesAmountItemWrap>
        <SalesAmountItem title="お振込可能な売上" amount={deposit} bold colorPrimary />
        {before > 0 && <SalesAmountItem title="保管開始前の売上" amount={before} />}
        {pending > 0 && <SalesAmountItem title="お振込対応中の売上" amount={pending} />}
        {paid > 0 && <SalesAmountItem title="お振込済みの売上" amount={paid} />}
        <CautionWrapper>
          <CautionText>※保管開始済みの取引の売上のみ振込申請ができます。</CautionText>
        </CautionWrapper>
      </SalesAmountItemWrap>
    );
  };

  leftContent = () => {
    const { deposit } = this.props;
    const { bankName, branchName, accountType, accountNumber, accountName } = this.state;

    if (deposit < PRICE_MIN_DEPOSIT) {
      return (
        <Fragment>
          {this.showSales()}
          <MsgWrap>
            振込申請は売上3,000円以上から出来ます。
            <br />
            スペースを活用しましょう！
          </MsgWrap>
          <ButtonWrap>
            <Button
              fill={1}
              primary
              fontbold
              center
              onClick={this.historyToSpaceInfo}
              onKeyDown={this.onKeyDownButtonSpaceInfo}
            >
              スペースを登録する
            </Button>
          </ButtonWrap>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {this.showSales()}
        <SalesAmountMsgWrap>振込先口座を指定してください。</SalesAmountMsgWrap>
        <InputText>
          <InputForm
            label="金融機関"
            placeholder="○○銀行"
            onChange={e => this.handleChangeInput('bankName', e.target.value)}
            value={bankName}
          />
        </InputText>
        <InputText>
          <InputForm
            label="支店名"
            placeholder="○○支店"
            onChange={e => this.handleChangeInput('branchName', e.target.value)}
            value={branchName}
          />
        </InputText>
        <InputText>
          <SelectForm
            label="預金種目"
            options={selectDepositType('選択してください')}
            onChange={e => this.handleChangeInput('accountType', e.target.value)}
            value={accountType}
          />
        </InputText>
        <InputText>
          <InputForm
            label="口座番号"
            placeholder="1234567"
            onChange={e => this.handleChangeInput('accountNumber', e.target.value)}
            value={accountNumber}
          />
        </InputText>
        <InputText>
          <InputForm
            label="口座名義"
            placeholder="ヤマダ タロウ"
            onChange={e => this.handleChangeInput('accountName', e.target.value)}
            value={accountName}
          />
        </InputText>
        <SubmitButton>
          <Button
            fill={1}
            primary
            fontbold
            onClick={this.confirmButton}
            onKeyDown={this.onKeyDownButtonConfirm}
            disabled={!this.validate()}
          >
            確認画面へ
          </Button>
        </SubmitButton>
      </Fragment>
    );
  };

  leftContentConfirm = () => {
    const { bankName, branchName, accountType, accountNumber, accountName } = this.state;
    const { deposit } = this.props;

    const serviceFee = Math.round(deposit * 0.2);
    const payout = deposit - serviceFee;
    const payoutFee = payout < 10000 ? 260 : 0;

    return (
      <Fragment>
        <ConfirmSalesWrap>
          <Confirm label="金融機関" value={`${bankName} ${branchName}`} />
        </ConfirmSalesWrap>
        <ConfirmSalesWrap singleline>
          <Confirm label="預金種目" value={accountType === '1' ? '普通' : '当座'} />
        </ConfirmSalesWrap>
        <ConfirmSalesWrap singleline>
          <Confirm label="口座番号" value={accountNumber} />
        </ConfirmSalesWrap>
        <ConfirmSalesWrap clearfix bottom>
          <Confirm label="口座名義" value={accountName} />
        </ConfirmSalesWrap>
        <SalesAmountItemWrap confirm>
          <SalesAmountItem title="お振込可能な売上" amount={deposit} />
        </SalesAmountItemWrap>
        <SalesAmountItemWrap confirm>
          <SalesAmountItem title="サービス利用料" amount={serviceFee} />
        </SalesAmountItemWrap>
        <SalesAmountItemWrap confirm>
          <SalesAmountItem title="振込手数料" amount={payoutFee} />
        </SalesAmountItemWrap>
        <SalesAmountItemWrap confirm>
          <SalesAmountItem title="お振込金額" amount={payout - payoutFee} bold colorPrimary />
        </SalesAmountItemWrap>
        <CautionWrapper>
          <CautionText>
            ※振込金額が10,000円以上の場合、振込手数料が無料になります。10,000円未満の場合、260円振込手数料が売上から引かれます。ご了承ください。
          </CautionText>
          <CautionText>※お振込完了まで5日ほどかかります。予めご了承ください。</CautionText>
          <CautionText>
            ※銀行口座の情報が間違っている場合、振込ができません。振込手数料を売上から引かせていただきます。入力内容をしっかりご確認ください。
          </CautionText>
        </CautionWrapper>
        <EntryButtons
          rerative
          enabled
          backButton={{
            text: '戻る',
            onClick: this.backButton,
            onKeyDown: this.onKeyDownButtonBack,
          }}
          enabledButton={{
            text: '申請する',
            onClick: this.submitButton,
            onKeyDown: this.onKeyDownButtonSubmit,
          }}
        />
      </Fragment>
    );
  };

  leftContentComplete = () => {
    return (
      <Fragment>
        <MsgWrap>
          振込申請が完了しました。
          <br />
          振込完了はメールにてお知らせいたします。しばらくお待ちください。
        </MsgWrap>
        <ButtonWrap>
          <Button
            primary
            fontbold
            center
            onClick={this.historyToHome}
            onKeyDown={this.onKeyDownButtonHome}
          >
            ホームへ戻る
          </Button>
        </ButtonWrap>
      </Fragment>
    );
  };

  render() {
    const { isLoading, isSend } = this.props;
    const { isConfirm } = this.state;

    let headline = '売上・振込申請';
    let leftContent = this.leftContent();

    if (isConfirm) {
      headline = '振込申請確認';
      leftContent = this.leftContentConfirm();
    }

    if (isSend) {
      headline = '振込申請完了';
      leftContent = this.leftContentComplete();
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={headline}
        leftContent={isLoading ? <LoadingPage /> : leftContent}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  before: state.sales.before,
  deposit: state.sales.deposit,
  pending: state.sales.pending,
  paid: state.sales.paid,
  isLoading: state.sales.isLoading,
  user: state.auth.user,
  isSend: state.sales.isSend,
});

export default authRequired(connect(mapStateToProps)(SalesContainer));
