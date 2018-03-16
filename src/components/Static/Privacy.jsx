import React, { Fragment } from 'react';
import Path from 'config/path';

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
      <Text>株式会社モノオク株式会社（以下「当社」といいます。）は、個人情報保護の重要性について認識し、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）を遵守すると共に、以下のプライバシーポリシー（以下「本プライバシーポリシー」といいます。）に従い、適切な取扱い及び保護に努めます。なお、本プライバシーポリシーにおいて別段の定めがない限り、本プライバシーポリシーにおける用語の定義は、個人情報保護法の定めに従います。</Text>

      <Hr />
    </MainTitleContainer>

    <StyledArtContainer title="1. 個人情報の定義">
      <Para>
        本プライバシーポリシーにおいて、個人情報とは、個人情報保護法第 2 条第 1 項により定義される個人情報を意味するものとします。
      </Para>
    </StyledArtContainer>

    <StyledArtContainer title="2. 個人情報の利用目的">
      <Para>
        当社は、個人情報を以下の目的で利用いたします。<br />
        (1) テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。<br />
        (2) テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。<br />
        (3)テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
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

    <Footer />
  </Fragment>
);
