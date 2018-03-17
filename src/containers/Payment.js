import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Colors } from 'variables';
import { media } from '../helpers/style/media-query';
import { uiActions } from '../redux/modules/ui';
import { requestActions } from '../redux/modules/request';

const PaymentPage = styled.div``;

const PaymentContainer = styled.div`
  max-width: 1048px;
  margin: 0 auto;
`;

const PageTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  letter-spacing: -0.5px;
  margin-bottom: 52px;
  ${media.phone`
    padding: 0 20px;
    font-size: 22px;
    line-height: 33px;
    margin-bottom: 20px;
  `};
`;

const PageTitleSub = styled.div`
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 30px;
  ${props =>
    props.isMobile
      ? `
      display: none;
    `
      : ''};
  ${media.phone`
    padding: 0 20px;
    font-size: 20px;
    line-height: 29px;
    margin-bottom: 20px;
    ${props =>
      props.isMobile
        ? `
        display: block;
        margin-top: 40px;
      `
        : ''};
  `};
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
`;

const DefaultHr = styled.hr`
  border: 0;
  height: 1px;
  background-color: #dbdbdb;
`;

const MobileHr = DefaultHr.extend`
  margin-top: 22px;
  margin-bottom: 37px;
  display: none;
  ${media.phone`
    display: block;
  `};
  ${props =>
    props.isLong
      ? `
      margin-top: 0;
      margin-bottom: 17px;
    `
      : ''};
`;

const PaymentFormContainer = styled.div`
  width: 688px;
  ${media.phone`
    width: 100%;
  `};
`;

const PaymentSideContainer = styled.div`
  width: 327px;
  ${media.phone`
    padding: 0 20px;
    width: 100%;
  `};
`;

const InputPaymentInfo = props => {
  const InfoLabel = styled.label`
    font-size: 16px;
    display: block;
    height: 24px;
    line-height: 24px;
    margin-bottom: 17px;
  `;
  const InfoInput = styled.input`
    height: 50px;
    width: 417px;
    border: 1px solid #bcbcbc;
    border-radius: 2px;
    background-color: #fafafa;
    padding: 15px 14px;
    ${props =>
      props.isSmall
        ? `
        height: 40px;
        width: 100px;
      `
        : ''};
    ${media.phone`
      width: 100%;
      ${props =>
        props.isSmall
          ? `
          height: 40px;
          width: 100px;
        `
          : ''};
    `};
  `;
  return (
    <div className={props.className}>
      <InfoLabel>{props.label}</InfoLabel>
      <InfoInput
        isSmall={props.isSmall}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
};

const InputPaymentTermInfo = props => {
  const Label = styled.div`
    margin-bottom: 17px;
  `;
  const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    line-height: 40px;
  `;
  const StyledSelectContainer = styled.div`
    position: relative;
    display: inline-block;
    background: #fafafa;
    margin-right: 10px;
    ::before {
      content: '';
      position: absolute;
      z-index: 0;
      top: 0;
      right: 0;
      background: inherit;
      height: 100%;
      width: 40px;
    }
    ::after {
      content: '';
      position: absolute;
      z-index: 0;
      top: 0;
      bottom: 0;
      margin: auto 0;
      right: 9px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 6px 0 6px;
      border-color: #bcbcbc transparent transparent transparent;
    }
  `;
  const StyledSelect = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0;
    margin: 0;
    height: 40px;
    width: 100px;
    color: #bcbcbc;
    background: transparent;
    position: relative;
    z-index: 1;
    padding: 10px 40px 10px 14px;
    border: 1px solid #bcbcbc;
    border-radius: 2px;
    &::-ms-expand {
      display: none;
    }
  `;

  const Unit = styled.span`
    margin-right: 10px;
  `;

  return (
    <div className={props.className}>
      <Label>有効期限</Label>
      <Wrapper>
        <StyledSelectContainer>
          <StyledSelect
            name="expiryMonth"
            value={props.ui.card.expiryMonth}
            onChange={props.handleChange}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </StyledSelect>
        </StyledSelectContainer>
        <Unit>月 /</Unit>

        <StyledSelectContainer>
          <StyledSelect
            name="expiryYear"
            value={props.ui.card.expiryYear}
            onChange={props.handleChange}
          >
            {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map(item => {
              return (
                <option key={item} value={`20${item}`}>
                  20{item}
                </option>
              );
            })}
          </StyledSelect>
        </StyledSelectContainer>
        <Unit>年</Unit>
      </Wrapper>
    </div>
  );
};

const StyledInputPaymentTermInfo = styled(InputPaymentTermInfo)`
  color: #333333;
  margin-bottom: 30px;
  ${media.phone`
    padding: 0 20px;
    width: 100%;
  `};
`;

const StyledInputPaymentInfo = styled(InputPaymentInfo)`
  margin-bottom: 40px;
  ${media.phone`
    padding: 0 20px;
    width: 100%;
  `};
`;

const PaymentNotice = styled.div`
  color: #ba4246;
  font-size: 11px;
  line-height: 16px;
  margin-bottom: 30px;
`;

const PaymentAnchor = props => {
  const Anchor = styled.a`
    color: #006494;
    font-size: 16px;
    line-height: 24px;
  `;
  return (
    <div className={props.className}>
      <Anchor href={props.href}>{props.children}</Anchor>
    </div>
  );
};

const StyledPaymentAnchor = styled(PaymentAnchor)`
  width: 100%;
  margin-bottom: 40px;
  ${props =>
    props.isRight
      ? `
      text-align: right;
    `
      : ''};
