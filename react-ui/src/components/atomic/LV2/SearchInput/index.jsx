// @flow

import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const WIDTH = 500;
const HEIGHT = 60;

const SearchWrapper = styled.div`
  width: ${WIDTH}px;
  position: relative;
  overflow: hidden;
  ${media.phone`
    width: 84vw;
  `};
`;

const SearchInput = styled.input`
  margin: 0;
  border: 1px solid ${props => props.borderColor || Colors.borderGray};
  border-radius: 5px;
  padding: 20px 60px 20px 20px;
  display: inline-block;
  vertical-align: middle;
  background: #fff;
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
  line-height: ${Dimens.medium_20}px;
  box-sizing: border-box;
  font-size: ${FontSizes.small}px;
  &:focus {
    outline: none;
  }
  ${media.phone`
    width: 84vw;
  `};
`;

const SearchButton = styled.div`
  position: absolute;
  top: calc(50% - ${Dimens.small_11}px);
  font-size: ${FontSizes.medium1_22}px;
  right: ${Dimens.medium_20}px;
  width: auto;
  height: auto;
  text-align: center;
  padding: 0;
  color: ${props => props.color};
  cursor: pointer;
  &:hover {
    opacity: ${props => (props.disabled ? 1 : 0.6)};
  }
`;

type PropTypes = {
  placeholder: string,
  onChange: Function,
  onKeyDown: Function,
  onClickSearchButton: Function,
  searchDisabled: boolean,
  borderColor?: string,
};

export default (props: PropTypes) => (
  <SearchWrapper>
    <SearchInput
      placeholder={props.placeholder}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      margin="normal"
      borderColor={props.borderColor}
    />
    <SearchButton
      onClick={props.searchDisabled ? null : props.onClickSearchButton}
      disabled={props.searchDisabled}
      tabIndex={0}
      className="fal fa-search"
      color={props.searchDisabled ? Colors.lightGray1 : Colors.brandPrimary}
    />
  </SearchWrapper>
);
