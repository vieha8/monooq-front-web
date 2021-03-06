import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class AppDocument extends Document {
  render() {
    // return(
    //   <html>
    //     <body>
    //       <Main />
    //       <NextScript />
    //     </body>
    //   </html>
    // )
    return (
      <Html lang="ja">
        <Head>
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
          {/* <link
            rel="preload"
            as="style"
            href="/css/fontawesome-all.min.css"
          /> */}
          <link
            rel="stylesheet"
            type="text/css"
            href="/css/fontawesome.min.css"
            disabled
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/fa-light-300.woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/fa-solid-900.woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/fa-regular-400.woff2"
            crossOrigin="anonymous"
          />
          {/* <script
            defer
            src="/js/regular.js"
            integrity="sha384-Uc9toywOA44owltk1MWl0lQZ+L0mBzJkLQcdif6+JtG9izvok9DLJtCZX57Uq3k2"
            crossOrigin="anonymous"
          />
          <script
            defer
            src="/js/fontawesome.js"
            integrity="sha384-EMmnH+Njn8umuoSMZ3Ae3bC9hDknHKOWL2e9WJD/cN6XLeAN7tr5ZQ0Hx5HDHtkS"
            crossOrigin="anonymous"
          /> */}
            <title>Test title, up point please. :D.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Meta description content goes here.  Hihihihihihihihihihihihihihihiih.." />
        <meta http-equiv = "content-language" content = "ja"></meta>
        <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript 
          />
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
