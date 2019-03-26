// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/LV1/Button';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ConfirmBtnModal from 'components/atomic/LV2/ConfirmBtnModal';

const EntryButtonsWrap = styled.div`
  ${media.phone`
    display: block;
    width: 100%;
    position: ${props => props.rerative || 'absolute'};
    left: 0px;
    bottom: 0px;
    text-align: center;
    padding: 0 15px 15px;
    ${props =>
      props.rerative &&
      `
      padding: 0;
    `};
  `};
`;

const Container = styled.div`
  display: table;
  width: 100%;
`;

const Cell = styled.div`
  display: table-cell;
  width: 50%;
  ${media.tablet`
    width: 100%;
    display: block;
  `};
  text-align: ${props => props.align};
  padding-right: ${Dimens.small2}px;
  &:not(:first-child) {
    padding-left: ${Dimens.small2}px;
    padding-right: 0px;
    ${media.tablet`
      padding-left: 0px;
      padding-right: 0px;
      margin-top: ${Dimens.medium}px;
    `};
  }
  ${media.tablet`
    padding-left: 0px;
    padding-right: 0px;
  `};
`;

const Wrapper = styled.div`
  max-width: 320px;
  ${props =>
    props.backButton &&
    `
    margin: 0 0 0 auto;
  `};
  ${media.tablet`
    width: 100%;
    max-width: 100%;
    margin: auto;
  `};
`;

type PropTypes = {
  loading?: boolean,
  backButton: {
    text: string,
    onClick: Function,
  },
  disabledButton: {
    text: string,
  },
  enabledButton: {
    text: string,
    disabled?: boolean,
    onClick: Function,
  },
  enabled: boolean,
  onClickRemove?: Function,
};

export default (props: PropTypes) => (
  <EntryButtonsWrap rerative={props.rerative}>
    <Container>
      <Cell align="left">
        <Wrapper backButton>
          {props.remove ? (
            <ConfirmBtnModal
              btnText={props.backButton.text}
              modalTitle={props.backButton.modalTitle}
              modalText={props.backButton.modalText}
              onClickRemove={props.backButton.onClick}
            />
          ) : (
            <Button
              secondary
              borderbold
              fontbold
              fill={1}
              loading={props.loading}
              onClick={props.backButton.onClick}
            >
              {props.backButton.text}
            </Button>
          )}
        </Wrapper>
      </Cell>
      <Cell align="right">
        <Wrapper>
          {props.enabled ? (
            <Button
              primary
              borderbold
              fontbold
              fill={1}
              loading={props.loading}
              onClick={props.enabledButton.onClick}
              disabled={props.enabledButton.disabled}
            >
              {props.enabledButton.text}
            </Button>
          ) : (
            <Button primary borderbold fontbold fill={1} loading={props.loading} disabled>
              {props.disabledButton.text}
            </Button>
          )}
        </Wrapper>
      </Cell>
    </Container>
  </EntryButtonsWrap>
);
