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

const Address = styled.address`
  margin-top: 30px;
`;

const MainTitleContainer = DefaultContainer.extend`
  margin-top: 80px;
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

const ArtContainer = (props) => {
  return (
    <div className={props.className}>
      <Art>{props.title}</Art>
      {props.children}
    </div>
  );
}

const StyledArtContainer = styled(ArtContainer)`
  margin-bottom: 80px;
  padding: 0 116px;
  ${media.phone`
    padding: 0 8vw;
  `};
`;

export default () => (
  <Fragment>
    <MainTitleContainer>
      <MainTitle>プライバシーポリシー</MainTitle>
      <Text>モノオク株式会社（以下「当社」といいます。）は、個人情報保護の重要性について認識し、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）を遵守すると共に、以下のプライバシーポリシー（以下「本プライバシーポリシー」といいます。）に従い、適切な取扱い及び保護に努めます。なお、本プライバシーポリシーにおいて別段の定めがない限り、本プライバシーポリシーにおける用語の定義は、個人情報保護法の定めに従います。</Text>

      <Hr />
    </MainTitleContainer>

    <StyledArtContainer title="1. 個人情報の定義">
      <Para>
        本プライバシーポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義される個人情報を意味するものとします。
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="2. 個人情報の利用目的">
      <Para>
        当社は、個人情報を以下の目的で利用いたします。<br />
        <br />
        (1)当社のサービスの提供のため<br />
        (2)当社のサービスに関するご案内、お問い合せ等への対応のため<br />
        (3)当社の商品、サービス等のご案内のため<br />
        (4)当社のサービスに関する当社の規約、ポリシー等（以下「規約等」といいます。）に違反する行為に対する対応のため<br />
        (5)当社のサービスに関する規約等の変更などを通知するため<br />
        (6)当社のサービスの改善、新サービスの開発等に役立てるため<br />
        (7)雇用管理、社内手続のため（役職員の個人情報について）<br />
        (8)株主管理、会社法その他法令上の手続対応のため（株主、新株予約権者等の個人情報について）<br />
        (9)当社のサービスに関連して、個人を識別できない形式に加工した統計データを作成するため<br />
        (10)その他、上記利用目的に付随する目的のため
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="3. 個人情報利用目的の変更">
      <Para>
        当社は、個人情報の利用目的を関連性を有すると合理的に認められる範囲内において変更することがあり、変更した場合には個人情報の主体である個人（以下「本人」といいます。）に通知し又は公表します。
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="4. 個人情報利用の制限">
      <Para>
        当社は、個人情報保護法その他の法令により許容される場合を除き、本人の同意を得ず、利用目的の達成に必要な範囲を超えて個人情報を取り扱いません。但し、次の場合はこの限りではありません。<br />
        (1) 法令に基づく場合<br />
        (2) 人の生命、身体又は財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき<br />
        (3) 公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき<br />
        (4) 国の機関もしくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="5. 個人情報の適正な取得">
      <Para>
        5.1 当社は、適正に個人情報を取得し、偽りその他不正の手段により取得しません。<br />
        5.2 当社は、次の場合を除き、あらかじめ本人の同意を得ないで、要配慮個人情報（個人情報保護法第2条第3項に定義されるものを意味します。）を取得しません。<br />
        (1)第4項各号のいずれかに該当する場合<br />
        (2)当該要配慮個人情報が、本人、国の機関、地方公共団体、個人情報保護法第76条第1項各号に掲げる者その他個人情報保護委員会規則で定める者により公開されている場合 <br />
        (3)本人を目視し、又は撮影することにより、その外形上明らかな要配慮個人情報を取得する場合<br />
        (4)第7.1項但書によって第三者提供にあたらないものとされる態様にて要配慮個人情報の提供を受けるとき<br />
        5.3 当社は、第三者から個人情報の提供を受けるに際しては、個人情報保護委員会規則で定めるところにより、次に掲げる事項の確認を行います。ただし、当該個人情報の提供が第4項各号のいずれかに該当する場合又は第7.1項但書によって第三者提供にあたらないものとされる態様でなされる場合を除きます。<br />
        (1) 当該第三者の氏名又は名称及び住所、並びに法人の場合はその代表者（法人でない団体で代表者又は管理人の定めのあるものの場合は、その代表者又は管理人）の氏名<br />
        (2)当該第三者による当該個人情報の取得の経緯
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="6. 個人情報の安全管理">
      <Para>
        当社は、個人情報の紛失、破壊、改ざん及び漏洩などのリスクに対して、個人情報の安全管理が図られるよう、当社の従業員に対し、必要かつ適切な監督を行います。また、当社は、個人情報の取扱いの全部又は一部を委託する場合は、委託先において個人情報の安全管理が図られるよう、必要かつ適切な監督を行います。
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="7. 第三者提供">
      <Para>
        7.1 当社は、第4項各号のいずれかに該当する場合を除くほか、あらかじめ本人の同意を得ないで、個人情報を第三者に提供しません。但し、次に掲げる場合は上記に定める第三者への提供には該当しません。<br />
        (1) 利用目的の達成に必要な範囲内において個人情報の取扱いの全部又は一部を委託することに伴って個人情報を提供する場合<br />
        (2) 合併その他の事由による事業の承継に伴って個人情報が提供される場合<br />
        7.2 第7.1項の定めにかかわらず、当社は、第4項各号のいずれかに該当する場合を除くほか、外国（個人情報保護法第24条に基づき個人情報保護委員会規則で指定される国を除きます。）にある第三者（個人情報保護法第24条に基づき個人情報保護委員会規則で指定される基準に適合する体制を整備している者を除きます。）に個人情報を提供する場合には、あらかじめ外国にある第三者への提供を認める旨の本人の同意を得るものとします。<br />
        7.3 当社は、個人情報を第三者に提供したときは、個人情報保護法第25条に従い、記録の作成及び保存を行います。<br />
        7.4 当社は、第三者から個人情報の提供を受ける場合には、個人情報保護法第26条に従い、必要な確認を行い、当該確認にかかる記録の作成及び保存を行うものとします。
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="8. 個人情報の開示">
      <Para>
        当社は、本人から、個人情報保護法の定めに基づき個人情報の開示を求められたときは、本人ご自身からのご請求であることを確認の上で、本人に対し、遅滞なく開示を行います（当該個人情報が存在しないときにはその旨を通知いたします。）。但し、個人情報保護法その他の法令により、当社が開示の義務を負わない場合は、この限りではありません。
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="9. 個人情報の訂正等">
      <Para>
        当社は、本人から、個人情報が真実でないという理由によって、個人情報保護法の定めに基づきその内容の訂正、追加又は削除（以下「訂正等」といいます。）を求められた場合には、本人ご自身からのご請求であることを確認の上で、利用目的の達成に必要な範囲内において、遅滞なく必要な調査を行い、その結果に基づき、個人情報の内容の訂正等を行い、その旨を本人に通知します（訂正等を行わない旨の決定をしたときは、本人に対しその旨を通知いたします。）。但し、個人情報保護法その他の法令により、当社が訂正等の義務を負わない場合は、この限りではありません。
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="10. 個人情報の利用停止等">
      <Para>
        当社は、本人から、本人の個人情報が、あらかじめ公表された利用目的の範囲を超えて取り扱われているという理由又は偽りその他不正の手段により取得されたものであるという理由により、個人情報保護法の定めに基づきその利用の停止又は消去（以下「利用停止等」といいます。）を求められた場合、又は個人情報がご本人の同意なく第三者に提供されているという理由により、個人情報保護法の定めに基づきその提供の停止（以下「提供停止」といいます。）を求められた場合において、そのご請求に理由があることが判明した場合には、本人ご自身からのご請求であることを確認の上で、遅滞なく個人情報の利用停止等又は提供停止を行い、その旨を本人に通知します。但し、個人情報保護法その他の法令により、当社が利用停止等又は提供停止の義務を負わない場合は、この限りではありません。
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="11. Cookie（クッキー）その他の技術の利用">
      <Para>
        当社サービスは、Cookie及びこれに類する技術を利用することがあります。これらの技術は、当社による当社サービスの利用状況等の把握に役立ち、サービス向上に資するものです。Cookieを無効化されたいユーザーは、ウェブブラウザの設定を変更することによりCookieを無効化することができます。但し、Cookieを無効化すると、当社サービスの一部の機能をご利用いただけなくなる場合があります。
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="12. お問い合わせ">
      <Para>
        開示等のお申出、ご意見、ご質問、苦情のお申出その他個人情報の取扱いに関するお問い合わせは、下記の窓口までお願い致します。

        <Address>
          〒106-0044<br />
          東京都港区東麻布1-29-9<br />
          モノオク株式会社 個人情報担当者宛
        </Address>
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="13. 継続的改善">
      <Para>
        当社は、個人情報の取扱いに関する運用状況を適宜見直し、継続的な改善に努めるものとし、必要に応じて、本プライバシーポリシーを変更することがあります。
      </Para>
    </StyledArtContainer>

    <Footer />
  </Fragment>
);
