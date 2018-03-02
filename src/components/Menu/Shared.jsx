import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

export const Container = styled.div`
  width: 328px;
  ${media.phone`
    display: none;
  `};
`;

export const Menu = styled.ul`
  width: 100%;
`;

export const MenuItem = styled.li`
  display: table;
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  padding: 20px ${Dimens.medium}px;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
  }
  &:not(:last-child) {
    border-bottom: none;
  }
`;

export const MenuText = styled.span`
  display: table-cell;
  vertical-align: middle;
  color: ${Colors.darkGray2};
  font-size: ${FontSizes.small}px;
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
