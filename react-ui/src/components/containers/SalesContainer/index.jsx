// @flow

import React, { Component, Fragment } from 'react';
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
import { selectDepositType } from 'helpers/deposittypes';

import { connect } from 'react-redux';
import authRequired from '../AuthRequired';

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
      isSend: false,
      isConfirm: false,
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

  confirmButton = () => {
    window.scrollTo(0, 0);
    this.setState({ isConfirm: true });
  };

  backButton = () => {
    window.scrollTo(0, 0);
    this.setState({ isConfirm: false });
  };

  submitButton = () => {
    const { user, dispatch, payout } = this.props;
    const { bankName, branchName, accountType, accountNumber, accountName } = this.state;
    const userId = user.ID;

    dispatch(
      salesActions.sendPayouts({
        userId,
        bankName,
        branchName,
        accountType,
        accountNumber,
        accountName,
        payouts: payout,
      }),
    );
    window.scrollTo(0, 0);
    this.setState({ isSend: true, isConfirm: false });
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
    const { sales, deposit, history } = this.props;

    if (sales < 3000) {
      return (
        <Fragment>
          <SalesAmountItemWrap>
            <SalesAmountItem title="振込可能な売上" amount={sales} bold />
            <SalesAmountItem title="保管開始前の売上" amount={deposit} />
            <CautionWrapper>
              <CautionText>※保管開始済みの取引の売上のみ振込申請ができます。</CautionText>
            </CautionWrapper>
          </SalesAmountItemWrap>
          <MsgWrap>
            振込申請は売上金3,000円以上から可能です。
            <br />
            モノオクでスペースを登録してスペースを活用しましょう！
          </MsgWrap>
          <ButtonWrap>
            <Button
              fill={1}
              primary
              fontbold
              center
              onClick={() => history.push(Path.createSpaceInfo())}
            >
              スペースを登録する
            </Button>
          </ButtonWrap>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <SalesAmountItemWrap>
          <SalesAmountItem title="振込可能な売上" amount={sales} bold />
          <SalesAmountItem title="保管開始前の売上" amount={deposit} />
          <CautionWrapper>
            <CautionText>※保管開始済みの取引の売上のみ振込申請ができます。</CautionText>
          </CautionWrapper>
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
          <Button
            fill={1}
            primary
            fontbold
            onClick={this.confirmButton}
            disabled={!this.validate()}
          >
            確認画面へ
          </Button>
        </SubmitButton>
      </Fragment>
    );
  };

  leftContentConfirm = () => (
    <Fragment>
      <ConfirmSalesWrap>
        <Confirm label="金融機関" value={`${this.state.bankName} ${this.state.branchName}`} />
      </ConfirmSalesWrap>
      <ConfirmSalesWrap singleline>
        <Confirm label="預金種目" value={this.state.accountType === '1' ? '普通' : '当座'} />
      </ConfirmSalesWrap>
      <ConfirmSalesWrap singleline>
        <Confirm label="口座番号" value={this.state.accountNumber} />
      </ConfirmSalesWrap>
      <ConfirmSalesWrap clearfix bottom>
        <Confirm label="口座名義" value={this.state.accountName} />
      </ConfirmSalesWrap>
      <SalesAmountItemWrap confirm>
        <SalesAmountItem title="現在の売上金" amount={this.props.sales} />
      </SalesAmountItemWrap>
      <SalesAmountItemWrap confirm>
        <SalesAmountItem title="サービス利用料" amount={this.props.sales - this.props.payout} />
      </SalesAmountItemWrap>
      <SalesAmountItemWrap confirm>
        <SalesAmountItem title="振込手数料" amount={this.props.payout < 10000 ? 260 : 0} />
      </SalesAmountItemWrap>
      <SalesAmountItemWrap confirm>
        <SalesAmountItem
          title="振込金額"
          amount={this.props.payout < 10000 ? this.props.payout - 260 : this.props.payout}
          bold
          colorPrimary
        />
      </SalesAmountItemWrap>
      <CautionWrapper>
        <CautionText>
          ※振込金額が10,000円以上の場合、振込手数料が無料になります。10,000円未満の場合、260円振込手数料が売上から引かれます。ご了承ください。
        </CautionText>
        <CautionText>※振込完了まで5日から14日ほどかかります。ご了承ください。</CautionText>
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
        }}
        enabledButton={{
          text: '申請する',
          onClick: this.submitButton,
        }}
      />
    </Fragment>
  );

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
          <Button primary fontbold center onClick={() => history.push(Path.home())}>
            ホームへ戻る
          </Button>
        </ButtonWrap>
      </Fragment>
    );
  };

  render() {
    const { isLoading } = this.props;
    const { isConfirm, isSend } = this.state;

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
  sales: state.sales.sales,
  payout: state.sales.payout,
  deposit: state.sales.deposit,
  isLoading: state.sales.isLoading,
  user: state.auth.user,
});

export default authRequired(connect(mapStateToProps)(SalesContainer));
