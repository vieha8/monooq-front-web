import React, { Fragment } from 'react';

import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import DefaultContainer from 'components/LV1/DefaultContainer';
import Footer from 'components/LV2/Footer';
import MainTitleContainer from 'components/LV2/StaticMainTitle';
import Hr from 'components/LV1/HorizontalRule';
import Text from 'components/LV1/StaticText';
import AboutCancellContent from 'components/LV2/AboutCancellContent';
import DescriptionContent from 'components/LV2/DescriptionContent';

const SubTitle = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: ${FontSizes.large}px;
  margin-bottom: ${Dimens.medium3_40}px;
  ${media.phone`
    font-size: 6.5vw;
    line-height: ${6.5 * 1.5}vw;
  `};
`;

const ContentWrap = styled(DefaultContainer)`
  ${props =>
    props.DoNotAction &&
    `
      margin-bottom: 135px;
    `};
`;

const NotAllowedContentWrapper = styled.div`
  margin: ${Dimens.medium2}px 0;
`;

export default () => (
  <Fragment>
    <MainTitleContainer
      mainTitle="ルールとマナー"
      text="モノオクは、みなさんのあたたかく誠実なご対応と共に運営を行っています。だれもが気持ちよく物置きシェアを行うためにルールとマナーは必ず守ってください。"
      isHr
    />

    <ContentWrap>
      <SubTitle>荷物を置くスペースを探している方</SubTitle>
      <DescriptionContent
        dontActionList={[
          {
            header: 'スペース情報をしっかり確認。',
            text:
              'ホストの掲載内容やメッセージのやり取りを確認しましょう。なにかおかしいな？と思ったらカスタマーサポートまでご連絡ください。',
          },
          {
            header: '連絡と支払いはモノオクで。',
            text:
              'お支払い・荷物・あなた自身を守るために、相談から利用終了日までの決済・やり取りは必ずモノオクのプラットフォームで行ってください。もしも不必要なサービス以外の連絡手段を強要されたり、現金での支払いなどを求められたら、モノオクまでご報告ください。',
          },
          {
            header: 'すべての荷物内容を連絡。',
            text:
              '当日になって「聞いていた荷物と違う！」そんな状況はホストがとっても困ります。あなたの荷物が多くても少なくても、必ずホストへ荷物の内容の申告を行ってください。',
          },
        ]}
      />
      <Hr />
    </ContentWrap>

    <ContentWrap>
      <SubTitle>モノオクでホストをしたい方</SubTitle>
      <DescriptionContent
        dontActionList={[
          {
            header: '誠実なスペース情報を掲載しましょう。',
            text:
              'より正確なスペース情報を掲載することで、ユーザーはあなたに安心して相談できます。',
          },
          {
            header: '荷物の情報を必ず聞きましょう。',
            text:
              '「思っていたより多い。聞いていたサイズと全然違う。」あなたのスペースを有効に使うためにも、メッセージで必ず確認してください。ホストをお守りするためにもとっても大事なことです。',
          },
          {
            header: 'なぜ荷物を置きたいのかユーザーに聞いてみましょう。',
            text:
              'なぜあなたのスペースが良いのか、事前に聞いてみましょう。引っ越しやトランクルームの代わりにしたいなど状況は様々です。',
          },
        ]}
      />
      <Hr />
    </ContentWrap>

    <ContentWrap id="not-allowed">
      <SubTitle>取引ができない荷物</SubTitle>
      <Text>モノオクでは、以下に相当する荷物のスペース利用を禁止しています。</Text>
      <NotAllowedContentWrapper>
        <AboutCancellContent
          cancelContentList={[
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
          ]}
        />
      </NotAllowedContentWrapper>
      <Hr />
    </ContentWrap>

    <ContentWrap DoNotAction>
      <SubTitle>禁止されている行為</SubTitle>

      <DescriptionContent
        title="取り引き"
        dontActionList={[
          {
            header: 'モノオク以外で支払いを行うこと。',
            text:
              'モノオクではユーザーからお預かりした料金を、取引完了後にホストへ安全にお支払いします。直接の口座振込や現金のお支払いは一切行わないでください。もしも、このような行為を持ちかけられた場合は、モノオクカスタマーサポートまでご連絡ください。',
          },
          {
            header: '登録した本人以外が連絡や取引をすること。',
            text: '必ずアカウント登録を行ったご本人が取引を行ってください。',
          },
          {
            header: '申告と異なる荷物をホストへ強要すること。',
            text:
              'ホストが認識していない荷物を無理やりお願いすることは禁止です。事前にしっかりと内容を伝えましょう。',
          },
          {
            header: '無断でスペース利用の延長をすること。',
            text:
              '利用終了日に荷物を取りに来ない、連絡がとれない、などお互いが困る行為は禁止です。',
          },
          {
            header: '同意が取れていない方法で荷物を届けること。',
            text:
              '一方的に着払いをするなど、ホストが困る身勝手な行為は禁止です。荷物の配送方法に関してもお互いが同意の上で取り引きを進めてください。',
          },
        ]}
      />

      <DescriptionContent
        title="スペース登録"
        dontActionList={[
          {
            header: '架空のスペースを登録すること。',
            text:
              '実体のないスペースの登録は禁止です。このような掲載を見つけ次第、情報の非公開・アカウント停止などの対応を行います。',
          },
          {
            header: '虚偽または誤りのある情報を掲載すること。',
            text: '良く見せようとして、嘘の内容や過度な強調がされた内容を掲載するのは禁止です。',
          },
          {
            header: '他のホストの文章・写真などを使用すること。',
            text: 'あなたが管理するスペースの内容を掲載してください。',
          },
          {
            header: '宣伝・勧誘などサービス利用に関係のない情報を掲載すること。',
            text:
              '物置きシェアのために必要な情報を掲載してください。このような掲載を見つけ次第、情報の非公開・アカウント停止などの対応を行います。',
          },
        ]}
      />

      <DescriptionContent
        title="その他"
        dontActionList={[
          {
            header: '物置きシェアに関係のない外部サービスへの誘導。',
            text: 'スペース掲載や取り引きに関係のないサービスへ誘導するのは禁止です。',
          },
          {
            header: 'みんなに迷惑な行為。',
            text: 'みんなが安心してサービス利用ができなくなる迷惑行為は禁止です。',
          },
          {
            header: '個人を特定できるような情報を発信すること。',
            text:
              'だれかの誹謗中傷、個人情報や写真など、悪質な内容を発見したらすぐさま対応します。',
          },
          {
            header: 'その他、モノオクカスタマーサポートにて不適切と判断する行為。',
            text:
              'カスタマーサポートでは随時掲載内容のチェックを行っています。おかしいな？と思ったらモノオクまでご報告ください。',
          },
        ]}
      />
    </ContentWrap>

    <Footer />
  </Fragment>
);
