// @flow

import React from 'react';
import styled from 'styled-components';
import TextLink from 'components/atomic/atoms/TextLink';
import InlineText from 'components/atomic/atoms/InlineText';
import { H1 } from 'components/atomic/atoms/Headline';
import SearchInput from 'components/atomic/molecules/SearchInput';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';
import Path from 'config/path';

const PageContainer = styled.div``;

const ContentContainer = styled.div`
  padding: ${Dimens.huge}px 8%;
  padding-bottom: 80px;
  width: 1024px;
  margin: 0 auto;

  ${media.tablet`
    width: 100%;
    padding: ${Dimens.medium3}px 20px;
  `}
`;

const Group = styled.div`
  margin-top: ${Dimens.large}px;
`;

const ToHostLink = styled.div`
  display: block;
  margin-top: ${Dimens.medium}px;
`;

type PropTypes = {
  locationText: string,
  onChangeLocation: Function,
  searchDisabled: boolean,
  onClickSearchButton: Function,
  onKeyDownSearchField: Function,
}


function refSearchField(ref, props: PropTypes) {
  if (ref) {
    ref.addEventListener('keydown', props.onKeyDownSearchField);
  }
}

export default (props: PropTypes) => (
  <PageContainer>
    <ContentContainer>
      <H1>ごめんなさい！<br />入力したキーワードの検索結果はありませんでした。</H1>
      <Group>
        <div>
          <InlineText.Base>住所や地名を入れて、もう1度検索してみてください。</InlineText.Base>
        </div>
        <SearchInput
          placeholder="近くのスペースを検索してみよう！　例）東京都港区"
          locationText={props.locationText}
          onChange={props.onChangeLocation}
          onRef={ref => refSearchField(ref, props)}
          searchDisabled={props.searchDisabled}
          borderColor={Colors.borderGray}
          onClickSearchButton={props.onClickSearchButton}
        />
      </Group>
      <Group>
        <div>
          <InlineText.Base>それとも、あなたが余ったスペースの登録をしてみますか？</InlineText.Base>
        </div>
        <div>
          <InlineText.Base>モノオクは誰でもかんたんにホストになることができます。</InlineText.Base>
        </div>
      </Group>
      <ToHostLink>
        <TextLink to={props.isLogin ? Path.createSpaceInfo() : Path.signup()}>ホストになる</TextLink>
      </ToHostLink>
    </ContentContainer>
  </PageContainer>
);
