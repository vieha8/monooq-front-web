import React from 'react';
import styled from 'styled-components';
import TextLink from 'components/LV1/Texts/TextLink';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Wrapper = styled.div`
  width: 42%;
  min-width: 130px;
  ${media.tablet`
    width: 50%;
  `};
`;

const WrapCaption = styled.div`
  font-weight: bold;
  color: ${Colors.white};
`;

const WrapList = styled.ul``;

const Item = styled.li`
  margin-top: ${Dimens.small2}px;
`;

const FooterLink = props => (
  <TextLink {...props} fontSize={12} line-height={16} color={Colors.white}>
    {props.children}
  </TextLink>
);

export default ({ list }) => (
  <Wrapper>
    <WrapList>
      {list.map((item, i) => (
        <Item key={i.toString()}>
          {item.link ? (
            <FooterLink to={item.link}>{item.name}</FooterLink>
          ) : item.href ? (
            <FooterLink href={item.href} target="_blank">
              {item.name}
            </FooterLink>
          ) : (
            <WrapCaption>{item.name}</WrapCaption>
          )}
        </Item>
      ))}
    </WrapList>
  </Wrapper>
);
