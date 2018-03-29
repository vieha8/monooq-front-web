import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Footer, DefaultContainer } from 'components/Shared';

const MainTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  ${media.phone`
    font-size: 1.5em;
    line-height: 1.5em;
  `};
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 32px;
`;

const MainTitleContainer = DefaultContainer.extend`
  margin-top: 80px;
  margin-bottom: 44px;
  ${media.phone`
    margin-top: 40px;
    margin-bottom: 20px;
  `};
`;

const DetailContainer = DefaultContainer.extend`
  margin-bottom: 50px;
`;

const DetailContent = (props) => {
  const Header = styled.div`
    width: 150px;
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

const StyledDetailContent = styled(DetailContent) `
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  line-height: 50px;
  font-size: 16px;
  border-bottom: 1px solid #DBDBDB;
`;

const InterviewContainer = DefaultContainer.extend`
  margin-bottom: 50px;
`;

const Anchor = styled.a`
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const NewsContainer = DefaultContainer.extend`
  margin-bottom: 80px;
`;

const NewsContent = (props) => {
  const Date = styled.span`
    margin-right: 8px;
  `;
  const Label = styled.span`
    color: #E85258;
    font-weight: bold;
  `;
  const LabelContainer = styled.div`
    font-size: 14px;
    line-height: 28px;
  `;

  const text = props.link ? (
    <a href={props.link} target="_blank">
      <Text>{props.text}</Text>
    </a>
  ) : (<Text>{props.text}</Text>);
  return (
    <div className={props.className}>
      <LabelContainer>
        <Date>{props.date}</Date>
        <Label>{props.label}</Label>
      </LabelContainer>
      {text}
    </div>
  );
};

const StyledNewsContent = styled(NewsContent) `
  width: 100%;
  border-bottom: 1px solid #DBDBDB;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const news = [
  '2018/03/26,個人間の物置きシェアサービス「モノオク」をフルリニューアルしました。,プレスリリース,https://prtimes.jp/main/html/rd/p/000000014.000024093.html',
  '2018/03/22,トーマツ ベンチャーサポート株式会社・野村證券株式会社が共同主催を行っている「Morning Pitch 03/22開催 第230回 物流特集」にて登壇いたしました。,登壇,http://morningpitch.com/theme/12491/',
  '2018/03/19,東洋経済に取り上げていただきました,メディア掲載,http://toyokeizai.net/articles/-/212985',
  '2018/02/25,SBアフタースクールで登壇いたしました,登壇,',
  '2018/02/19,DIME4月号に取り上げていただきました,メディア掲載,',
  '2018/02/05,リフォーム産業新聞に取り上げていただきました,メディア掲載,http://www.reform-online.jp/news/reform-shop/12934.php',
  '2018/01/23,月刊「からだにいいこと2月号」に取り上げていただきました,メディア掲載,',
  '2018/01/18,月刊「家主と地主」に12月7日の登壇の様子を取り上げていただきました,メディア掲載,',
  '2017/12/27,(元)病院にオフィスをお借りしました。,プレスリリース,https://prtimes.jp/main/html/rd/p/000000013.000024093.html',
  '2017/12/18,週間ビル経営にPickgoとの取り組みを取り上げていただきました,メディア掲載,',
  '2017/12/07,シェアリングエコノミーについて登壇いたしました,登壇,',
  '2017/11/16,TechCrunch tokyo 2017 スタートアップバトルにて登壇いたしました,登壇,https://jp.techcrunch.com/2017/11/17/the-winner-of-tctokyo2017-startupbattle/',
  '2017/11/10,スマホ一台旅のスポンサーになりました,プレスリリース,http://www.dreamnews.jp/press/0000163418/',
  '2017/11/09,Pickgoとの提携に関してLogisticsTodayに取り上げていただきました,メディア掲載,https://www.logi-today.com/303383',
  '2017/11/06,Pickgoと提携しサービス上で配送が可能になりました。,プレスリリース,https://prtimes.jp/main/html/rd/p/000000009.000024093.html',
  '2017/10/13,リサイクル通信に取り上げていただきました。,メディア掲載,http://www.recycle-tsushin.com/news/detail_2124.php',
  '2017/10/11,テレビ東京【モーニングサテライト】に取り上げていただきました。,メディア掲載,http://www.tv-tokyo.co.jp/nms/',
  '2017/10/05,第19回不動産ソリューションフェアに出展いたします。,告知,',
  '2017/09/25,健美家に取り上げていただきました,メディア掲載,https://www.kenbiya.com/news/8123.html',
  '2017/09/19,TechCrunchに取り上げていただきました,メディア掲載,https://jp.techcrunch.com/2017/09/15/trunkroom-sharing-monooq-launch/',
  '2017/09/19,Cnetに取り上げていただきました,メディア掲載,https://japan.cnet.com/article/35107225/',
  '2017/09/15,全国賃貸住宅新聞に実際のmonooQご利用の声を取り上げていただきました,メディア掲載,',
  '2017/09/15,monooQでひと月からの長期保管ができるモノ置きのシェアリングエコノミーサービスを正式に開始しました。,プレスリリース,https://prtimes.jp/main/action.php?run=html&page=releasedetail&company_id=24093&release_id=7&owner=1',
  '2017/09/07,テレビ東京【ゆうがたサテライト】にて取り上げていただきました,メディア掲載,http://www.tv-tokyo.co.jp/you/',
  '2017/09/01,Techwaveに取り上げていただきました,メディア掲載,https://techwave.jp/archives/collaboration-monooq-and-spacer.html',
  '2017/08/31,格安電子ロッカーSPACERと提携。ベータでのテスト運用を開始しました。,プレスリリース,https://prtimes.jp/main/html/rd/p/000000005.000024093.html',
  '2017/08/25,初期投資を抑えた空き家活用法を探る！！にて登壇内容を民泊大学に記事にしていただきました。,メディア掲載,https://minpaku-univ.com/news/5560/',
  '2017/08/22,Tokyo FM Blue oceanで紹介されました,メディア掲載,',
  '2017/08/14,全国賃貸住宅新聞に取り上げていただきました,メディア掲載,http://www.zenchin.com/news/2017/08/post-3452.php',
  '2017/08/08,個人間の荷物預かり『monooQ』で長期預かりサービスをベータで開始しました。,プレスリリース,https://www.value-press.com/pressrelease/187682',
  '2017/08/07,週間ビル経営にmonooQを取り上げていただきました。,メディア掲載,',
];

