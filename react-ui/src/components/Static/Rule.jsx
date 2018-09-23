import React, { Fragment } from 'react';

import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import DefaultContainer from 'components/atomic/containers/DefaultContainer';
import Footer from 'components/atomic/LV2/Footer';

// import ruleImage1 from 'images/rule-img01.svg';
// import ruleImage2 from 'images/rule-img02.svg';
// import ruleImage3 from 'images/rule-img03.svg';

const MainTitle = styled.div`
  font-size: ${FontSizes.xlarge}px;
  line-height: ${FontSizes.xlarge * 1.5}px;
  margin-bottom: 44px;
  ${media.phone`
    font-size: 7.5vw;
    line-height: ${7.5 * 1.5}vw;
    margin-bottom: 20px;
  `};
`;

const SubTitle = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: ${FontSizes.large}px;
  margin-bottom: 45px;
  ${media.phone`
    font-size: 6.5vw;
    line-height: ${6.5 * 1.5}vw;
  `};
`;

const Text = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: ${FontSizes.medium * 2}px;
  ${media.phone`
    font-size: 5vw;
    line-height: ${5 * 1.5}vw;
  `};
`;

const HilightText = styled.div`
  font-size: ${FontSizes.medium1}px;
  line-height: ${FontSizes.medium1 * 1.5}px;
  ${media.phone`
    font-size: 5vw;
    line-height: 7.5vw;
  `};
`;

const TextWrapper = styled.div`
  margin-bottom: 40px;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: ${Colors.lightGray2};
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

// const HowSafeContainer = DefaultContainer.extend``;
//
// const HowSafeContentWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

// const HowSafeContent = props => {
//   const ImageArea = styled.div`
//     height: 130px;
//     width: 100%;
//     background: url(${props.image}) center no-repeat;
//     ${media.phone`
//       height: 110px;
//     `};
//   `;
//   const TextArea = styled(Text)`
//     margin-bottom: 30px;
//   `;
//   return (
//     <div className={props.className}>
//       <HilightText>{props.label}</HilightText>
//       <ImageArea />
//       <TextArea>{props.text}</TextArea>
//     </div>
//   );
// };

// const StyledHowSafeContent = styled(HowSafeContent)`
//   width: 326px;
// `;

const NotAllowedContainer = DefaultContainer.extend``;

const NotAllowedContentWrapper = styled.div`
  margin: 30px 0;
`;

