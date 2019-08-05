// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Button';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ConfirmBtnModal from 'components/LV2/ConfirmBtnModal';

const EntryButtonsWrap = styled.div`
  ${media.phone`
    display: block;
    width: 100%;
    position: ${props => props.relative || 'absolute'};
    left: 0px;
    bottom: 0px;
    text-align: center;
    padding: 0 15px 15px;
    ${props =>
      props.relative &&
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
  relative?: boolean,
  remove?: boolean,
  backButton: {
    text: string,
    modalTitle?: string,
    modalText?: string,
    onClick: Function,
    onKeyDown?: Function,
  },
  loading?: boolean,
  enabled: boolean,
  enabledButton: {
    text: string,
    disabled?: boolean,
    onClick: Function,
    onKeyDown?: Function,
  },
  disabledButton: {
    text: string,
  },
};

export default ({
  relative,
  remove,
  backButton,
  loading,
  enabled,
  enabledButton,
  disabledButton,
}: PropTypes) => (
  <EntryButtonsWrap relative={relative}>
    <Container>
      <Cell align="left">
        <Wrapper backButton>
          {remove ? (
            <ConfirmBtnModal
              btnText={backButton.text}
              modalTitle={backButton.modalTitle}
              modalText={backButton.modalText}
              onClickRemove={backButton.onClick}
            />
          ) : (
            <Button
              secondary
              borderbold
              fontbold
              fill={1}
              loading={loading}
              onClick={backButton.onClick}
              onKeyDown={backButton.onKeyDown}
            >
              {backButton.text}
            </Button>
          )}
        </Wrapper>
      </Cell>
      <Cell align="right">
        <Wrapper>
          {enabled ? (
            <Button
              primary
              borderbold
              fontbold
              fill={1}
              loading={loading}
              onClick={enabledButton.onClick}
              disabled={enabledButton.disabled}
              onKeyDown={enabledButton.onKeyDown}
            >
              {enabledButton.text}
            </Button>
          ) : (
            <Button primary borderbold fontbold fill={1} loading={loading} disabled>
              {disabledButton.text}
            </Button>
          )}
        </Wrapper>
      </Cell>
    </Container>
  </EntryButtonsWrap>
);
