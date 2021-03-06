import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Link from 'next/link';
import Path from 'config/path';
import { Dimens, FontSizes, Colors } from 'variables';
import PageDefault from 'components/LV1/PageDefault';
import ArtContainer from 'components/LV2/Texts/ArtStatic';
import MainTitleWrap from 'components/LV2/Texts/MainTitleStatic';

const LinkText = styled(Link)`
  color: ${Colors.linkBlue};
`;

const Chapter = styled.div`
  font-size: ${FontSizes.medium3}px;
  line-height: ${FontSizes.large}px;
  margin: ${Dimens.medium3_44}px auto;
  ${media.phone`
    font-size: ${FontSizes.medium2_26}px;
    margin: ${Dimens.medium3_44}px auto ${Dimens.medium1}px;
  `};
`;

const ChapterContainer = props => {
  const { title, children } = props;
  return (
    <div>
      <Chapter>{title}</Chapter>
      {children}
    </div>
  );
};

const ChapterWrap = styled(ChapterContainer)`
  margin-bottom: ${Dimens.large2}px;
`;

export default () => (
  <PageDefault>
    <MainTitleWrap
      mainTitle="利用規約"
      text="本利用規約（以下「本規約」といいます。）には、モノオク株式会社（以下「当社」といいます。）の提供する本サービス（第2条に定義）のご利用にあたり、利用者の皆様に遵守していただかなければならない事項及び当社と利用者の皆様との間の権利義務関係が定められております。本サービスをご利用になる方は、本規約に同意する前に、必ず全文お読み下さいますようお願い致します。"
      isHr
    />

    <ChapterWrap title="第1章　総則">
      <ArtContainer
        title="第1条 適用"
        paraList={[
          '1.本規約は、本サービス（第2条に定義）の利用に関する当社と登録利用者（第2条に定義）との間の権利義務関係を定めることを目的とし、当社と登録利用者との間の本サービスの利用に関わる一切の関係に適用されます。',
          '2.当社が当社ウェブサイト（第2条に定義）上で随時掲載する本サービスに関するルール、諸規定等は本規約の一部を構成するものとします。',
        ]}
      />
      <ArtContainer
        title="第2条 定義"
        paraList={[
          '本規約において使用する以下の用語は各々以下に定める意味を有するものとします。',
          '(1)「知的財産権」とは、著作権、特許権、実用新案権、商標権、意匠権その他の知的財産権（それらの権利を取得し、又はそれらの権利につき登録等を出願する権利を含みます。）を意味します。',
          '(2)​「当社ウェブサイト」とは、そのドメインが「https://monooq.com/」である当社が運営するウェブサイト（理由の如何を問わず当社のウェブサイトのドメイン又は内容が変更された場合は、当該変更後のウェブサイトを含みます。）を意味します。',
          '(3)「登録希望者」とは、第3条第1項において定義された「登録希望者」を意味します。',
          '(4)「登録情報」とは、第3条第1項において定義された「登録情報」を意味します。',
          '(5)「登録利用者」とは、第3条に基づき本サービスの利用者としての登録がなされた個人又は法人を意味し、ホスト及びゲストを含みます。',
          '(6)「ホスト」とは、本サービスを利用してスペースを貸し、また貸そうとする登録利用者を意味します。',
          '(7)「ゲスト」とは、本サービスを利用してスペースを借り、また借りようとする登録利用者を意味します。',
          '(8)「スペース利用契約」とは、第6条第1項において定義された「スペース利用契約」を意味します。',
          '(9)​「本サービス」とは、当社が提供するモノオクという名称のホスト・ゲスト間におけるスペース利用のプラットフォームサービス（理由の如何を問わずサービスの名称又は内容が変更された場合は、当該変更後のサービスを含みます。）を意味します。',
          '(10)​「本サービス利用契約」とは、第3条第4項において定義された「本サービス利用契約」を意味します。',
          '(11)​「外部SNSサービス」とは、Facebook、その他の事業者が提供している当社所定のソーシャル・ネットワーキング・サービスで、登録利用者の認証、友人関係の開示、当該外部ソーシャル・ネットワーク内へのコンテンツの公開などの機能を持ち、本サービスの実施に利用されるサービスを意味します。',
          '(12)​「外部SNS事業者」とは、外部SNSサービスのサービス提供者を意味します。',
          '(13)​「外部SNS利用規約」とは、登録利用者と外部SNS事業者との権利関係を定める規約を意味します。',
        ]}
      />
      <ArtContainer
        title="第3条 登録"
        paraList={[
          '1.​本サービスの利用を希望する者（以下「登録希望者」といいます。）は、本規約を遵守することに同意し、かつ当社の定める一定の情報（以下「登録情報」といいます。）を当社の定める方法で当社に提供することにより、当社に対し、本サービスの利用の登録を申請することができます。',
          '2.​登録の申請は必ず本サービスを利用する個人又は法人自身が行わなければならず、原則として代理人による登録申請は認められません。また、登録希望者は、登録の申請にあたり、真実、正確かつ最新の情報を当社に提供しなければなりません。',
          '3.​当社は、第1項に基づき登録を申請した者が、以下の各号のいずれかの事由に該当する場合は、登録を拒否することがあります。',
          '(1)​本規約に違反するおそれがあると当社が判断した場合',
          '(2)​当社に提供された登録情報の全部又は一部につき虚偽、誤記又は記載漏れがあった場合',
          '(3)過去に本サービスの利用の登録を取り消された者である場合',
          '(4)未成年者、成年被後見人、被保佐人又は被補助人のいずれかであり、法定代理人、成年後見人､保佐人又は補助人の同意等を得ていなかった場合',
          '(5)反社会的勢力等（暴力団、暴力団員、右翼団体、反社会的勢力、その他これに準ずる者を意味します。以下同じ。）である、又は資金提供その他を通じて反社会的勢力等の維持、運営若しくは経営に協力若しくは関与する等反社会的勢力等との何らかの交流若しくは関与を行っていると当社が判断した場合',
          '(6)その他、当社が登録を適当でないと判断した場合',
          '4.当社は、前項その他当社の基準に従って、登録希望者の登録の可否を判断し、当社が登録を認める場合にはその旨を登録希望者に通知します。かかる通知により登録希望者の登録利用者としての登録は完了し、本規約の諸規定に従った本サービスの利用にかかる契約（以下「本サービス利用契約」といいます。）が登録利用者と当社の間に成立します。',
          '5.登録利用者は、登録情報に変更があった場合は、遅滞なく、当社の定める方法により、当該変更事項を当社に通知し、当社から要求された資料を提出するものとします。',
        ]}
      />
      <ArtContainer
        title="第4条 本サービス"
        paraList={[
          '1.本サービスは、ゲストの所有物その他の物（以下「荷物」といいます。）を置くためのスペースの空き情報を掲載するためのサービスです。登録利用者は、ゲストが自らの責任においてスペースを利用して荷物を保管するものであり、第6条に定めるスペース利用契約においてホストがゲストの荷物の寄託を受けるものではないことを認識し、了承するものとします。',
          '2.登録利用者は、本サービス利用契約の有効期間中、本規約に従って、当社の定める方法に従い、ホスト及び/又ゲストとして本サービスを利用することができます。',
        ]}
      />
    </ChapterWrap>

    <ChapterWrap title="第2章　ホストに関する規定">
      <ArtContainer
        title="第5条 スペース情報の掲載"
        paraList={[
          '1.ホストは、本サービスにおいて、当社の定める方法により、ゲストが荷物を置くためのスペースの空き情報を掲載できるものとします。ホストは、スペースの空き情報を掲載するにあたり、スペースの所在場所、スペースの利用期間、スペースを利用するための料金（消費税相当額を含みます。以下「スペース利用料」といいます。）の金額その他の当社が別途定める情報を掲載するものとします。',
          '2.​ホストは、本サービスにおいてスペースに関する情報を掲載するにあたり、常に正確かつ最新の情報を掲載するものとし、また当該スペースについてゲストが荷物を置くにあたり注意すべき事情がある場合（汚れがある場合や湿度が高い場合等を含むが、これらに限られない。）にはその旨を明記するものとします。また、ホストは、本サービスにおいてスペースの空き情報の掲載を行うにあたり、特定商取引に関する法律、不当景品類及び不当表示防止法その他の適用される関係法令を遵守するものとします。',
        ]}
      />
      <ArtContainer
        title="第6条 スペースの提供等"
        paraList={[
          '1.ホストが空き情報を掲載したスペースについて、ゲストから当社の定める方法により利用の申し込みがありこれをホストが承諾した場合には、ホストとゲストとの間において、本規約、当社ウェブサイト（キャンセルポリシーを含む）及び前条に基づき掲載された事項を内容とし、ホストがゲストに対して当該スペースを貸し、ゲストが荷物を置くために当該スペースを借りる契約（以下「スペース利用契約」といいます。）が成立します。',
          '2.ホストは、ゲストに対するスペースの提供その他のスペース利用契約に基づくホストの義務を自己の責任及び費用において適切に履行するものとします。ホストは、当社がスペース利用契約の当事者となるものではないこと及び当社がスペース利用契約の内容及び履行について一切の責任を負わないことを認識し、了承するものとします。ホストがスペースの提供その他のスペース利用契約に基づく義務を履行しないことにより、当社がゲストの荷物の配送、保管その他の行為を行った場合には、当社はホストに対して当該行為に要した費用を請求できるものとします。',
          '3.ホストは、スペース利用契約に基づきゲストに貸したスペースに置かれた荷物については、ゲストの事前の同意を得ることなく、接触してはならないものとします。',
          '4.ホストは、スペース利用契約に関してゲストその他の第三者との間で紛争が生じた場合、自己の責任及び費用において、これを解決するものとします。また、当社がかかる紛争に関してゲストその他の第三者に損害賠償等の支払を余儀なくされた場合には、ホストはその金額を当社に支払うとともに、その解決のために要した弁護士費用その他一切の諸経費を当社に支払うものとします。',
        ]}
      />
      <ArtContainer
        title="第7条 ホスト手数料の支払"
        paraList={[
          '1.ホストは、ゲストとの間でスペース利用契約を締結した場合には、本サービスの利用の対価として、当該スペース利用契約のスペース利用料（消費税を含まない）の30%に相当する金額及びそれに係る消費税相当額（以下「ホスト手数料」といいます。なお、1円未満の端数が生じた場合には切り上げます。）を、当社に対して支払うものとします。',
          '2.当社は、第8条第2項の規定に基づきホストに対して支払うスペース利用料から前項に定めるホスト手数料を差し引くことにより、ホスト手数料の受領に代えることができるものとします。',
          '3.ホストとゲストとの間においてスペース利用契約が成立した後、取消し、解除その他の理由によりスペース利用契約が効力を失った場合においても、ホストは当該スペース利用契約に関するホスト手数料の支払義務を免れないものとし、当社は既に受領した当該スペース利用契約に関するホスト手数料を返還する義務を負わないものとします。',
        ]}
      />
      <ArtContainer
        title="第8条 スペース利用料の受領"
        paraList={[
          '1.ホストは、当社又は当社の指定する第三者（当社と併せて以下「代理受領者」といいます。）に対して、ゲストがスペース利用契約に基づき支払うスペース利用料を自己を代理して受領する権限を付与するものとし、代理受領者がゲストからスペース利用料を受領することにより、ゲストのホストに対するスペース利用料の支払債務は消滅するものとします。なお、ホストは、ゲストから、直接スペース利用契約に基づき、スペース利用料を受領してはなりません。',
          '2.当社は、別途当社の定める方法によりホストが支払の申請をした後、別途当社が定める一定の期間内に、前項の規定に基づきゲストから代理受領したスペース利用料から第7条2項の規定に基づきホスト手数料を差し引いた金額（以下「支払対象金額」といいます。）を、ホストに支払うものとします。但し、未払の支払対象金額の合計金額が2,400円未満（以下「最低支払金額」といいます。）の場合には、決済代行手数料その他の当社の事務コストが同金額を上回ることに鑑み、ホストは本項の支払の申請を行うことができないものとします。なお、本項の規定により支払が留保された支払対象金額に利息は生じないものとします。',
          '3.銀行振込手数料その他の支払対象金額の支払に要する金額（以下「振込手数料」といい、その具体的な金額は別途当社が定めるものとします。）は、ホストが負担するものとし、当社は支払対象金額の支払にあたり振込手数料等を差し引くことにより、振込手数料の受領に代えることができるものとします。',
          '4.第2項の規定に基づく支払対象金額の支払は、ホストから指定があり、かつ、当社が適切であると認めた口座（以下「指定口座」といいます。）に対して支払いを行うものとします。ホストが指定口座を誤って指定したことによりホストに発生した損害については、当社は一切の責任を負わないものとします。',
          '5.当社は、以下の各号に定める場合、ホストが第2項の規定による支払対象金額の支払を受領する権利を放棄したものとみなすことができます。',
          '(1)第2項に基づき当該ホストが最後に支払の申請をした日（但し当該ホストが一度も支払の申請をしていない場合には、ゲストが当該ホストのスペース利用料を当社に支払った日とします。）から、支払の申請がなされないまま（未払の支払対象金額が最低支払金額未満のため支払の申請ができない場合を含みます。次号も同じです。）、かつ、当社がホストの定める連絡先に通知したにもかかわらず、連絡が取れないまま1年を経過した場合',
          '(2)第2項に基づく支払の申請がなされないまま当該ホストとの間の本サービス利用契約が終了した場合',
        ]}
      />
    </ChapterWrap>

    <ChapterWrap title="第3章　ゲストに関する規定">
      <ArtContainer
        title="第9条 スペースの利用等"
        paraList={[
          '1.ゲストは、本サービスにおいて、当社の定める方法により、ホストに対して、ホストが空き情報を掲載したスペースの利用を申し込むことができるものとします。',
          '2.​ホストが空き情報を掲載したスペースについてゲストが利用を申し込み、これをホストが承諾した場合には、ゲストとホストの間において当該スペースのスペース利用契約が成立します。',
          '3.ゲストは、スペース利用料の支払、スペースの利用期間の遵守その他のスペース利用契約に基づくゲストの義務を自己の責任及び費用において適切に履行するものとします。ゲストは、当社がスペース利用契約の当事者となるものではないこと及び当社がスペース利用契約の内容及び履行について一切の責任を負わないことを認識し、了承するものとします。',
          '4.ゲストは、ホストとのスペース利用契約の利用期間を経過して、荷物をスペースに残置した場合、当社がホストから当該荷物を引き取った上で廃棄、第三者への譲渡その他の処分を行うことができることを認識し、了承するものとします。この場合、当社は当該荷物の処分に関してゲストに生じた損害についての責任を一切負わず、ゲストに対して当該荷物の引き取り及び処分に要した費用、事務コスト、弁護士費用並びに訴訟等の法的手続費用相当額の違約金として50万円を請求できるものとします。また当社が当該荷物の処分に関して当該荷物の所有者その他の第三者から権利侵害その他の理由により何らかの請求を受けた場合は、ゲストは自己の費用と責任において当該紛争を処理することに協力し、また当該請求に基づき当社が当該第三者に支払を余儀なくされた金額を賠償しなければなりません。',
          '5.ゲストは、スペース利用契約に関してホストその他の第三者との間で紛争が生じた場合、自己の責任及び費用において、これを解決するものとします。また、当社がかかる紛争に関してホストその他の第三者に損害賠償等の支払を余儀なくされた場合には、ゲストはその金額を当社に支払うとともに、その解決のために要した弁護士費用その他一切の諸経費を当社に支払うものとします。',
          '6.ゲストは、ホストから借りたスペースの利用にあたり、以下の行為をしてはなりません。',
          '(1)ホストとの間で定めた利用目的以外でスペースを利用する行為',
          '(2)当社が別途定める物品をスペースに置く行為',
          '(3)その他、当社が不適切であると判断した行為',
        ]}
      />
      <ArtContainer
        title="第10条 スペース利用料の支払"
        paraList={[
          'ゲストは、別途当社の定める支払期日までに、当社が別途定める方法により、スペース利用契約に基づくスペース利用料を代理受領者に対して支払うものとし、スペース利用料をホストに対して直接支払ってはならないものとします。決済にかかる手数料その他の支払に要する費用は、ゲストの負担とします。',
        ]}
      />
      <ArtContainer
        title="第11条 ゲスト手数料の支払"
        paraList={[
          '1.ゲストは、ゲストがホストとの間でスペース利用契約を締結した場合には、本サービスの利用の対価として、当該スペース利用契約のスペース利用料の（消費税を含まない）の10％に相当する金額及びそれに係る消費税相当額（以下「ゲスト手数料」といいます。なお、1円未満の端数が生じた場合には切り上げます。）を、当社に対して支払うものとします。',
          '2.ゲストは、別途当社の定める支払期日までに、当社が別途定める方法により、ゲスト手数料を当社に対して支払うものとします。決済にかかる手数料その他の支払に要する費用は、ゲストの負担とします。',
          '3.ゲストとホストとの間においてスペース利用契約が成立した後、取消し、解除その他の理由によりスペース利用契約が効力を失った場合においても、ゲストは当該スペース利用契約に関するゲスト手数料の支払義務及びホスト手数料の支払義務を免れないものとし、当社は既に受領した当該スペース利用契約に関するゲスト手数料及びホスト手数料を返還する義務を負わないものとします。',
        ]}
      />
    </ChapterWrap>

    <ChapterWrap title="第4章　その他">
      <ArtContainer
        title="第12条 個人情報等の取扱い"
        paraList={[
          <Fragment>
            1.登録利用者は、登録情報に含まれる登録利用者の個人情報（個人情報の保護に関する法律（以下「個人情報保護法」といいます。）第2条1項に定義する個人情報を意味します。）について、当社の
            <LinkText href={Path.privacy()}>
              <a>個人情報保護方針</a>
            </LinkText>
            に従って取り扱われることに同意するものとします。
          </Fragment>,
          '2.登録利用者は、スペース利用契約の締結及びその交渉に必要な範囲で、他の登録利用者に自身の氏名、メールアドレス、電話番号や住所等の登録情報（個人情報を含む）が提供されることを了承するものとします。この場合、当該情報を提供された登録利用者は個人情報保護法その他の法令に従い適切に管理するものとします。',
          '3.登録利用者は、当社が本サービスを提供するために必要な範囲で登録利用者の氏名、メールアドレス、電話番号、住所その他の登録情報（個人情報を含む）を保険会社に提供する場合があることを了承するものとします。',
          '4.当社は、本サービスを提供するにあたり知り得た情報を特定の個人を識別することができないように匿名化した上で、統計情報その他の情報として自由にこれを利用（第三者への提供を含むが、これに限られません。）することができるものとします。',
        ]}
      />
      <ArtContainer
        title="第13条 アカウント情報の管理"
        paraList={[
          '1.登録利用者は、自己の責任において、本サービスにかかるユーザーID及びパスワード（以下「アカウント情報」といいます。）を管理及び保管するものとし、これを第三者に利用させ又は、貸与、譲渡、名義変更、売買等をしてはならないものとします。',
          '2.アカウント情報の管理不十分、使用上の過誤、第三者の使用等による損害の責任は登録利用者が負うものとし、当社は一切の責任を負いません。',
          '3.登録利用者は、アカウント情報が盗まれ、又は第三者に使用されていることが判明した場合には、直ちにその旨を当社に通知するとともに、当社からの指示に従うものとします。',
        ]}
      />
      <ArtContainer
        title="第14条 禁止行為"
        paraList={[
          '1.登録利用者は、本サービスの利用にあたり、以下の各号のいずれかに該当する行為をしてはなりません。',
          '(1)当社、又は他の登録利用者、外部SNS事業者その他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利又は利益を侵害する行為（かかる侵害を直接又は間接に惹起する行為を含みます。）',
          '(2)犯罪行為に関連する行為又は公序良俗に反する行為',
          '(3)猥褻な情報又は青少年に有害な情報を送信する行為',
          '(4)異性交際に関する情報を送信する行為',
          '(5)法令又は当社若しくは登録利用者が所属する業界団体の内部規則に違反する行為',
          '(6)コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報を送信する行為',
          '(7)本サービスに関し利用しうる情報を改ざんする行為',
          '(8)当社が定める一定のデータ容量以上のデータを、本サービスを通じて送信する行為',
          '(9)当社による本サービスの運営を妨害するおそれのある行為',
          '(10)ホストがゲストに対して貸す権原を有しないスペースの情報を本サービスに掲載する行為',
          '(11)他の登録利用者との間で本サービスを利用せずに本サービス上に掲載されたスペースの利用に関する契約を締結することにより、不当に本サービスの利用対価の支払を免れる行為',
          '(12)その他、当社が不適切と判断する行為',
          '2.当社は、本サービスにおける登録利用者による情報の送信行為が前項各号のいずれかに該当し、又は該当するおそれがあると当社が判断した場合には、登録利用者に事前に通知することなく、当該情報の全部又は一部を削除することができるものとします。当社は、本項に基づき当社が行った措置に基づき登録利用者に生じた損害について一切の責任を負いません。',
          '3.本条第１項第１１号に違反し、不当に本サービスの利用対価の支払を免れた場合、当該登録利用者（ホスト及びゲスト）は、連帯して、当社に対して、同利用対価の他、違約金として金５０万円を支払わなければなりません。',
        ]}
      />
      <ArtContainer
        title="第15条 本サービスの停止等"
        paraList={[
          '1.当社は、以下のいずれかに該当する場合には、登録利用者に事前に通知することなく、本サービスの利用の全部又は一部を停止又は中断することができるものとします。',
          '(1)本サービスに係るコンピューター・システムの点検又は保守作業を定期的又は緊急に行う場合',
          '(2)コンピューター、通信回線等が事故により停止した場合',
          '(3)火災、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合',
          '(4)外部SNSサービスに、トラブル、サービス提供の中断又は停止、本サービスとの連携の停止、仕様変更等が生じた場合',
          '(5)その他、当社が停止又は中断を必要と判断した場合',
          '2.当社は、当社の都合により、本サービスの提供を終了することができます。この場合、当社は登録利用者に事前に通知するものとします。',
          '3.当社は、本条に基づき当社が行った措置に基づき登録利用者に生じた損害について、当社に故意又は重過失がない限り一切の責任を負いません。',
        ]}
      />
      <ArtContainer
        title="第16条 公租公課及び設備の負担等"
        paraList={[
          '1.登録利用者は、本サービスの利用に関する公租公課の負担及びその手続について各自の費用と責任で処理するものします。',
          '2.本サービスの提供を受けるために必要な、コンピューター、ソフトウェアその他の機器、通信回線その他の通信環境等の準備及び維持は、登録利用者の費用と責任において行うものとします。',
          '3.登録利用者は自己の本サービスの利用環境に応じて、コンピューター・ウィルスの感染の防止、不正アクセス及び情報漏洩の防止等のセキュリティ対策を自らの費用と責任において講じるものとします。',
          '4.当社は、登録利用者が送受信したメッセージその他の情報を運営上一定期間保存していた場合であっても、かかる情報を保存する義務を負うものではなく、当社はいつでもこれらの情報を削除できるものとします。なお、当社はかかる情報の削除に基づき登録利用者に生じた損害について一切の責任を負いません。',
          '5.登録利用者は、本サービスの利用開始に際し又は本サービスの利用中に、当社ウェブサイトからのダウンロードその他の方法によりソフトウェア等を登録利用者のコンピューター等にインストールする場合には、登録利用者が保有する情報の消滅若しくは改変又は機器の故障、損傷等が生じないよう十分な注意を払うものとし、当社は登録利用者に発生したかかる損害について一切責任を負わないものとします。',
        ]}
      />
      <ArtContainer
        title="第17条 権利帰属"
        paraList={[
          '1.当社ウェブサイト及び本サービスに関する所有権及び知的財産権は全て当社又は当社にライセンスを許諾している者に帰属しており、本規約に定める登録に基づく本サービスの利用許諾は、本規約において明示されているものを除き、当社ウェブサイト又は本サービスに関する当社又は当社にライセンスを許諾している者の知的財産権の譲渡又は使用許諾を意味するものではありません。登録利用者は、いかなる理由によっても当社又は当社にライセンスを許諾している者の知的財産権を侵害するおそれのある行為（逆アセンブル、逆コンパイル、リバースエンジニアリングを含みますが、これに限定されません。）をしないものとします。',
          '2.当社ウェブサイト又は本サービスにおいて、登録利用者が投稿その他送信を行った文章、画像、動画その他のデータについては、当社において、無償で自由に利用（複製、複写、改変、第三者への再許諾その他のあらゆる利用を含みます。）することができるものとします。',
        ]}
      />
      <ArtContainer
        title="第18条 登録取消等"
        paraList={[
          '1.当社は、登録利用者が、以下の各号のいずれかの事由に該当する場合は、事前に通知又は催告することなく、登録利用者について本サービスの利用を一時的に停止し、又は登録を取り消すことができます。',
          '(1)本規約のいずれかの条項に違反した場合',
          '(2)登録情報に虚偽の事実があることが判明した場合',
          '(3)当社、他の登録利用者、外部SNS事業者その他の第三者に損害を生じさせるおそれのある目的又は方法で本サービスを利用した、又は利用しようとした場合',
          '(4)外部SNS利用規約に違反したことその他の理由によって、登録利用者が外部SNS事業者から、そのサービスの提供や連携を受けられなくなった場合',
          '(5)手段の如何を問わず、本サービスの運営を妨害した場合',
          '(6)支払停止若しくは支払不能となり、又は破産手続開始、民事再生手続開始、会社更生手続開始、特別清算開始若しくはこれらに類する手続の開始の申立てがあった場合',
          '(7)自ら振出し、若しくは引受けた手形若しくは小切手につき、不渡りの処分を受けた場合、又は手形交換所の取引停止処分その他これに類する措置を受けたとき',
          '(8)差押、仮差押、仮処分、強制執行又は競売の申立てがあった場合',
          '(9)租税公課の滞納処分を受けた場合',
          '(10)死亡した場合又は後見開始、保佐開始若しくは補助開始の審判を受けた場合',
          '(11)6ヶ月以上本サービスの利用がなく、当社からの連絡に対して応答がない場合',
          '(12)第3条第3項各号に該当する場合',
          '(13)その他、当社が登録利用者としての登録の継続を適当でないと判断した場合',
          '2.前項各号のいずれかの事由に該当した場合、登録利用者は、当社に対して負っている債務の一切について当然に期限の利益を失い、直ちに当社に対して全ての債務の支払を行わなければなりません。',
          '3.当社及び登録利用者は、当社所定の方法で相手方に通知することにより、登録利用者の登録を取り消すことができます。但し、登録利用者は、当該登録利用者が締結しているスペース利用契約の有効期間中その他当社の指定する指定する期間は、登録利用者の登録を取り消すことができないものとします。',
          '4.当社は、本条に基づき当社が行った行為により登録利用者に生じた損害について一切の責任を負いません。',
          '5.本条に基づき登録利用者の登録が取り消された場合、登録利用者は、当社の指示に基づき、当社から提供を受けた本サービスに関連するソフトウェア、マニュアルその他の物につき、返還、廃棄その他の処分を行うものとします。',
        ]}
      />
      <ArtContainer
        title="第19条 保証の否認及び免責"
        paraList={[
          '1.当社は、本サービスを利用することによりスペース利用契約を締結できることを保証するものではありません。本サービスは現状有姿で提供されるものであり、当社は本サービスについて、特定の目的への適合性、商業的有用性、完全性、継続性等を含め、一切保証を致しません。',
          '2.登録利用者が当社から直接又は間接に、本サービス、当社ウェブサイト、本サービスの他の登録利用者その他の事項に関する何らかの情報を得た場合であっても、当社は登録利用者に対し本規約において規定されている内容を超えて如何なる保証も行うものではありません。',
          '3.本サービスは、外部SNSサービスと連携することがありますが、かかる連携を保証するものではなく、本サービスにおいて外部SNSサービスと連携できなかった場合でも、当社は一切の責任を負いません。',
          '4.本サービスが外部SNSサービスと連携している場合において、登録利用者は外部SNS利用規約を自己の費用と責任で遵守するものとし、登録利用者と当該外部SNSサービスを運営する外部SNS事業者との間で紛争等が生じた場合でも、当社は当該紛争等について一切の責任を負いません。',
          '5.登録利用者は、本サービスを利用することが、登録利用者に適用のある法令、業界団体の内部規則等に違反するか否かを自己の責任と費用に基づいて調査するものとし、当社は、登録利用者による本サービスの利用が、登録利用者に適用のある法令、業界団体の内部規則等に適合することを何ら保証するものではありません。',
          '6.本サービス又は当社ウェブサイトに関連して登録利用者と他の登録利用者、外部SNS事業者その他の第三者との間において生じた取引、連絡、紛争等については、登録利用者の責任において処理及び解決するものとし、当社はかかる事項について一切責任を負いません。',
          '7.当社は、当社による本サービスの提供の中断、停止、終了、利用不能又は変更、登録利用者のメッセージ又は情報の削除又は消失､登録利用者の登録の取消、本サービスの利用によるデータの消失又は機器の故障若しくは損傷、その他本サービスに関連して登録利用者が被った損害につき、賠償する責任を一切負わないものとします。',
          '8.当社ウェブサイトから他のウェブサイトへのリンク又は他のウェブサイトから当社ウェブサイトへのリンクが提供されている場合でも、当社は、当社ウェブサイト以外のウェブサイト及びそこから得られる情報に関して如何なる理由に基づいても一切の責任を負わないものとします。',
          '9.当社は、登録利用者の荷物の滅失、毀損その他の登録利用者に生じた損害に関して当社が保険に加入した場合であっても、登録利用者に生じた損害について確実に保険金が支払われることを保証するものではなく、登録利用者は、適用される保険会社の約款等に基づき、登録利用者の荷物の滅失、毀損その他の登録利用者に生じた損害が保険金の支払の対象外となる場合があることを認識し、了承するものとします。',
          '10.当社は、本サービスに関連して登録利用者が被った損害について、当社に故意又は重過失がない限り一切賠償の責任を負いません。民法、消費者契約法の適用その他の理由により当社が登録利用者に対して損害賠償責任を負う場合においても、当社の賠償責任は、損害の事由が生じた時点から遡って過去3ヶ月の期間に登録利用者から現実に受領した本サービスの利用の対価の総額を上限とします。',
        ]}
      />
      <ArtContainer
        title="第20条 登録利用者の賠償等の責任"
        paraList={[
          '1.登録利用者は、本規約に違反することにより、又は本サービスの利用に関連して当社に損害を与えた場合、当社に対しその損害を賠償しなければなりません。',
          '2.登録利用者が、本サービスに関連して他の登録利用者、外部SNS事業者その他の第三者からクレームを受け又はそれらの者との間で紛争を生じた場合には、直ちにその内容を当社に通知するとともに、登録利用者の費用と責任において当該クレーム又は紛争を処理し、当社からの要請に基づき、その経過及び結果を当社に報告するものとします。',
          '3.登録利用者による本サービスの利用に関連して、当社が、他の登録利用者、外部SNS事業者その他の第三者から権利侵害その他の理由により何らかの請求を受けた場合は、登録利用者は当該請求に基づき当社が当該第三者に支払を余儀なくされた金額を賠償しなければなりません。',
        ]}
      />
      <ArtContainer
        title="第21条 有効期間"
        paraList={[
          '本サービス利用契約は、登録利用者について第3条に基づく登録が完了した日に効力を生じ、当該登録利用者の登録が取り消された日又は本サービスの提供が終了した日のいずれか早い日まで、当社と登録利用者との間で有効に存続するものとします。',
        ]}
      />
      <ArtContainer
        title="第22条 本規約等の変更"
        paraList={[
          '1.当社は、登録利用者の事前の承諾を得ることなく、本規約（当社ウェブサイトに掲載する本サービスに関するルール、諸規定等を含みます。以下本項において同じ。）の内容を随時変更できるものとします。本規約が変更された後の本サービスの提供条件は、変更後の利用規約に従うものとします。',
          '2.当社は、前項の変更を行う場合は１４日以上の予告期間をおいて、変更後の利用規約の内容を登録利用者に通知又は当社ウェブサイト上に表示するものとします。ただし、変更が軽微で登録利用者に特段、不利益にならないと当社が判断した場合は、通知・表示しないものとします。',
          '3.登録利用者が変更後の本規約に同意できないときは、前項の予告期間中に本サービスの利用を中止することとし、予告期間後に本サービスを利用した登録利用者は、変更後の利用規約に同意したものとみなします。',
        ]}
      />
      <ArtContainer
        title="第23条 本サービス利用契約の譲渡等"
        paraList={[
          '1.登録利用者は、当社の書面による事前の承諾なく、本サービス利用契約上の地位又は本規約に基づく権利若しくは義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。',
          '2.当社は本サービスにかかる事業を第三者に譲渡（事業譲渡、会社分割その他態様の如何を問わないものとします。）した場合には、当該譲渡に伴い本サービス利用契約上の地位、本規約に基づく権利及び義務並びに登録利用者の登録情報その他の顧客情報を当該譲渡の譲受人に譲渡することができるものとし、登録利用者は、かかる譲渡につき本項において予め同意したものとします。',
        ]}
      />
      <ArtContainer
        title="第24条 完全合意"
        paraList={[
          '本規約は、本規約に含まれる事項に関する当社と登録利用者との完全な合意を構成し、口頭又は書面を問わず、本規約に含まれる事項に関する当社と登録利用者との事前の合意、表明及び了解に優先します。',
        ]}
      />
      <ArtContainer
        title="第25条 分離可能性"
        paraList={[
          '本規約のいずれかの条項又はその一部が、消費者契約法その他の法令等により無効又は執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効又は執行不能と判断された規定の残りの部分は、継続して完全に効力を有し、当社及び登録利用者は、当該無効若しくは執行不能の条項又は部分を適法とし、執行力を持たせるために必要な範囲で修正し、当該無効若しくは執行不能な条項又は部分の趣旨並びに法律的及び経済的に同等の効果を確保できるように努めるものとします。',
        ]}
      />
      <ArtContainer
        title="第26条 存続規定"
        paraList={[
          '第6条第2項及び第3項、第7条（未払がある場合）、第8条第5項、第9条第3項、第4項及び第5項、第10条（未払がある場合）、第11条（未払がある場合）、第12条、第13条第2項、第14条第2項、第15条第3項、第16条、第17条、第18条第2項、第4項及び第5項、第19条、第20条、並びに第24条から第28条までの規定は本サービス利用契約の終了後も有効に存続するものとします。',
        ]}
      />
      <ArtContainer
        title="第27条 準拠法及び管轄裁判所"
        paraList={[
          '本規約の準拠法は日本法とし、本規約に起因し又は関連する一切の紛争については、東京地方裁判所又は東京簡易裁判所を第一審の専属的合意管轄裁判所とします。',
        ]}
      />
      <ArtContainer
        title="第28条 協議解決"
        paraList={[
          '当社及び登録利用者は、本規約に定めのない事項又は本規約の解釈に疑義が生じた場合には、互いに信義誠実の原則に従って協議の上速やかに解決を図るものとします。',
        ]}
      />
    </ChapterWrap>

    <ArtContainer paraList={['【2017年3月3日制定】', '【2020年4月6日改定】']} isRight />
  </PageDefault>
);
