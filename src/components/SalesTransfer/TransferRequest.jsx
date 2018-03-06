import React, { Fragment } from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { RequestRow } from './AmountRow';

const Content = styled.div`
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const Header = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: 51px;
  letter-spacing: -0.5px;
  color: ${Colors.black};
  ${props => props.margin && `
    margin-top: ${Dimens.large}px;
  `}
`;

const Caption = styled.div`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  text-align: ${props => props.align || 'left'};
  color: ${Colors.lightGray1};
  margin-top: ${Dimens.medium}px;
`;

const Row = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const ButtonWrapper = styled.div`
  ${props => (props.noMargin ? `
    margin: 0 auto;
  ` : `
    margin: ${Dimens.medium2}px auto 0;
  `)}
  max-width: 300px;
`;

const Label = styled.span`
  display: block;
  font-size: ${FontSizes.small};
  color: ${Colors.black};
`;

const ConfirmContentText = Label.extend`
  font-size: ${FontSizes.xsmall};
  margin-top: ${Dimens.medium}px;
`;

export default props => (
  <ContentContainer>
    <Content>
      <Header>{props.requested ? '売上の詳細' : '口座情報の確認'}</Header>
      <Caption>売上は手数料を引いた金額が表示されます。</Caption>
      <Row>
        <RequestRow
          label1={props.requested ? '振込申請金額' : '現在の売上'}
          amount={props.salesAmount}
          receivableAmount={props.requested ? 0 : props.receivableAmount}
        />
      </Row>
      {!props.requested && (
        <Fragment>
          <Header margin>口座情報の確認</Header>
          <Row>
            <Label>銀行名</Label>
            <ConfirmContentText>{props.bankName}</ConfirmContentText>
          </Row>
          <Row>
            <Label>支店名</Label>
            <ConfirmContentText>{props.branchName}</ConfirmContentText>
          </Row>
          <Row>
            <Label>口座種別</Label>
            <ConfirmContentText>{props.accountType}</ConfirmContentText>
          </Row>
          <Row>
            <Label>口座番号</Label>
            <ConfirmContentText>{props.accountNumber}</ConfirmContentText>
          </Row>
          <Row>
            <Label>口座名義（セイ）</Label>
            <ConfirmContentText>{props.accountLastName}</ConfirmContentText>
          </Row>
          <Row>
            <Label>口座名義（メイ）</Label>
            <ConfirmContentText>{props.accountFirstName}</ConfirmContentText>
          </Row>
        </Fragment>
      )}
      <ButtonWrapper>
        <Button
          bgColor={Colors.white}
          fontColor={Colors.darkGray1}
          borderColor={Colors.darkGray1}
          fluid
          onClick={props.requested ? props.onClickToSalesTransferList : props.onClickTransferRequest}
        >
          {props.requested ? '売上・振込申請画面へ戻る' : '振込申請をする'}
        </Button>
      </ButtonWrapper>
      {props.requested && (
        <Fragment>
          <Caption align="center">口座情報に誤りがある場合、スムーズな入金ができませんのでご注意ください。</Caption>
          <Caption align="center">その際はモノオクからご連絡する場合がございます。</Caption>
        </Fragment>
      )}
    </Content>
  </ContentContainer>
);
