import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Dimens, Colors, FontSizes } from 'variables';
import Path from 'config/path';
import { formatAddComma } from 'helpers/string';
import { areaPrefectures } from 'helpers/prefectures';
import { deleteLocalStorage } from 'helpers/storage';
import Button from 'components/LV1/Forms/Button';
import { H1 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
import MenuItemTopList from 'components/LV2/Lists/MenuItemTopList';
import ModalTopDesiredCondition from 'components/LV3/ModalTopDesiredCondition';
import PrefectureList from 'components/LV3/PrefectureList';
// import SpaceList from 'components/LV3/SpaceList';
import View from 'components/LV3/Top/View';
import SearchResult from 'components/LV3/SearchResult';
import ModalNoSpaceRecommend from 'components/LV3/ModalNoSpaceRecommend';
import Want from 'components/LV3/Lp123Guest/Want';
import Merit from 'components/LV3/Lp123Guest/Merit';
import BizModel from 'components/LV3/Lp123Guest/BizModel';
import Flow from 'components/LV3/Lp123Guest/Flow';

const BgImageAbout =
  'https://monooq.imgix.net/img%2Fservice%2Fbg-top-menu-sub-about.png?auto=compress';
const BgImageHowto =
  'https://monooq.imgix.net/img%2Fservice%2Fbg-top-menu-sub-howto.png?auto=compress';
const BgImageQa = 'https://monooq.imgix.net/img%2Fservice%2Fbg-top-menu-sub-qa.png?auto=compress';

const Wrap = styled.div`
  width: 100%;
`;

const ButtonTestWrap = styled.div`
  max-width: 300px;
  margin: ${Dimens.medium_20}px auto auto;
`;

const MoreButtonWrap = styled.div`
  max-width: 300px;
  margin: ${Dimens.medium}px auto ${Dimens.medium2_32}px;
`;

const ButtonStyled = styled(Button)`
  margin: ${Dimens.medium}px auto;
`;

const LinkStyled = styled(Link)`
  color: ${Colors.white} !important;
`;

const ResultWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: ${Dimens.medium}px auto;
  padding: 0 ${Dimens.medium}px;
`;

const ResultCount = styled.span`
  font-size: ${FontSizes.large}px;
  color: ${Colors.brandPrimary};
  margin-left: ${Dimens.small_10}px;
  margin-right: ${Dimens.xxsmall_5}px;
`;

const SearchResultWrap = styled.div`
  margin: ${Dimens.medium}px auto;
`;

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default ({
  // sections,
  regionId,
  spaces,
  spacesHistory,
  onClickSpace,
  user,
  maxCount,
  conditionTitle,
  isViewModalTop,
  requestParams,
  isLoading,
  modalPrefName,
}) => {
  const isLogin = useSelector(state => state.auth.isLogin);
  const isExistSpace = spaces && spaces.length > 0;

  // FIXME:サインアップ直後に検索が走らないのをなんとかする
  if(isLoading) {
    return <div> Load </div>
  }
  return (
    <Wrap>
      <View />
      {process.env.NODE_ENV !== 'production' && (
        <Fragment>
          <ButtonTestWrap>
            <Button secondary fill={1} onClick={() => deleteLocalStorage('isRequestedTop')}>
              LS削除(希望送信済み状態)(開発用)
            </Button>
          </ButtonTestWrap>
          <ButtonTestWrap>
            <Button secondary fill={1} onClick={() => deleteLocalStorage('request_params')}>
              LS削除(ReqForm保存値)(開発用)
            </Button>
          </ButtonTestWrap>
        </Fragment>
      )}
      <PrefectureList list={areaPrefectures} regionId={regionId} />
      {spacesHistory && spacesHistory.length > 0 && (
        <ResultWrap>
          <ResultRow>
            <H1 bold>閲覧履歴</H1>
          </ResultRow>

          <SearchResultWrap>
            <SearchResult
              via="top"
              spaces={spacesHistory.slice(0, 8).map(s => ({
                ...s,
                image: (s.images[0] || {}).imageUrl,
                onClick: () => onClickSpace(s.id),
              }))}
            />
          </SearchResultWrap>

          <MoreButtonWrap>
            <ButtonStyled primary borderbold fontSize={14} fontbold fill={1}>
              <Link href={Path.historyViewSpace()} passHref>
                <LinkStyled as="a">もっと見る</LinkStyled>
              </Link>
            </ButtonStyled>
          </MoreButtonWrap>
        </ResultWrap>
      )}
      {/* ログインユーザーのみ、自分の住む地域のスペースをレコメンドされる */}
      {isLogin && isExistSpace && (
        <ResultWrap>
          <ResultRow>
            <H1 bold>
              {`${conditionTitle}のスペース`}
              <br />
              <ResultCount>{formatAddComma(maxCount)}</ResultCount>
              <InlineText.Base fontSize={FontSizes.small} nobold>
                件
              </InlineText.Base>
            </H1>
            <div>
              <ButtonStyled borderbold fontSize={14} fontbold fill={1} primary>
                <Link href={`${Path.spacesByPrefecture(user.prefCode)}?via=top`} passHref>
                  <LinkStyled as="a">すべて見る</LinkStyled>
                </Link>
              </ButtonStyled>
            </div>
          </ResultRow>

          <SearchResultWrap>
            <SearchResult
              via="top"
              spaces={spaces.map(s => ({
                ...s,
                image: (s.images[0] || {}).imageUrl,
                onClick: () => onClickSpace(s.id),
              }))}
            />
          </SearchResultWrap>

          <MoreButtonWrap>
            <ButtonStyled primary borderbold fontSize={14} fontbold fill={1}>
              <Link href={`${Path.spacesByPrefecture(user.prefCode)}?via=bottom`} passHref>
                <LinkStyled as="a">スペースをもっと見る</LinkStyled>
              </Link>
            </ButtonStyled>
          </MoreButtonWrap>
        </ResultWrap>
      )}

      <LazyLoad>
        <MenuItemTopList
          list={[
            {
              link: Path.about(),
              bgImage: BgImageAbout,
              titleSub: '置き場に困った荷物がある方へ',
              titleMain: 'モノオクをはじめよう',
            },
            {
              link: Path.howtouse(),
              bgImage: BgImageHowto,
              type: 'howto',
              titleSub: '実際にモノオクを使ってみよう',
              titleMain: 'ご利用の流れ',
            },
            {
              link: 'https://help.monooq.com/',
              bgImage: BgImageQa,
              type: 'qa',
              titleSub: '使い方がわからない人へ',
              titleMain: 'よくあるご質問',
              isLinkBlank: true,
            },
          ]}
        />
      </LazyLoad>
      <LazyLoad>
        <BizModel />
      </LazyLoad>
      <LazyLoad>
        <Want titleWant="こんな荷物ありませんか？" />
      </LazyLoad>
      <LazyLoad>
        <Merit />
      </LazyLoad>
      <LazyLoad>
        <Flow title="すぐに預けられる！" />
      </LazyLoad>
      {/* {sections.map((item, i) => (
        // <SpaceList key={i.toString()} spaceList={item.contents} />
        <SpaceList
          key={i.toString()}
          caption={item.title}
          captionSub="公式がイチオシする高評価スペース"
          spaceList={item.contents}
        />
      ))} */}
      <LazyLoad>
        <MoreButtonWrap>
          <ButtonStyled tertiary borderbold fontSize={14} fontbold fill={1}>
            <Link href={`${Path.top()}#topview`} passHref>
              <LinkStyled as="a">スペースを探してみよう！</LinkStyled>
            </Link>
          </ButtonStyled>
          <ButtonStyled tertiary borderbold fontSize={14} fontbold fill={1}>
            <Link href={`${Path.top()}#prefecture-list-last`} passHref>
              <LinkStyled as="a">詳しく知りたい方はこちらへ</LinkStyled>
            </Link>
          </ButtonStyled>
        </MoreButtonWrap>
      </LazyLoad>
      {isViewModalTop && <ModalTopDesiredCondition params={requestParams} isLoading={isLoading} />}
      {modalPrefName && (
        <ModalNoSpaceRecommend
          header={`${modalPrefName}にはスペースがありませんでした。`}
          content="近くの都道府県でスペースを探してみませんか？"
        />
      )}
    </Wrap>
  );
};
