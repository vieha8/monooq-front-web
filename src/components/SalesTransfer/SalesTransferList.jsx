import React from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import AmountRow from './AmountRow';

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

const ListContainer = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const ButtonWrapper = styled.div`
  margin: ${Dimens.medium2}px auto 0;
  max-width: 300px;
`;

const Text = styled.span`
  display: table-cell;
  font-size: ${FontSizes.small};
  color: ${Colors.black};
`;

export default props => (
  <ContentContainer>
    <Content>
      <Header>売上の詳細</Header>
      <Caption>売上は手数料を引いた金額が表示されています。</Caption>
      <ListContainer>
        <AmountRow label1="現在の売上" amount={props.currentSales} />
        <AmountRow label1="取引が終了していない売上" amount={props.receivableSales} />
      </ListContainer>
      <ButtonWrapper>
        <Button
          bgColor={Colors.white}
          fontColor={Colors.brandPrimary}
          borderColor={Colors.brandPrimary}
          fluid
        >
          振込申請をする
        </Button>
      </ButtonWrapper>
      <Caption align="center">※振込申請は3000円以上から可能です</Caption>
      <Header margin>振込履歴</Header>
      <ListContainer>
        {props.transfers.length > 0
          ? (
            props.transfers.map((transfer, i) => (
              <AmountRow
                key={`transfers_row_${i}`}
                label1={transfer.transferAt}
                label2={transfer.status}
                amount={transfer.amount}
              />
            ))
          ) : (
            <Text>振込履歴はありません。</Text>
          )
        }
      </ListContainer>
      <ButtonWrapper>
        <Button
          bgColor={Colors.white}
          fontColor={Colors.darkGray1}
          borderColor={Colors.darkGray1}
          fluid
        >
          口座情報を変更する
        </Button>
      </ButtonWrapper>
    </Content>
  </ContentContainer>
);