export default () => (
  <Fragment>
    <MainTitleContainer>
      <MainTitle>会社概要</MainTitle>
    </MainTitleContainer>

    <DetailContainer>
      {[
        {
          header: '会社名',
          data: 'モノオク株式会社',
        },
        {
          header: '事業内容',
          data: '個人間の物置きシェアサービス「モノオク」の企画・開発・運用',
        },
        {
          header: '設立',
          data: '2015年4月16日',
        },
        {
          header: '資本金',
          data: '1,000万円',
        },
        {
          header: '代表者',
          data: '阿部 祐一',
        },
        {
          header: '所在地',
          data: '〒166-0003 東京都杉並区高円寺南 2-48-12 1F',
        },
        {
          header: 'TEL',
          data: '03-6869-2729',
        },
        {
          header: 'MAIL',
          data: 'info@monooq.com',
        },
        {
          header: 'WEB',
          data: <a href={Path.top()}>https://monooq.com/</a>,
        },
      ].map((v, i) => (
        <StyledDetailContent
          key={i}
          header={v.header}
          data={v.data}
        />
      ))}
    </DetailContainer>

    <MainTitleContainer>
      <MainTitle>取材に関するお問い合わせ</MainTitle>
    </MainTitleContainer>

    <InterviewContainer>
      <Text>新聞・雑誌・メディアなどの取材、その他お問い合わせに関しましては下記メールアドレスまでご連絡ください。</Text>
      <Text><Anchor href="mailto:info@monooq.com">info@monooq.com</Anchor></Text>
    </InterviewContainer>

    <MainTitleContainer>
      <MainTitle>お知らせ</MainTitle>
    </MainTitleContainer>

    <NewsContainer>
      {news.map((v, i) => {
        const item = v.split(',');
        return (
          <StyledNewsContent
            key={i}
            date={item[0]}
            text={item[1]}
            label={item[2]}
            link={item[3]}
          />
        );
      })}
    </NewsContainer>

    <Footer />
  </Fragment>
);
