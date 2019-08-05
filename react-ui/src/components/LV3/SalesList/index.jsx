// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';

const Row = styled.div`
  width: 100%;
  padding: 24px 8px;
  border-top: 1px solid ${Colors.borderGray};
  &:last-child {
    border-bottom: 1px solid ${Colors.borderGray};
  }
`;

const Table = styled.div`
  display: table;
  width: 100%;
`;

const Cell = styled.div`
  display: table-cell;
  ${props =>
    props.width &&
    `
    width: ${props.width};
  `} ${props =>
    props.right &&
    `
    text-align: right;
    margin-left: auto;
  `};
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
  text-align: center;
  span {
    margin-top: ${Dimens.small}px;
  }
`;

type PropTypes = {
  confirmedSales: string,
  provisionalSales: string,
  onClickTransfer: Function,
};

export default ({ confirmedSales, provisionalSales, onClickTransfer }: PropTypes) => (
  <div>
    <Row>
      <Table>
        <Cell>
          <InlineText.Base fontSize={14}>現在の売上</InlineText.Base>
        </Cell>
        <Cell right>
          <InlineText.Bold fontSize={14}>{`${confirmedSales}円`}</InlineText.Bold>
        </Cell>
      </Table>
    </Row>
    <Row>
      <Table>
        <Cell>
          <InlineText.Base fontSize={14}>取引が終了していない売上</InlineText.Base>
        </Cell>
        <Cell right>
          <InlineText.Bold fontSize={14}>{`${provisionalSales}円`}</InlineText.Bold>
        </Cell>
      </Table>
    </Row>
    <ButtonWrapper>
      <Button secondary center onClick={onClickTransfer}>
        振込申請をする
      </Button>
      <InlineText.EmphasisSmall singleLine>
        ※振込申請は3000円以上から可能です
      </InlineText.EmphasisSmall>
    </ButtonWrapper>
  </div>
);
