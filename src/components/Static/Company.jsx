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
}

const StyledDetailContent = styled(DetailContent)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  line-height: 50px;
  font-size: 16px;
  border-bottom: 1px solid #DBDBDB;
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
  return (
    <div className={props.className}>
      <LabelContainer>
        <Date>{props.date}</Date>
        <Label>{props.label}</Label>
      </LabelContainer>
      <Text>{props.text}</Text>
    </div>
  );
}

const StyledNewsContent = styled(NewsContent)`
  width: 100%;
  border-bottom: 1px solid #DBDBDB;
  padding: 20px 0;
`;

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
      ].map((v,i)=>{
        return (
          <StyledDetailContent
            key={i}
            header={v.header}
            data={v.data}
          />
        );
      })}
    </DetailContainer>

    <MainTitleContainer>
      <MainTitle>お知らせ</MainTitle>
    </MainTitleContainer>

    <NewsContainer>
      {[
        {
          date: '2018/03/26',
          label: 'お知らせ',
          text: '個人間の物置きシェアサービス「モノオク」をフルリニューアルしました。',
        },
        {
          date: '2018/03/22',
          label: '登壇',
          text: 'トーマツ ベンチャーサポート株式会社・野村證券株式会社が共同主催を行っている「Morning Pitch 03/22開催 第230回 物流特集」にて登壇いたしました。',
        },
        {
          date: '2018/02/19',
          label: 'メディア掲載',
          text: 'DIME4月号に取り上げていただきました。',
        },
        {
          date: '2018/01/23',
          label: 'メディア掲載',
          text: '月刊「からだにいいこと2月号」に取り上げていただきました。',
        },
        {
          date: '2018/01/18',
          label: 'メディア掲載',
          text: '月刊「家主と地主」に12月7日の登壇の様子を取り上げていただきました。',
        },
        {
          date: '2017/12/27',
          label: 'プレスリリース',
          text: '(元)病院にオフィスをお借りしました。',
        },
        {
          date: '2017/12/18',
          label: 'メディア掲載',
          text: '週間ビル経営にPickgoとの取り組みを取り上げていただきました。',
        },
        {
          date: '2017/12/07',
          label: 'メディア掲載',
          text: 'シェアリングエコノミーについて登壇いたしました。',
        },
        {
          date: '2017/11/16',
          label: '登壇',
          text: 'TechCrunch tokyo 2017 スタートアップバトルにて登壇いたしました。',
        },
        {
          date: '2017/11/10',
          label: 'プレスリリース',
          text: 'スマホ一台旅のスポンサーになりました。',
        },
      ].map((v,i)=>{
        return (
          <StyledNewsContent
            key={i}
            date={v.date}
            label={v.label}
            text={v.text}
          />
        );
      })}
    </NewsContainer>

    <Footer />
  </Fragment>
);
