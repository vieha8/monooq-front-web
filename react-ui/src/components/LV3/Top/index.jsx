import React, { Fragment } from 'react';
import Path from 'config/path';
import Header from 'components/containers/Header';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import StyledDefaultContainer from 'components/LV1/DefaultContainer/StyledDefaultContainer';
import Footer from 'components/LV2/Footer';
import PickupSpaceList from 'components/LV3/PickupSpaceList';
import TopView from 'components/LV3/TopView';
import MediaLineup from 'components/LV3/MediaLineup';
import OtherService from 'components/LV3/OtherService';
import TopIntro from 'components/LV3/TopIntro';
import TopIntroMovie from 'components/LV3/TopIntroMovie';

const logoPickGo =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-pickgo%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=42';
const logoAppliv =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-appliv%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoAscii =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-ascii%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoBridge =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-bridge%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoCnet =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-cnet%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoLifehacker =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-lifehacker%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoTechcrunch =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-techcrunch%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoTechable =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-techable%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';

const TopPage = styled.div`
  min-width: ${Dimens.fixedWidthPc + 32}px;
  margin-top: -${Dimens.medium_20}px;
  background: ${Colors.lightGray2Bg};
  ${media.phone`
    min-width: auto;
  `};
`;

const CommonContainer = styled.div`
  background-color: ${Colors.brandPrimary};
  ${props =>
    props.gray &&
    `
      background-color: ${Colors.lightGray1Bg};
    `};
`;

const ForSafeContainer = styled(StyledDefaultContainer)``;

const PickGoMedia = styled.img`
  height: ${Dimens.medium3}px;
  margin: 0 15.5px;
  margin-bottom: ${Dimens.medium_20}px;
`;

const PickGoDescription = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: ${FontSizes.small * 2}px;
`;

const PickupContainer = styled.div`
  margin: ${Dimens.medium}px 0;
