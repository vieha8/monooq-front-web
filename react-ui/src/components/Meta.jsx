// @flow

import React from 'react';
import { Helmet } from 'react-helmet';

type PropTypes = {
  title: string,
  description: string,
  keyword: string,
  ogUrl: string,
  ogImageUrl: string,
};

class Head extends React.Component {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      siteName: 'モノオク',
      title: props.title || 'モノオク｜荷物の困ったを解決する、あたらしい物置きのかたち',
      description:
        props.description ||
        'モノオクは荷物の置き場所に困っている人と余ったスペースを活用したい人をつなぐ、物置きシェアサービスです。利用シーンは引っ越し・リフォーム・出張・転勤・留学など。トランクルームを使う様に、気軽に荷物を預けるためのあたらしい仕組みです。',
      keyword: props.keyword || '荷物預かり,引越し,荷物預かり 引っ越し,物置き,シェア',
      ogUrl: `https://monooq.com/${props.ogUrl || ''}`,
      ogImageUrl:
        props.ogImageUrl ||
        'https://firebasestorage.googleapis.com/v0/b/monooq-prod.appspot.com/o/img%2Fogp%2Fdefault.png?alt=media&token=8c810b60-d284-4235-8f51-a73a03d9d089',
    };
  }

  render() {
    const { siteName, title, description, keyword, ogUrl, ogImageUrl } = this.state;
    const path = window.location.pathname;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://monooq.com${path}`} />
      </Helmet>
    );
  }
}

export default Head;
