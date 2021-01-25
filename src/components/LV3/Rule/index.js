import React, { Fragment } from 'react';

import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import PageDefault from 'components/LV1/PageDefault';
import Text from 'components/LV1/Texts/TextStatic';
import AboutCancelList from 'components/LV2/Lists/AboutCancelList';
import ContentDescription from 'components/LV2/Texts/ContentDescription';
import MainTitleWrap from 'components/LV2/Texts/MainTitleStatic';

const SectionTitle = styled.div`
  font-size: ${FontSizes.medium3}px;
  line-height: normal;
  font-weight: bold;
  margin: ${Dimens.medium3_44}px auto ${Dimens.medium_18}px;
  padding-bottom: ${Dimens.xxsmall_5}px;
  border-bottom: 1px solid ${Colors.lightGray2};
  ${media.phone`
    margin: ${Dimens.medium3_44}px auto ${Dimens.medium}px;
  `};
`;

const SubTitle = styled.div`
  font-size: ${FontSizes.medium2}px;
  line-height: normal;
  font-weight: bold;
  margin: ${Dimens.medium3_40}px auto ${Dimens.xxsmall_4}px;
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
    margin: ${Dimens.medium_20}px auto ${Dimens.xxsmall_4}px;
  `};
`;

const ContentWrap = styled.div``;

const NotAllowedContentWrapper = styled.div`
  margin: ${Dimens.medium_22}px 0 ${Dimens.medium3_40}px;
  ${media.phone`
    margin: ${Dimens.medium_22}px 0 ${Dimens.medium2}px;
  `};
`;

const ContentText = styled(Text)`
  margin: ${Dimens.medium1}px 0;
