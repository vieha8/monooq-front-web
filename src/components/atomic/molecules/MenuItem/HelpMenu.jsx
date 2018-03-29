// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from 'variables';
import InlineText from 'components/atomic/atoms/InlineText';
import { AngleRight, AngleDown } from 'components/atomic/atoms/ActionIcon';
import MenuItem from 'components/atomic/atoms/Menu/Item';

const MenuLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: 12px 16px;
  ${props => props.fill && `
    background: ${Colors.lightGray1Bg};
  `}
`;

const MenuText = styled.span`
  display: table-cell;
  vertical-align: middle;
  width: 95vw;
`;

const IconWrapper = styled.span`
  display: table-cell;
  vertical-align: middle;
  width: 5vw;
`;

type PropTypes = {
  title: string,
  show?: boolean,
  angleRight?: boolean,
  angleDown?: boolean,
  fillColor?: boolean,
  open?: boolean,
  href?: string,
  onClick?: Function,
}

export default (props: PropTypes) => {
  return (
    <MenuItem show={props.show}>
      <MenuLink
        onClick={(e) => {
          if (props.onClick) {
            e.preventDefault();
            props.onClick && props.onClick();
          }
        }}
        to={props.href || ''}
        fill={props.fillColor ? 1 : 0}
      >
        <MenuText>
          <InlineText.Small>{props.title}</InlineText.Small>
        </MenuText>
        <IconWrapper>
          {props.angleDown && <AngleDown />}
          {props.angleRight && <AngleRight />}
        </IconWrapper>
      </MenuLink>
    </MenuItem>
  );
}
