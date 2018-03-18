import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';
import { Dimens } from 'variables';

const DefaultContainer = styled.div`
  width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  ${media.phone`
    padding: 0 8vw;
    width: 100vw;
  `};
`;

const MainTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  margin-bottom: 44px;
  ${media.phone`
    font-size: 32px;
  `};
`;

const SubTitle = styled.div`
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 45px;
  ${media.phone`
    font-size: 28px;
    line-height: 40px;
  `};
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 32px;
`;

const HilightText = styled.div`
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 21px;
`;

const TextWrapper = styled.div`
  margin-bottom: 40px;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: #dbdbdb;
  margin: 50px 0;
  ${media.phone`
    margin: 20px 0;
  `};
`;

const MainTitleContainer = DefaultContainer.extend`
  margin-top: 80px;
  ${media.phone`
    margin-top: 40px;
  `};
`;

const WhoFindHostContainer = DefaultContainer.extend``;

const WhoWantBeHostContainer = DefaultContainer.extend``;

const HowSafeContainer = DefaultContainer.extend``;

const HowSafeContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HowSafeContent = props => {
  const ImageArea = styled.div`
    height: 130px;
    width: 100%;
    background: url(${props.image}) center no-repeat;
  `;
  return (
    <div className={props.className}>
      <ImageArea />
      <HilightText>{props.label}</HilightText>
      <Text>{props.text}</Text>
    </div>
  );
};

const StyledHowSafeContent = styled(HowSafeContent)`
  width: 326px;
`;

const NotAllowedContainer = DefaultContainer.extend``;

const NotAllowedContentWrapper = styled.div`
  margin-bottom: 30px;
`;

const NotAllowedContent = props => {
  const Header = styled.div`
    width: 178.22px;
    font-weight: bold;
    margin-right: 20px;
    ${media.phone`
      width: 100%;
    `};
  `;
  const Data = styled.div`
    ${media.phone`
      line-height: 30px;
    `};
  `;
  return (
    <div className={props.className}>
      <Header>{props.header}</Header>
      <Data>{props.data}</Data>
    </div>
  );
};

const StyledNotAllowedContent = styled(NotAllowedContent)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  line-height: 60px;
  font-size: 14px;
  padding: 0 20px;
  border-right: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  :nth-child(odd) {
    background-color: #f9fafb;
  }
  :first-child {
    border-top: 1px solid #dbdbdb;
  }
`;

const DoNotActionContainer = DefaultContainer.extend`
  margin-bottom: 135px;
`;

const DoNotActionContent = props => {
  const Title = styled.div`
    font-size: 22px;
    line-height: 33px;
    font-weight: bold;
    margin-bottom: 22px;
  `;
  return (
    <div className={props.className}>
      <Title>{props.title}</Title>
      {props.children}
    </div>
  );
};