`;

const titleCaption = () => {
  return (
    <Fragment>
      モノオクは、みなさんのあたたかく誠実なご対応と共に運営を行っています。
      <br />
      だれもが気持ちよくサービスを利用できるよう、ルールとマナーを必ず守りましょう。
    </Fragment>
  );
};

export default function Rule() {
  return (
    <PageDefault>
      <MainTitleWrap mainTitle="ルールとマナー" text={titleCaption()} />

      <ContentWrap id="not-allowed">
        <SectionTitle>ルール</SectionTitle>
        <SubTitle>■取引ができない荷物</SubTitle>
        <Text>モノオクでは、以下に相当する荷物のスペース利用を禁止しています。</Text>
        <NotAllowedContentWrapper>
          <AboutCancelList
            cancelContentList={[
              {
                header: '危険物・劇毒物',
                data:
                  '劇薬、毒物、農薬、化学薬品、花火、放射性物質、ハサミ、工具、ナイフなど凶器と判断されるもの',
              },
              {
                header: '可燃物・特殊可燃物',
                data: '塗料、マッチ、ライター、ゴム、燃料類など',
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
                header: '慶事・祭事・仏事関連品',
                data: '仏壇、祭壇、神棚など',
              },
              {
                header: 'その他',
                data:
                  'その他の個人の貴重品、高価な荷物、現金・有価証券の類、ゴミ、産業廃棄物およびこれらに類する物、常温では管理できない物、法令に定められている取り扱いできない物',
              },
            ]}
          />
          <ContentText>
            また、下記のような取り扱いに注意が必要なものはホスト/ゲスト間で荷物の内容や保管方法を必ずご確認の上、契約してください。
          </ContentText>
          <AboutCancelList
            cancelContentList={[
              {
                header: 'こわれやすい物',
                data: 'ガラス、陶磁器類など',
              },
              {
                header: '特殊な衣料',
                data: '毛皮、着物など',
              },
              {
                header: '保管に注意が必要なもの',
                data: 'タイヤ、楽器、機材類など',
              },
            ]}
          />
        </NotAllowedContentWrapper>
        <SubTitle>■禁止されている行為</SubTitle>
        <Text>以下の行為を禁止します。</Text>
        <ContentDescription
          title="ホスト（スペース提供者）"
          dontActionList={[
            {
              text: '架空のスペースを登録する行為',
            },
            {
              text: '虚偽または誤りのある情報を掲載する行為',
            },
            {
              text: '第三者のスペースを代行して運営する行為',
            },
            {
              text: '提供する意思がないにも関わらずスペース登録する行為',
            },
            {
              text: '他の会員の写真や文章を無断で使用する行為',
            },
            {
              text: '宣伝、勧誘などモノオクの利用に関係のない情報を掲載する行為',
            },
          ]}
        />
        <ContentDescription
          title="ゲスト（スペース利用者）"
          dontActionList={[
            {
              text: '荷物を置く以外の用途でスペースを利用する行為',
            },
            {
              text: '利用する意思がないにも関わらずホストにリクエストを送る行為',
            },
            {
              text: '他の会員の写真や文章を無断で使用する行為',
            },
            {
              text: '宣伝・勧誘などモノオクの利用に関係のない情報を掲載する行為',
            },
          ]}
        />
        <ContentDescription
          title="取引"
          dontActionList={[
            {
              text: 'アカウント登録した本人以外が取引をする行為',
            },
            {
              text:
                'モノオクの取引で取得した他の会員の個人情報やトークルームの内容を、取引を履行する目的以外のために利用または外部に公開する行為',
            },
            {
              text: 'モノオクサービス上以外で決済する行為',
            },
            {
              text: 'モノオクサービス上以外での決済を促す行為',
            },
            {
              text: 'ホスト/ゲストの双方で同意が取れていない手段で荷物を配送する行為',
            },
            {
              text: '事前申告と異なる荷物の保管をホストに強要する行為',
            },
            {
              text: '上記の「取引ができない荷物」に該当する荷物の保管をホストに強要する行為',
            },
            {
              text: 'ゲストの荷物をモノオクで登録しているスペース以外で保管する行為',
            },
            {
              text: 'ゲストの荷物を無断で開封・使用・破棄する行為',
            },
            {
              text: '契約期間中に同意なく利用料金を変更する行為',
            },
            {
              text: 'ホストに無断でスペース利用の延長をする行為',
            },
            {
              text: '利用終了日に荷物を引き取らない行為',
            },
          ]}
        />
        <ContentDescription
          title="その他"
          dontActionList={[
            {
              text: '下記の迷惑行為',
              textSubList: ['誹謗中傷', '脅迫行為', '差別行為', '他人に不快感、不利益を与える行為'],
            },
            {
              text: '公序良俗に反する行為',
            },
            {
              text: '営業活動、宣伝活動、宗教活動、選挙活動にあたる行為',
            },
            {
              text: '複数のアカウントを登録・所持する行為',
            },
            {
              text: 'モノオクが不適切と判断する行為',
              textSubList: [
                '利用規約に反する行為',
                'ご利用ガイドに反する行為',
                'モノオクの運営を妨害する行為',
                'モノオクの信用を失墜、毀損させる行為 など',
              ],
            },
          ]}
        />

        <SectionTitle>マナー</SectionTitle>
        <ContentDescription
          title="基本のマナー"
          dontActionList={[
            {
              text: '誠実なやり取りを心がけましょう。',
              textSubList: [
                'ホスト/ゲストの双方が気持ち良く取引ができるように、相手を思いやり誠実な態度でやり取りしましょう。',
              ],
              textSubListNoBar: true,
            },
            {
              text: '速やかな返信を心がけましょう。',
              textSubList: [
                'メッセージを送信後に返信がないと、不安になってしまうものです。メッセージ受信後は速やかに返信を行なってください。また、ご事情により利用をお断りする際も必ずその旨を伝えましょう。',
              ],
              textSubListNoBar: true,
            },
            {
              text: '丁寧な言葉遣いを心がけましょう。',
              textSubList: [
                'モノオクは老若男女様々なお客様にご利用いただいています。',
                'やり取りは敬語で行なうなど、相手に配慮した失礼のない言葉遣いを心がけましょう。',
              ],
              textSubListNoBar: true,
            },
            {
              text: '感情的にならないように心がけましょう。',
              textSubList: [
                'テキストだけのやり取りは、対面でのコミュニケーションより誤解が起こりやすくなります。必要事項をしっかりと明記し、冷静なやり取りを行いましょう。',
              ],
              textSubListNoBar: true,
            },
          ]}
        />
        <ContentDescription
          title="ホストのマナー"
          dontActionList={[
            {
              text:
                'ゲストが安心して利用できるよう、スペース紹介ページには正確な情報を記載しましょう。',
            },
            {
              text:
                '契約を行う前に必ずゲストの荷物の量、内容を確認し、確実に保管できる量の荷物を預かりましょう。',
            },
            {
              text:
                '契約を行う前に必ずゲストの希望利用期間を確認し、確実に預かれる期間で契約しましょう。契約期間中に荷物の保管をお断りすることはゲストへの迷惑となります。',
            },
            {
              text: '契約後は荷物の搬入日時をしっかり確認し、確実に荷物を受け取りましょう。',
            },
            {
              text: '荷物が届いたら責任を持って荷物を保管しましょう。',
            },
            {
              text: '取引終了後は、ゲストに感謝の気持ちを伝えましょう。',
            },
          ]}
        />
        <ContentDescription
          title="ゲストのマナー"
          dontActionList={[
            {
              text:
                '利用リクエストを送る際は、スペース情報（地域・受け入れ可能な荷物・期間など）をしっかり確認しましょう。',
            },
            {
              text:
                '利用リクエストを送る際は、スペースの利用目的・荷物の内容・荷物の量・希望の利用期間を漏れなく明記しましょう。荷物の写真をメッセージに添付して伝えると量を把握しやすいです。',
            },
            {
              text: 'ホストから見積もりが届いたら速やかにモノオクサービス上で決済を行いましょう。',
            },
            {
              text: '荷物の配送手段や日時が決まったら、詳細にホストに伝えましょう。',
            },
            {
              text:
                '利用終了日が近づいたら、余裕を持って利用延長依頼や引き取り準備を行いましょう。',
            },
            {
              text: '取引終了後は、ホストに感謝の気持ちを伝えましょう。',
            },
          ]}
        />
      </ContentWrap>
    </PageDefault>
  );
}
