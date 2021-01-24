import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="ja">
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="モノオクは荷物の置き場所に困っている人と余ったスペースを活用したい人をつなぐ、物置きシェアサービスです。利用シーンは引っ越し・リフォーム・出張・転勤・留学など。トランクルームを使う様に、気軽に荷物を預けるためのあたらしい仕組みです。"
          />
          <meta name="keywords" content="荷物預かり,引っ越し,物置き,シェア,保管" />
          <meta property="og:site_name" content="モノオク" />
          <meta
            property="og:description"
            content="モノオクは荷物の置き場所に困っている人と余ったスペースを活用したい人をつなぐ、物置きシェアサービスです。利用シーンは引っ越し・リフォーム・出張・転勤・留学など。トランクルームを使う様に、気軽に荷物を預けるためのあたらしい仕組みです。"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://monooq.com/" />
          <meta
            property="og:image"
            content="https://monooq.imgix.net/img%2Fogp%2Fdefault.png?alt=media&auto=compress?auto=compress"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="preload"
            as="style"
            href="https://d2j6gkx8orv8i2.cloudfront.net/css/fontawesome-all.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://d2j6gkx8orv8i2.cloudfront.net/css/fontawesome-all.min.css"
          />
          <link
            rel="preload"
            as="font"
            href="https://d2j6gkx8orv8i2.cloudfront.net/fonts/fa-light-300.woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="https://d2j6gkx8orv8i2.cloudfront.net/fonts/fa-solid-900.woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="https://d2j6gkx8orv8i2.cloudfront.net/fonts/fa-regular-400.woff2"
            crossOrigin="anonymous"
          />
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.8.1/js/regular.js"
            integrity="sha384-Uc9toywOA44owltk1MWl0lQZ+L0mBzJkLQcdif6+JtG9izvok9DLJtCZX57Uq3k2"
            crossOrigin="anonymous"
          />
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.8.1/js/fontawesome.js"
            integrity="sha384-EMmnH+Njn8umuoSMZ3Ae3bC9hDknHKOWL2e9WJD/cN6XLeAN7tr5ZQ0Hx5HDHtkS"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