export default props => (
  <Fragment>
    <MainTitleContainer>
      <MainTitle>ルールとマナー</MainTitle>
      <HilightText>
        モノオクは、みなさんのあたたかく誠実なご対応と共に運営を行っています。だれもが気持ちよく物置きシェアを行うためにルールとマナーは必ず守ってください。
      </HilightText>

      <Hr />
    </MainTitleContainer>

    <WhoFindHostContainer>
      <SubTitle>荷物を置くスペースを探している方</SubTitle>

      <TextWrapper>
        <HilightText>スペース情報をしっかり確認。</HilightText>
        <Text>
          ホストの掲載内容やメッセージのやり取りを確認しましょう。なにかおかしいな？と思ったらカスタマーサポートまでご連絡ください。
        </Text>
      </TextWrapper>
      <TextWrapper>
        <HilightText>連絡と支払いはモノオクで。</HilightText>
        <Text>
          ホストの掲載内容やメッセージのやり取りを確認しましょう。なにかおかしいな？と思ったらカスタマーサポートまでご連絡ください。
        </Text>
      </TextWrapper>
      <TextWrapper>
        <HilightText>すべての荷物内容を連絡。</HilightText>
        <Text>
          ホストの掲載内容やメッセージのやり取りを確認しましょう。なにかおかしいな？と思ったらカスタマーサポートまでご連絡ください。
        </Text>
      </TextWrapper>

      <Hr />
    </WhoFindHostContainer>

    <WhoWantBeHostContainer>
      <SubTitle>モノオクでホストをしたい方</SubTitle>

      <TextWrapper>
        <HilightText>誠実なスペース情報を掲載しましょう。</HilightText>
        <Text>
          より正確なスペース情報を掲載することで、ユーザーはあなたに安心して相談できます。
        </Text>
      </TextWrapper>
      <TextWrapper>
        <HilightText>荷物の情報を必ず聞きましょう。</HilightText>
        <Text>
          ホストの掲載内容やメッセージのやり取りを確認しましょう。なにかおかしいな？と思ったらカスタマーサポートまでご連絡ください。
        </Text>
      </TextWrapper>
      <TextWrapper>
        <HilightText>なぜ荷物を置きたいのかユーザーに聞いてみましょう。</HilightText>
        <Text>
          ホストの掲載内容やメッセージのやり取りを確認しましょう。なにかおかしいな？と思ったらカスタマーサポートまでご連絡ください。
        </Text>
      </TextWrapper>

      <Hr />
    </WhoWantBeHostContainer>

    <HowSafeContainer>
      <SubTitle>安心して物置きシェアをしてもらうために。</SubTitle>
      <HowSafeContentWrapper>
        {[
          {
            label: 'あなたをサポート',
            image: 'http://placehold.jp/80x80.png',
            text:
              '「こんな場合はどうするの？」「もしかしてトラブル？」お困りの時はヘルプチャットや専用の問い合わせフォームよりご連絡ください。',
          },
          {
            label: 'レビュー評価',
            image: 'http://placehold.jp/60x60.png',
            text:
              '「こんな場合はどうするの？」「もしかしてトラブル？」お困りの時はヘルプチャットや専用の問い合わせフォームよりご連絡ください。',
          },
          {
            label: '違反報告',
            image: 'http://placehold.jp/70x60.png',
            text:
              '「こんな場合はどうするの？」「もしかしてトラブル？」お困りの時はヘルプチャットや専用の問い合わせフォームよりご連絡ください。',
          },
        ].map((v, i) => {
          return <StyledHowSafeContent label={v.label} image={v.image} text={v.text} key={i} />;
        })}
      </HowSafeContentWrapper>

      <Hr />
    </HowSafeContainer>

    <NotAllowedContainer id="not-allowed">
      <SubTitle>取引ができない荷物</SubTitle>
      <HilightText>モノオクでは以下に相当する荷物の取り引きは禁止しています。</HilightText>

      <NotAllowedContentWrapper>
        {[
          {
            header: '危険物・劇毒物',
            data:
              '劇薬、毒物、農薬、化学薬品、花火、放射性物質、ハサミ、工具、ナイフなど凶器と判断されるもの',
          },
          {
            header: '可燃物・特殊可燃物',
            data: '塗料、マッチ、ライター、ゴム、タイヤ、燃料類など',
          },
          {
            header: '特殊品',
            data:
              '劇薬、毒物、農薬、化学薬品、花火、放射性物質、ハサミ、工具、ナイフなど凶器と判断されるもの',
          },
          {
            header: '生き物',
            data: '塗料、マッチ、ライター、ゴム、タイヤ、燃料類など',
          },
          {
            header: '美術品・高価品',
            data:
              '劇薬、毒物、農薬、化学薬品、花火、放射性物質、ハサミ、工具、ナイフなど凶器と判断されるもの',
          },
          {
            header: '生鮮食品',
            data: '塗料、マッチ、ライター、ゴム、タイヤ、燃料類など',
          },
          {
            header: '異臭のする物',
            data:
              '劇薬、毒物、農薬、化学薬品、花火、放射性物質、ハサミ、工具、ナイフなど凶器と判断されるもの',
          },
          {
            header: 'こわれやすい物',
            data: '塗料、マッチ、ライター、ゴム、タイヤ、燃料類など',
          },
          {
            header: '特殊な衣料',
            data:
              '劇薬、毒物、農薬、化学薬品、花火、放射性物質、ハサミ、工具、ナイフなど凶器と判断されるもの',
          },
          {
            header: '慶事・祭事・仏事関連品',
            data:
              '劇薬、毒物、農薬、化学薬品、花火、放射性物質、ハサミ、工具、ナイフなど凶器と判断されるもの',
          },
          {
            header: 'その他',
            data:
              '劇薬、毒物、農薬、化学薬品、花火、放射性物質、ハサミ、工具、ナイフなど凶器と判断されるもの',
          },
        ].map((v, i) => {
          return <StyledNotAllowedContent header={v.header} data={v.data} key={i} />;
        })}
      </NotAllowedContentWrapper>
      <Text>
        貴重品や高価なもの、2度と手に入れることのない大切な思い出の品などは自分の手元に置いてくださいね。保証は最大10万円となり、それ以上の保証は一切できません。
      </Text>

      <Hr />
    </NotAllowedContainer>

    <DoNotActionContainer>
      <SubTitle>禁止されている行為</SubTitle>

      <DoNotActionContent title="取り引き">
        {[
          {
            hilightText: 'モノオク以外で支払いを行うこと。',
            text:
              'モノオクではユーザーからお預かりした料金を、取引完了後にホストへ安全にお支払いします。',
          },
          {
            hilightText: '登録した本人以外が連絡や取引をすること。',
            text: '必ずアカウント登録を行った本人が行ってください。',
          },
          {
            hilightText: '申告と異なる荷物をホストへ強要すること。',
            text: '必ずアカウント登録を行った本人が行ってください。',
          },
          {
            hilightText: '無断でスペース利用の延長をすること。',
            text:
              'モノオクではユーザーからお預かりした料金を、取引完了後にホストへ安全にお支払いします。',
          },
          {
            hilightText: '同意が取れていない方法で荷物を届けること。',
            text:
              'モノオクではユーザーからお預かりした料金を、取引完了後にホストへ安全にお支払いします。',
          },
        ].map((v, i) => {
          return (
            <TextWrapper key={i}>
              <HilightText>{v.hilightText}</HilightText>
              <Text>{v.text}</Text>
            </TextWrapper>
          );
        })}
      </DoNotActionContent>

      <DoNotActionContent title="スペース登録">
        {[
          {
            hilightText: '架空のスペースを登録すること。',
            text:
              'モノオクではユーザーからお預かりした料金を、取引完了後にホストへ安全にお支払いします。',
          },
          {
            hilightText: '虚偽または誤りのある情報を掲載すること。',
            text: '必ずアカウント登録を行った本人が行ってください。',
          },
          {
            hilightText: '他のホストの文章・写真などを使用すること。',
            text: '必ずアカウント登録を行った本人が行ってください。',
          },
          {
            hilightText: '宣伝・勧誘などサービス利用に関係のない情報を掲載すること。',
            text:
              'モノオクではユーザーからお預かりした料金を、取引完了後にホストへ安全にお支払いします。',
          },
        ].map((v, i) => {
          return (
            <TextWrapper key={i}>
              <HilightText>{v.hilightText}</HilightText>
              <Text>{v.text}</Text>
            </TextWrapper>
          );
        })}
      </DoNotActionContent>

      <DoNotActionContent title="その他">
        {[
          {
            hilightText: '物置きシェアに関係のない外部サービスへの誘導。',
            text:
              'モノオクではユーザーからお預かりした料金を、取引完了後にホストへ安全にお支払いします。',
          },
          {
            hilightText: 'みんなに迷惑な行為。',
            text: '必ずアカウント登録を行った本人が行ってください。',
          },
          {
            hilightText: '個人を特定できるような情報を発信すること。',
            text: '必ずアカウント登録を行った本人が行ってください。',
          },
          {
            hilightText: 'その他、モノオクカスタマーサポートにて不適切と判断する行為。',
            text:
              'モノオクではユーザーからお預かりした料金を、取引完了後にホストへ安全にお支払いします。',
          },
        ].map((v, i) => {
          return (
            <TextWrapper key={i}>
              <HilightText>{v.hilightText}</HilightText>
              <Text>{v.text}</Text>
            </TextWrapper>
          );
        })}
      </DoNotActionContent>
    </DoNotActionContainer>

    <Footer />
  </Fragment>
);
