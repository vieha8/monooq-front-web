// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import InputForm from 'components/LV2/Forms/InputForm';

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin: auto;
  ${media.phone`
    max-width: 327px;
  `};
`;

const Wrap = styled.div`
  width: 80%;
  max-width: 699px;
  ${props =>
    props.button &&
    `
    width: 20%;
    max-width: 109px;
    margin-left: ${Dimens.small_10}px;
  `};
  ${media.phone`
    width: 100%;
    ${props =>
      props.button &&
      `
      width: 100%;
      max-width: 78px;
    `};
  `};
`;

type PropTypes = {
  placeholder: string,
  onChange: Function,
  onKeyDown: Function,
  borderColor?: string,
  searchDisabled: boolean,
  onClickSearchButton: Function,
};

export default ({
  placeholder,
  onChange,
  onKeyDown,
  borderColor,
  searchDisabled,
  onClickSearchButton,
}: PropTypes) => (
  <SearchWrapper>
    <Wrap>
      <InputForm
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        borderColor={borderColor}
        margintop="0"
      />
    </Wrap>
    <Wrap button>
      <Button
        primary
        fill={1}
        fontbold
        disabled={searchDisabled}
        onClick={searchDisabled ? null : onClickSearchButton}
        onKeyDown={onKeyDown}
      >
        検索
      </Button>
    </Wrap>
  </SearchWrapper>
);