const NotAllowedContent = props => {
  const Header = styled.div`
    width: 180px;
    font-weight: bold;
    margin-right: 20px;
    ${media.phone`
      width: 100%;
    `};
  `;
  const Data = styled.div`
    width: 758px;
    font-size: ${FontSizes.small}px;
    line-height: ${FontSizes.small * 2}px;
    padding: 16px 0;
    ${media.phone`
      line-height: 30px;
      margin-bottom: 20px;
      padding: 0;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  line-height: 60px;
  font-size: 14px;
  padding: 0 20px;
  border-right: 1px solid ${Colors.borderGray};
  border-left: 1px solid ${Colors.borderGray};
  border-bottom: 1px solid ${Colors.borderGray};
  :nth-child(odd) {
    background-color: ${Colors.lightGray2Bg};
  }
  :first-child {
    border-top: 1px solid ${Colors.borderGray};
  }
`;

const DoNotActionContainer = DefaultContainer.extend`
  margin-bottom: 135px;
`;

const DoNotActionContent = props => {
  const Title = styled(HilightText)`
    font-weight: bold;
    margin-bottom: 22px;
  `;
  return (
    <div>
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
          お支払い・荷物・あなた自身を守るために、相談から利用終了日までの決済・やり取りは必ずモノオクのプラットフォームで行ってください。もしも不必要なサービス以外の連絡手段を強要されたり、現金での支払いなどを求められたら、モノオクまでご報告ください。
        </Text>
      </TextWrapper>
      <TextWrapper>
        <HilightText>すべての荷物内容を連絡。</HilightText>
        <Text>
          当日になって「聞いていた荷物と違う！」そんな状況はホストがとっても困ります。あなたの荷物が多くても少なくても、必ずホストへ荷物の内容の申告を行ってください。
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
          「思っていたより多い。聞いていたサイズと全然違う。」あなたのスペースを有効に使うためにも、メッセージで必ず確認してください。ホストをお守りするためにもとっても大事なことです。
        </Text>
      </TextWrapper>
      <TextWrapper>
        <HilightText>なぜ荷物を置きたいのかユーザーに聞いてみましょう。</HilightText>
        <Text>
          なぜあなたのスペースが良いのか、事前に聞いてみましょう。引っ越しやトランクルームの代わりにしたいなど状況は様々です。
        </Text>
      </TextWrapper>

      <Hr />
    </WhoWantBeHostContainer>

    {/*<HowSafeContainer>*/}
    {/*<SubTitle>安心して物置きシェアをしてもらうために。</SubTitle>*/}
    {/*<HowSafeContentWrapper>*/}
    {/*{[*/}
    {/*{*/}
    {/*label: 'あなたをサポート',*/}
    {/*image: ruleImage1,*/}
    {/*text:*/}
    {/*'「こんな場合はどうするの？」「もしかしてトラブル？」お困りの時はヘルプチャットや専用の問い合わせフォームよりご連絡ください。',*/}
    {/*},*/}
    {/*{*/}
    {/*label: 'レビュー評価',*/}
    {/*image: ruleImage2,*/}
    {/*text:*/}
    {/*'誠実で健全なサービスを運営していくために、取り引き完了後に相互レビュー評価を行います。',*/}
    {/*},*/}
    {/*{*/}
    {/*label: '違反報告',*/}
    {/*image: ruleImage3,*/}
    {/*text:*/}
    {/*'迷惑な行為をする人や、禁止されている情報を掲載しているスペースはモノオクまで通報することができます。不適切と判断した場合に随時対応を行っています。',*/}
    {/*},*/}
    {/*].map((v, i) => {*/}
    {/*return <StyledHowSafeContent label={v.label} image={v.image} text={v.text} key={i} />;*/}
    {/*})}*/}
    {/*</HowSafeContentWrapper>*/}

    {/*<Hr />*/}
    {/*</HowSafeContainer>*/}

    <NotAllowedContainer id="not-allowed">
      <SubTitle>取引ができない荷物</SubTitle>
      <HilightText>モノオクでは、以下に相当する荷物のスペース利用を禁止しています。</HilightText>

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
            data: '磁気テープ類などの磁気の影響を受ける物、精密機器など',
          },
          {
            header: '生き物',
            data: '植木類、苗および生花、種子、ペット類など',
          },
          {
            header: '美術品・高価品',
            data: '書画、骨董品、宝石類、毛皮品など',
          },
          {
            header: '生鮮食品',
            data: '魚介類、野菜、果実など',
          },
          {
            header: '異臭のする物',
            data: '臭いの強い物など',
          },
          {
            header: 'こわれやすい物',
            data: 'ガラス、陶磁器類など',
          },
          {
            header: '特殊な衣料',
            data: '毛皮、着物など',
          },
          {
            header: '慶事・祭事・仏事関連品',
            data: '仏壇、祭壇、神棚など',
          },
          {
            header: 'その他',
            data:
              'その他の個人の貴重品、ピアノ、電子オルガン、現金・有価証券の類、ゴミ、産業廃棄物およびこれらに類する物、常温では管理できない物、法令に定められている取り扱いできない物',
          },
        ].map((v, i) => {
          return <StyledNotAllowedContent header={v.header} data={v.data} key={i} />;
        })}
      </NotAllowedContentWrapper>

      <Hr />
    </NotAllowedContainer>

    <DoNotActionContainer>
      <SubTitle>禁止されている行為</SubTitle>

      <DoNotActionContent title="取り引き">
        {[
          {
            hilightText: 'モノオク以外で支払いを行うこと。',
            text:
              'モノオクではユーザーからお預かりした料金を、取引完了後にホストへ安全にお支払いします。直接の口座振込や現金のお支払いは一切行わないでください。もしも、このような行為を持ちかけられた場合は、モノオクカスタマーサポートまでご連絡ください。',
          },
          {
            hilightText: '登録した本人以外が連絡や取引をすること。',
            text: '必ずアカウント登録を行ったご本人が取引を行ってください。',
          },
          {
            hilightText: '申告と異なる荷物をホストへ強要すること。',
            text:
              'ホストが認識していない荷物を無理やりお願いすることは禁止です。事前にしっかりと内容を伝えましょう。',
          },
          {
            hilightText: '無断でスペース利用の延長をすること。',
            text:
              '利用終了日に荷物を取りに来ない、連絡がとれない、などお互いが困る行為は禁止です。',
          },
          {
            hilightText: '同意が取れていない方法で荷物を届けること。',
            text:
              '一方的に着払いをするなど、ホストが困る身勝手な行為は禁止です。荷物の配送方法に関してもお互いが同意の上で取り引きを進めてください。',
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
              '実体のないスペースの登録は禁止です。このような掲載を見つけ次第、情報の非公開・アカウント停止などの対応を行います。',
          },
          {
            hilightText: '虚偽または誤りのある情報を掲載すること。',
            text: '良く見せようとして、嘘の内容や過度な強調がされた内容を掲載するのは禁止です。',
          },
          {
            hilightText: '他のホストの文章・写真などを使用すること。',
            text: 'あなたが管理するスペースの内容を掲載してください。',
          },
          {
            hilightText: '宣伝・勧誘などサービス利用に関係のない情報を掲載すること。',
            text:
              '物置きシェアのために必要な情報を掲載してください。このような掲載を見つけ次第、情報の非公開・アカウント停止などの対応を行います。',
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
            text: 'スペース掲載や取り引きに関係のないサービスへ誘導するのは禁止です。',
          },
          {
            hilightText: 'みんなに迷惑な行為。',
            text: 'みんなが安心してサービス利用ができなくなる迷惑行為は禁止です。',
          },
          {
            hilightText: '個人を特定できるような情報を発信すること。',
            text:
              'だれかの誹謗中傷、個人情報や写真など、悪質な内容を発見したらすぐさま対応します。',
          },
          {
            hilightText: 'その他、モノオクカスタマーサポートにて不適切と判断する行為。',
            text:
              'カスタマーサポートでは随時掲載内容のチェックを行っています。おかしいな？と思ったらモノオクまでご報告ください。',
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
