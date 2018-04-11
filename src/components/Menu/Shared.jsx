import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

export const Container = styled.div`
  width: 328px;
  float: left;
  ${media.tablet`
    display: none;
    ${props => props.showMobile && `
      display: block;
      float: none;
      width: 100%;
    `}
  `}
`;

export const Menu = styled.ul`
  width: 100%;
`;

export const MenuItem = styled.li`
  display: table;
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
  }
  &:not(:last-child) {
    border-bottom: none;
  }
`;

export const MenuLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: 20px ${Dimens.medium2}px;
`;

export const MenuText = styled.span`
  display: table-cell;
  vertical-align: middle;
  color: ${Colors.darkGray2};
  font-size: ${FontSizes.small}px;
  width: 92%;
  text-align: left;
`;

const NoticeCountCircle = styled.span`
  display: table-cell;
  font-size: 20px;
`;

export const NoticeCount = props => (
  (props.count > 0 ?
    <NoticeCountCircle className="fa-layers fa-fw">
      <i className="fas fa-circle" style={{ color: Colors.brandPrimary }} />
      <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-9">
        {props.count}
      </span>
    </NoticeCountCircle>
    : null)
);
