// @flow

import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';

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

const InputSearch = styled.input`
  width: 100%;
  margin: 0;
  border: 1px solid ${props => props.borderColor || Colors.borderGray};
  border-radius: 3px;
  padding: ${Dimens.small2_14}px ${Dimens.medium_20}px;
  display: inline-block;
  vertical-align: middle;
  background: #fff;
  width: 100%;
  height: 51px;
  line-height: ${Dimens.medium_20}px;
  box-sizing: border-box;
  font-size: ${FontSizes.medium_18}px;
  &:focus {
    outline: none;
  }
  ${media.phone`
    min-width: 238px;
    height: 48px;
    font-size: ${FontSizes.small}px;
    line-height: ${Dimens.small2_14}px;
  `};
  ${media.phoneSmall`
    min-width: auto;
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
    margin-left: 10px;
  `};
  ${media.phone`
    width: auto;
    ${props =>
      props.button &&
      `
      width: 100%;
      max-width: 78px;
    `};
  `};
`;

const ButtonWrap = styled.div`
  width: 100%;
  margin: auto;
  ${media.phone`
    max-width: 100%;
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
      <InputSearch
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        margin="normal"
        borderColor={borderColor}
      />
    </Wrap>
    <Wrap button>
      <ButtonWrap>
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
      </ButtonWrap>
    </Wrap>
  </SearchWrapper>
);
