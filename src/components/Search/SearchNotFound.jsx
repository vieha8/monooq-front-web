// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchInput from 'components/atomic/molecules/SearchInput';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens, FontSizes } from 'variables';
import Path from 'config/path';

const PageContainer = styled.div``;

const ContentContainer = styled.div`
  padding: ${Dimens.huge}px 0;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  ${media.tablet`
    width: 100%;
    padding: ${Dimens.medium3}px 20px;
  `}
`;

const Title = styled.h1`
  font-size: ${FontSizes.large}px;
  color: ${Colors.darkGray1};
  line-height: 1.5;
  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
  `};
`;

const Text = styled.div`
  font-size: ${FontSizes.medium}px;
  color: ${Colors.darkGray1};
  line-height: 1.5;
`;

const Group = styled.div`
  margin-top: ${Dimens.large}px;
`;

const ToHostLink = styled(Link)`
  display: block;
  margin-top: ${Dimens.medium}px;
  color: ${Colors.linkBlue};
  font-size: ${FontSizes.medium}px;
`;

type PropTypes = {
  locationText: string,
  onChangeLocation: Function,
  searchDisabled: boolean,
  onClickSearchButton: Function,
}


function refSearchField(ref, props: PropTypes) {
  if (ref) {
    ref.addEventListener('keydown', props.onKeyDownSearchField);
  }
}

export default (props: PropTypes) => (
  <PageContainer>
    <ContentContainer>
      <Title>ごめんなさい！<br />入力したキーワードの検索結果はありませんでした。</Title>
      <Group>
        <Text>住所や地名を入れて、もう1度検索してみてください。</Text>
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
        <Text>それとも、あなたが余ったスペースの登録をしてみますか？</Text>
        <Text>モノオクは誰でもかんたんにホストになることができます。</Text>
      </Group>
      <ToHostLink to={props.isLogin ? Path.createSpaceInfo() : Path.signup()}>ホストになる</ToHostLink>
    </ContentContainer>
  </PageContainer>
);
