// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Text from 'components/atomic/LV1/StaticText';

const QuestionListWrapper = styled.div`
  margin-bottom: ${Dimens.medium4_50}px;
`;

const Label = styled.div`
  font-size: ${FontSizes.medium2}px;
  line-height: ${FontSizes.medium2 * 1.5}px;
  margin-bottom: ${Dimens.medium_20}px;
`;

const ListWrapper = styled.div`
  margin-bottom: ${Dimens.medium2}px;
`;

const List = Text.withComponent('li');

const QuestionTitle = styled(Label)`
  ${media.phone`
    font-size: 6vw;
    line-height: ${6 * 1.5}vw;
    margin-bottom: ${Dimens.small_10}px;
  `};
`;

type PropTypes = {
  title?: string,
  list: Array<{
    text?: string,
    textCustom?: React.Element<*>,
  }>,
  text?: string,
};

export default ({ title, text, list }: PropTypes) => (
  <QuestionListWrapper>
    {title && <QuestionTitle>{title}</QuestionTitle>}
    {list && (
      <ListWrapper>
        {list.map((item, i) => (
          <List key={i.toString()}>
            {item.text}
            {item.textCustom}
          </List>
        ))}
      </ListWrapper>
    )}
    {text && <Text>{text}</Text>}
  </QuestionListWrapper>
);
