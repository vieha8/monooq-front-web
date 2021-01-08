import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Nextjs</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
