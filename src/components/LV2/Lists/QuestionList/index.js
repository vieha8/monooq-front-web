import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Text from 'components/LV1/Texts/TextStatic';

const Wrap = styled.div`
  margin-bottom: ${Dimens.medium4_50}px;
`;

const Label = styled.div`
  font-size: ${FontSizes.medium2}px;
  line-height: ${FontSizes.medium2 * 1.5}px;
  margin-bottom: ${Dimens.medium_20}px;
`;

const ListWrap = styled.ul`
  margin-bottom: ${Dimens.medium2}px;
  list-style: disc;
  list-style-position: inside;
`;

const List = styled(Text)`
  ${props =>
    props.isNoDisc &&
    `
      margin: ${Dimens.small_10}px auto;
      list-style-type: none;
    `};
`;

const Title = styled(Label)`
  margin-bottom: ${Dimens.small_10}px;
  ${media.phone`
    font-size: 6vw;
    line-height: ${6 * 1.5}vw;
    margin-bottom: ${Dimens.xxsmall_5}px;
  `};
`;

export default ({ title, text, list }) => (
  <Wrap>
    {title && <Title>{title}</Title>}
    {list && (
      <ListWrap>
        {list.map((item, i) => (
          <List as="li" key={i.toString()} isNoDisc={item.isNoDisc}>
            {item.text}
            {item.textCustom}
          </List>
        ))}
      </ListWrap>
    )}
    {text && <Text>{text}</Text>}
  </Wrap>
);
