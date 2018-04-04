// @flow

import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
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
  line-height: 20px;
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
  top: 0;
  right: 0px;
  height: 100%;
  line-height: ${HEIGHT}px;
  width: 60px;
  text-align: center;
  padding: 0;
  cursor: pointer;
  &:hover {
    opacity: ${props => (props.disabled ? 1 : 0.6)};
  }
`;

const IconWrapper = styled.span`
  color: ${props => props.color};
`;

const Icon = styled.i`
  font-size: 20px;
`;

type PropTypes = {
  placeholder: string,
  onChange: Function,
  onRef: Function,
  onClickSearchButton: Function,
  searchDisabled: boolean,
  borderColor?: string,
}

export default (props: PropTypes) => (
  <SearchWrapper>
    <SearchInput
      placeholder={props.placeholder}
      onChange={props.onChange}
      innerRef={ref => props.onRef(ref)}
      margin="normal"
      borderColor={props.borderColor}
    />
    <SearchButton
      onClick={props.searchDisabled ? null : props.onClickSearchButton}
      disabled={props.searchDisabled}
    >
      <IconWrapper
        color={props.searchDisabled ? Colors.lightGray1 : Colors.brandPrimary}
      >
        <Icon
          className="fal fa-search"
        />
      </IconWrapper>
    </SearchButton>
  </SearchWrapper>
);
