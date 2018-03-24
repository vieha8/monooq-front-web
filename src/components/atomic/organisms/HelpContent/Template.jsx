// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H2 } from 'components/atomic/atoms/Headline';
import HelpList from 'components/atomic/molecules/Help/ListItem';
import TextButton from 'components/atomic/atoms/TextButton';

const LinkWrapper = styled.div`
  margin-top: 32px;
`;

type QA = {
  title: string,
  content: string,
  circleDown?: boolean,
  circleRight?: boolean,
}

type PropTypes = {
  qa: Array<QA>,
  headline: string,
  onClickList: Function,
  openFlagList: Array<boolean>,
  onClickBack: Function,
}

export default (props: PropTypes) => (
  <Fragment>
    <H2>{props.headline}</H2>
    {props.qa.map((qa: QA, i) => (
      <HelpList
        key={`help_list_item_${i}`}
        title={qa.title}
        content={qa.content}
        onClick={() => props.onClickList(i)}
        open={props.openFlagList[i]}
        circleDown={qa.circleDown}
        circleRight={qa.circleRight}
      />
    ))}
    <LinkWrapper>
      <TextButton
        onClick={props.onClickBack}
      >
        前のページへ戻る
      </TextButton>
    </LinkWrapper>
  </Fragment>
);
