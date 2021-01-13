import React from 'react';
import { Helmet } from 'react-helmet';

const DEFAULT_SITE_TITLE = 'モノオク｜荷物の困ったを解決する、あたらしい物置きのかたち';
const DEFAULT_DESCRIPTION =
  'モノオクは荷物の置き場所に困っている人と余ったスペースを活用したい人をつなぐ、物置きシェアサービスです。利用シーンは引っ越し・リフォーム・出張・転勤・留学など。トランクルームを使う様に、気軽に荷物を預けるためのあたらしい仕組みです。';

class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: 'モノオク',
      title: props.title || DEFAULT_SITE_TITLE,
      description: props.description || DEFAULT_DESCRIPTION,
      keyword: props.keyword || '荷物預かり,引っ越し,物置き,シェア,保管',
      noindex: props.noindex,
      jsonLd: props.jsonLd,
      ogUrl: `https://monooq.com/${props.ogUrl || ''}`,
      ogImageUrl:
        props.ogImageUrl ||
        'https://monooq.imgix.net/img%2Fogp%2Fdefault.png?alt=media&auto=compress?auto=compress',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { title, description, ogUrl, ogImageUrl } = nextProps;
    if (title && title !== '') {
      return { title, description, ogUrl, ogImageUrl };
    }
    return null;
  }

  render() {
    const {
      siteName,
      title,
      description,
      keyword,
      ogUrl,
      ogImageUrl,
      noindex,
      jsonLd,
    } = this.state;
    const path = window.location.pathname;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        {noindex && <meta name="robots" content="noindex" />}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://monooq.com${path}`} />
        {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      </Helmet>
    );
  }
}

export default Head;
