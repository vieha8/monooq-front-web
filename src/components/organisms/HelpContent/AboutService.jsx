// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H2 } from 'components/atoms/Headline';
import HelpList from 'components/molecules/Help/ListItem';
import TextButton from 'components/atoms/TextButton';

const LinkWrapper = styled.div`
  margin-top: 32px;
`;

const QandA = [
  {
    title: '荷物を置く場所を探しています！モノオクの使い方を教えてください。',
    content: 'temptemptemptemptemptemptemptemp',
    circleDown: true,
  },
  {
    title: 'モノオクは日本全国で使えますか？',
    content: 'はい、モノオクは誰でもかんたんに余ったスペースを掲載できるサービスです。東京を中心に拠点数は全国へ広がっています。',
    circleDown: true,
  },
  {
    title: '荷物は１個しか置けないのですか？',
    content: 'temptemptemptemptemptemptemptemp',
    circleDown: true,
  },
  {
    title: 'スペース利用料金について教えてください。',
    content: 'temptemptemptemptemptemptemptemp',
    circleDown: true,
  },
  {
    title: 'なぜスペース利用料金がホストによって異なるのですか？',
    content: 'temptemptemptemptemptemptemptemp',
    circleDown: true,
  },
  {
    title: '物置きスペースのセキュリティが心配です。',
    content: 'temptemptemptemptemptemptemptemp',
    circleDown: true,
  },
  {
    title: '「相談する」とはなんですか？',
    content: 'temptemptemptemptemptemptemptemp',
    circleDown: true,
  },
  {
    title: 'スペース利用手数料はかかりますか？',
    content: 'temptemptemptemptemptemptemptemp',
    circleDown: true,
  },
];


type PropTypes = {
  onClickList: Function,
  openFlagList: Array<boolean>,
  onClickBack: Function,
}

export default (props: PropTypes) => (
  <Fragment>
    <H2>サービスについて</H2>
    {QandA.map((qa, i) => (
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
      <TextButton onClick={props.onClickBack}>前のページへ戻る</TextButton>
    </LinkWrapper>
  </Fragment>
);