`;

export default props => (
  <TopPage>
    {!props.story && <Header />}
    <TopView
      catchPhrase={
        <Fragment>
          個人間だからできる、
          <br />
          荷物を置くための新しい方法。
        </Fragment>
      }
      subCatchPhrase={
        <Fragment>
          モノオクは空きスペースを活用できる、
          <br />
          物置きシェアサービスです。
        </Fragment>
      }
      SIplaceholder="近くのスペースを検索してみよう！　例）東京都港区"
      SIlocationText={props.locationText}
      SIonChange={props.handleChangeLocation}
      SIonKeyDown={props.onKeyDownSearchField}
      SIsearchDisabled={props.searchButtonDisabled}
      SIonClickSearchButton={props.onClickSearch}
    />

    <PickupContainer>
      <PickupSpaceList
        title="スタッフのおすすめ"
        spaceList={props.pickUpSpaces}
        noMore
        onClickMoreView={() => {}}
      />
    </PickupContainer>

    <CommonContainer>
      <TopIntroMovie
        srcMovie="https://www.youtube.com/embed/t0t50WBDwzc?showinfo=0&rel=0"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        ExplanTitle={
          <Fragment>
            モノオクは、
            <br />
            荷物の置き場所に困っている人と、
            <br />
            余ったスペースを活用したい人をつなぎます。
          </Fragment>
        }
        ExplanText={
          <Fragment>
            1分でわかるサービスの流れ。
            <br />
            誰でもかんたんに物置きスペースを探せて、気軽にホストになる
            <br />
            ことができます。
          </Fragment>
        }
      />
    </CommonContainer>

    <TopIntro
      hilightcopy="小さいモノから大きなモノまで。"
      title="モノオクで物置きスペースを探す理由"
      list={[
        {
          title: '安心の料金',
          description:
            'ホストから提示される金額のみをお支払い。余計な費用なしに荷物を置くことができます。※配送は別途',
        },
        {
          title: '面倒な手続きが不要',
          description:
            '面倒くさい申込書の記入や内覧の必要はありません。必要なのはメッセージや荷物写真のやりとりだけです。',
        },
        {
          title: '拠点数が多い',
          description:
            'モノオクだからできる日本全国に広がる拠点数。あなたのお部屋や引越し先のご近所でも見つかるはず。',
        },
        {
          title: '1ヶ月だけでもOK',
          description:
            '3ヶ月や半年などの契約期間の縛りはありません。ホストと相談して必要な期間だけ荷物を置くことができます。',
        },
        {
          title: '交渉が可能',
          description:
            'もう少し延長できませんか？荷物の搬入を手伝ってくれませんか？など、ホストと気軽に交渉することが可能です。',
        },
      ]}
      isUser
    />

    <CommonContainer gray>
      <TopIntro
        hilightcopy="余っているスペースはありませんか？"
        title="モノオクでホストをする理由"
        list={[
          {
            title: '新しい副収入につなげる',
            description: '余っているスペースとスキマ時間で、新しいおこづかいが生まれます。',
          },
          {
            title: '余ったスペースが活用できる',
            description:
              '使っていないクローゼットや押入れ・空き部屋はありませんか？モノオクならどんな場所でも活用できます。',
          },
          {
            title: 'かんたんに誰でもできる',
            description:
              '荷物を受け取ってスペースに置く、最後は持ち主まで返す。これだけで喜んでくれる人がいます。',
          },
          {
            title: '誰かの役にたつ',
            description:
              '引っ越しやリフォーム、片付けなど荷物を置ける場所を探すのは意外と大変なんです。困っている誰かの力になってくれませんか？',
          },
        ]}
        buttonText="ホスト登録はこちら"
        onClick={props.onClickSignup}
      />
    </CommonContainer>

    <ForSafeContainer>
      <TopIntro
        hilightcopy="みんなでもっと便利に物置きシェアができる世の中へ。"
        title="安心して物置きのシェアをするために"
        list={[
          {
            iconClass: 'far fa-heart',
            title: 'はじめての方へ',
            description:
              'まずは自分に合う物置きスペースを探し、メッセージで荷物を置かせてもらえるかホストに相談をします。サービスの使い方がよくわからない、お困りの方はこちら。',
            buttonText: '使い方について',
            onClickItem: () => props.history.push(Path.about()),
          },
          {
            iconClass: 'far fa-bookmark',
            title: '荷物に対する保険',
            description:
              'サービス内の記録であなたの荷物だと証明できる荷物には最大10万円までの補償があります。あなたがホストの時に、もし誰かの荷物を破損・紛失してしまっても同じ補償が受けられるので安心です。',
            buttonText: '保険について',
            onClickItem: () => props.history.push(Path.insurance()),
          },
          {
            iconClass: 'far fa-handshake',
            title: 'ルールとマナー',
            description:
              'モノオクは個人間の物置きシェアサービスです。トラブルや揉め事がないようにルールを設けています。みんなが安心して使えるようにマナーを大切にしましょう。',
            buttonText: 'ルールとマナーについて',
            onClickItem: () => props.history.push(Path.rule()),
          },
        ]}
        isUser
        isForSafe
      />
    </ForSafeContainer>

    <CommonContainer>
      <OtherService
        catchPhrase={
          <Fragment>
            荷物の配送だって
            <br />
            もっと便利に安くできる
          </Fragment>
        }
        serviceName="PickGo"
        serviceUrl="https://pickgo.town/"
        serviceImage={<PickGoMedia src={logoPickGo} />}
        description={
          <PickGoDescription>
            サービス対象エリア
            <br />
            東京／神奈川／千葉／埼玉／大阪／兵庫／京都
          </PickGoDescription>
        }
        subDescription={
          <Fragment>
            を使えば、
            <br />
            引っ越しが 5,000円 から
          </Fragment>
        }
      />
    </CommonContainer>

    <MediaLineup
      title="メディア掲載"
      list={[
        {
          link: 'https://japan.cnet.com/',
          image: logoCnet,
          alt: 'CNET Japan',
        },
        {
          link: 'http://ascii.jp/',
          image: logoAscii,
          alt: 'ASCII.jp',
        },
        {
          link: 'http://thebridge.jp/',
          image: logoBridge,
          alt: 'THE BRIDGE',
        },
        {
          link: 'https://mag.app-liv.jp/',
          image: logoAppliv,
          alt: 'Appliv',
        },
        {
          link: 'https://www.lifehacker.jp/',
          image: logoLifehacker,
          alt: 'lifehacker',
        },
        {
          link: 'https://jp.techcrunch.com/',
          image: logoTechcrunch,
          alt: 'TechCrunch',
        },
        {
          link: 'https://techable.jp',
          image: logoTechable,
          alt: 'TECHABLE',
        },
      ]}
    />

    <Footer />
  </TopPage>
);
