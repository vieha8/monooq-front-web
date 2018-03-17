import React, { Fragment } from 'react';

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';

const DefaultContainer = styled.div`
  padding: 0 116px;
  ${media.phone`
    padding: 0 8vw;
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

const Text = styled.div`
  font-size: 16px;
  line-height: 32px;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: #DBDBDB;
  margin: 50px 0;
  ${media.phone`
    margin: 20px 0;
  `};
`;

const MainTitleContainer = DefaultContainer.extend`
  margin-top: 80px;
`;

// 章
const Chapter = styled.div`
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 44px;
`;

// 条
const Art = styled.div`
  font-size: 22px;
  line-height: 33px;
  margin-bottom: 30px;
`;

// 項
const Para = styled.div`
  font-size: 16px;
  line-height: 32px;
`;

const ChapterContainer = (props) => {
  return (
    <div className={props.className}>
      <Chapter>{props.title}</Chapter>
      {props.children}
    </div>
  );
}

const StyledChapterContainer = styled(ChapterContainer)`
  margin-bottom: 80px;
  padding: 0 116px;
  ${media.phone`
    padding: 0 8vw;
  `};
`;

const ArtContainer = (props) => {
  return (
    <div className={props.className}>
      <Art>{props.title}</Art>
      {props.children}
    </div>
  );
}

const StyledArtContainer = styled(ArtContainer)`
  margin-bottom: 50px;
`;

export default () => (
  <Fragment>
    <MainTitleContainer>
      <MainTitle>利用規約</MainTitle>

      <Text>本利用規約（以下「本規約」といいます。）には、モノオク株式会社（以下「当社」といいます。）の提供する本サービス（第2条に定義）のご利用にあたり、利用者の皆様に遵守していただかなければならない事項及び当社と利用者の皆様との間の権利義務関係が定められております。本サービスをご利用になる方は、本規約に同意する前に、必ず全文お読み下さいますようお願い致します。</Text>

      <Hr />
    </MainTitleContainer>

    <StyledChapterContainer title="第1章　総則">

      <StyledArtContainer title="第1条 適用">
        <Para>
          1.​本規約は、本サービス（第2条に定義）の利用に関する当社と登録利用者（第2条に定義）との間の権利義務関係を定めることを目的とし、当社と登録利用者との間の本サービスの利用に関わる一切の関係に適用されます。<br />
          2.​当社が当社ウェブサイト（第2条に定義）上で随時掲載する本サービスに関するルール、諸規定等は本規約の一部を構成するものとします。
        </Para>
      </StyledArtContainer>

      <StyledArtContainer title="第2条 定義">
        <Para>
          本規約において使用する以下の用語は各々以下に定める意味を有するものとします。<br />
          (1)​「知的財産権」とは、著作権、特許権、実用新案権、商標権、意匠権その他の知的財産権（それらの権利を取得し、又はそれらの権利につき登録等を出願する権利を含みます。）を意味します。<br />
          (2)​「当社ウェブサイト」とは、そのドメインが「https://monooq.com/」である当社が運営するウェブサイト（理由の如何を問わず当社のウェブサイトのドメイン又は内容が変更された場合は、当該変更後のウェブサイトを含みます。）を意味します。<br />
          (3)​「登録希望者」とは、第3条第1項において定義された「登録希望者」を意味します。<br />
          (4)​「登録情報」とは、第3条第1項において定義された「登録情報」を意味します。<br />
          (5)​「登録利用者」とは、第3条に基づき本サービスの利用者としての登録がなされた個人又は法人を意味し、ホスト及びユーザーを含みます。<br />
          (6)​「ホスト」とは、本サービスを利用してスペースを貸し、また貸そうとする登録利用者を意味します。<br />
          (7)​「ユーザー」とは、本サービスを利用してスペースを借り、借りようとする登録利用者を意味します。<br />
          (8)​「スペース利用契約」とは、第6条第1項において定義された「スペース利用契約」を意味します。<br />
          (9)​「本サービス」とは、当社が提供するモノオクという名称のユーザー・ホスト間におけるスペース利用のプラットフォームサービス（理由の如何を問わずサービスの名称又は内容が変更された場合は、当該変更後のサービスを含みます。）を意味します。<br />
          (10)​「本サービス利用契約」とは、第3条第4項において定義された「本サービス利用契約」を意味します。<br />
          (11)​「外部SNSサービス」とは、Facebook、その他の他の事業者が提供している当社所定のソーシャル・ネットワーキング・サービスで、登録ユーザーの認証、友人関係の開示、当該外部ソーシャル・ネットワーク内へのコンテンツの公開などの機能を持ち、本サービスの実施に利用されるサービスを意味します。<br />
          (12)​「外部SNS事業者」とは、外部SNSサービスのサービス提供者を意味します。<br />
          (13)​「外部SNS利用規約」とは、登録ユーザーと外部SNS事業者との権利関係を定める規約を意味します。
        </Para>
      </StyledArtContainer>

      <StyledArtContainer title="第3条 登録">
        <Para>
          1.​本サービスの利用を希望する者（以下「登録希望者」といいます。）は、本規約を遵守することに同意し、かつ当社の定める一定の情報（以下「登録情報」といいます。）を当社の定める方法で当社に提供することにより、当社に対し、本サービスの利用の登録を申請することができます。<br />
          2.​登録の申請は必ず本サービスを利用する個人又は法人自身が行わなければならず、原則として代理人による登録申請は認められません。また、登録希望者は、登録の申請にあたり、真実、正確かつ最新の情報を当社に提供しなければなりません。<br />
          3.​当社は、第1項に基づき登録を申請した者が、以下の各号のいずれかの事由に該当する場合は、登録を拒否することがあります。<br />
          (1)​本規約に違反するおそれがあると当社が判断した場合<br />
          (2)​当社に提供された登録情報の全部又は一部につき虚偽、誤記又は記載漏れがあった場合<br />
          (3)​過去に本サービスの利用の登録を取り消された者である場合<br />
          (4)​未成年者、成年被後見人、被保佐人又は被補助人のいずれかであり、法定代理人、後見人､保佐人又は補助人の同意等を得ていなかった場合<br />
          (5)​反社会的勢力等（暴力団、暴力団員、右翼団体、反社会的勢力、その他これに準ずる者を意味します。以下同じ。）である、又は資金提供その他を通じて反社会的勢力等の維持、運営若しくは経営に協力若しくは関与する等反社会的勢力等との何らかの交流若しくは関与を行っていると当社が判断した場合<br />
          (6)​その他、当社が登録を適当でないと判断した場合<br />
          4.​当社は、前項その他当社の基準に従って、登録希望者の登録の可否を判断し、当社が登録を認める場合にはその旨を登録希望者に通知します。かかる通知により登録希望者の登録利用者としての登録は完了し、本規約の諸規定に従った本サービスの利用にかかる契約（以下「本サービス利用契約」といいます。）が登録利用者と当社の間に成立します。<br />
          5.​登録利用者は、登録情報に変更があった場合は、遅滞なく、当社の定める方法により、当該変更事項を当社に通知し、当社から要求された資料を提出するものとします。
        </Para>
      </StyledArtContainer>

    </StyledChapterContainer>

    <Footer />
  </Fragment>
);
