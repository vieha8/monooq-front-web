// @flow

import React from 'react';
import { Helmet } from 'react-helmet';

type PropTypes = {
  title: string,
  description: string,
  keyword: string,
};

class Head extends React.Component {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      siteName: 'モノオク',
      baseUrl: 'https://monooq.com',
      title: props.title || 'モノオク｜荷物の困ったを解決する、あたらしい物置きのかたち',
      description:
        props.description ||
        'モノオクは荷物の置き場所に困っている人と余ったスペースを活用したい人をつなぐ、物置きシェアサービスです。利用シーンは引っ越し・リフォーム・出張・転勤・留学など。トランクルームを使う様に、気軽に荷物を預けるためのあたらしい仕組みです。',
      keyword: props.keyword || '荷物預かり,引越し,荷物預かり 引っ越し,物置き,シェア',
    };
  }

  render() {
    const { siteName, baseUrl, title, description, keyword } = this.state;
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <link rel="canonical" href={baseUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
      </Helmet>
    );
  }
}

export default Head;
