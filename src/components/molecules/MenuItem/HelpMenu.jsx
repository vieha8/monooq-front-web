// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import InlineText from 'components/atoms/InlineText';
import { AngleRight, AngleDown } from 'components/atoms/ActionIcon';
import MenuItem from 'components/atoms/Menu/Item';

const MenuLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: 12px 16px;
  ${props => props.fillColor && `
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

export default (props: PropTypes) => (
  <MenuItem show={props.show}>
    <MenuLink onClick={props.onClick} href={props.href} fillColor={props.fillColor}>
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
