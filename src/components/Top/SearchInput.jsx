import React from 'react';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';

const SearchWrapper = styled.div`
  width: 507px;
  position: relative;
  margin-top: 20px;
  margin-bottom: 40px;
  overflow: hidden;
  ${media.phone`
    width: 84vw;
  `};
`;

const SearchInput = styled.input`
  margin: 0;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px 60px 20px 20px;
  display: inline-block;
  vertical-align: middle;
  background: #fff;
  height: 60px;
  width: 507px;
  line-height: 20px;
  box-sizing: border-box;
  font-size: ${FontSizes.small}px;
  ${media.phone`
    width: 84vw;
  `};
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled(Button)`
  &&& {
    position: absolute;
    top: 0;
    right: -10px;
    height: 100%;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
    ${media.phone`
      right: -20px;
    `};
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  && {
    height: 32px;
    width: 32px;
    color: ${Colors.brandPrimary};
    ${props => props.disabled && `
      color: ${Colors.darkGray2};
    `}
  }
`;

export default props => (
  <SearchWrapper>
    <SearchInput
      placeholder={props.placeholder}
      value={props.locationText}
      onChange={props.onChange}
      innerRef={ref => props.onRef(ref)}
      margin="normal"
    />
    <SearchButton
      color="primary"
      mini
      component={Link}
      to={`${Path.search()}?location=${props.locationText}`}
      disabled={props.searchButtonDisabled}
    >
      <StyledSearchIcon disabled={props.searchButtonDisabled} />
    </SearchButton>
  </SearchWrapper>
);