`;

const PaymentButton = styled.div`
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  padding: 18px 0;
  margin-bottom: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  color: ${Colors.white};
  background: ${Colors.brandPrimary};
  :hover {
    background: ${Colors.brandTerciary};
  }
  :active {
    background: ${Colors.brandSecondary};
  }
`;

const Information = props => {
  const Title = styled.div`
    font-size: 18px;
    line-height: 32px;
    margin-bottom: 15px;
  `;
  const Wrapper = styled.div`
    display: flex;
  `;
  const Image = styled.img`
    width: 104px;
    height: 79px;
    object-fit: cover;
    margin-right: 20px;
  `;

  const Area = styled.div`
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 5px;
    color: #e85258;
  `;

  const Description = styled.div`
    font-size: 12px;
    line-height: 18px;
  `;

  return (
    <div className={props.className}>
      <Title>ホストは YUKI HASHIDA さん</Title>
      <Wrapper>
        <Image src="https://picsum.photos/150?image=42" />
        <div>
          <Area>東京都 港区 六本木</Area>
          <Description>
            東京タワーに近くて便利！大きい荷物も何人分でもOK何人分で荷物も何人分でもOK何人分で…
          </Description>
        </div>
      </Wrapper>
    </div>
  );
};

const EstimateInfo = props => {
  const Label = styled.div`
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 2px;
  `;

  const Content = styled.div`
    font-size: 16px;
    line-height: 32px;
    margin-bottom: 10px;
  `;

  const EstimateInfoHr = DefaultHr.extend`
    margin-bottom: 15px;
    margin-top: 0;
  `;

  const NoticeText = styled.div`
    color: #888787;
    font-size: 12px;
    line-height: 18px;
    ${media.phone`
      display: none;
    `};
  `;

  return (
    <div className={props.className}>
      <Label>日時</Label>
      <Content>2018/10/01から2018/10/31まで</Content>
      <EstimateInfoHr />
      <Label>期間</Label>
      <Content>30日間</Content>
      <EstimateInfoHr />
      <Label>お支払い金額</Label>
      <Content>5000円（サ・税込み）</Content>
      <NoticeText>
        ※引き取り日に連絡がつかないなどの延長があった際は、見積もり料金×25％×延長日数が加算されホストへ支払われます。
      </NoticeText>
    </div>
  );
};

const StyledEstimateInfo = styled(EstimateInfo)`
  padding: 30px;
  background: #f7f7f7;
  margin-top: 30px;
  ${media.phone`
    display: none;
  `};
`;

const StyledEstimateInfoMobile = styled(EstimateInfo)`
  display: none;
  padding: 0 20px;
  ${media.phone`
    display: block;
  `};
`;

const PaymentButtonWrapper = styled.div`
  ${media.phone`
    padding: 0 46px 137px 46px;
    width: 100%;
  `};
`;

class Payment extends Component {
  handleChange = ({ target }) => {
    const { card } = this.props.ui;
    Object.assign(card, { [target.name]: target.value });
    this.props.dispatch(uiActions.setUiState({ card }));
  };

  onClickPaymentButton = () => {
    const { request_id: requestId, message_room_id: roomId } = this.props.match.params;
    const { card } = this.props.ui;
    this.props.dispatch(requestActions.payment({ roomId, requestId, card }));
  };

  render() {
    return (
      <PaymentPage>
        <PaymentContainer>
          <PageTitle>支払いを行う</PageTitle>
          <FlexWrapper>
            <PaymentFormContainer>
              <PageTitleSub>クレジットカード情報の入力</PageTitleSub>
              <StyledInputPaymentInfo
                label="カード名義（半角ローマ字）"
                placeholder="TARO YAMADA"
                name="name"
                value={this.props.ui.card.name}
                handleChange={this.handleChange}
              />

              <StyledInputPaymentInfo
                label="クレジットカード番号"
                placeholder="1234 5678 9102 3456"
                type="number"
                name="number"
                value={this.props.ui.card.number}
                handleChange={this.handleChange}
              />

              <StyledInputPaymentTermInfo {...this.props} handleChange={this.handleChange} />

              <StyledInputPaymentInfo
                label="セキュリティコード"
                placeholder="3桁の数字"
                type="number"
                name="code"
                value={this.props.ui.card.code}
                handleChange={this.handleChange}
                isSmall
              />
              <PageTitleSub isMobile>お支払い内容の確認</PageTitleSub>
              <StyledEstimateInfoMobile />
              <MobileHr isLong />

              <PaymentNotice>
                ・決済後にキャンセルされた場合、預ける日の15日前までは全額ご返金させていただきます。<br />・決済後、預かり開始予定日の15日前からキャンセル手数料が発生します。<br />・「決済する」ボタンを押すことで、お客様は当サイトのプライバシーポリシーと利用規約に同意の上、モノオクサービスの予約を確定したことになります。
              </PaymentNotice>

              <StyledPaymentAnchor href="#" isRight>
                キャンセルについて
              </StyledPaymentAnchor>

              <PaymentButtonWrapper>
                <PaymentButton onClick={this.onClickPaymentButton}>決済する</PaymentButton>
              </PaymentButtonWrapper>
            </PaymentFormContainer>

            <PaymentSideContainer>
              <Information />
              <StyledEstimateInfo />
              <MobileHr />
            </PaymentSideContainer>
          </FlexWrapper>
        </PaymentContainer>
      </PaymentPage>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(Payment);
