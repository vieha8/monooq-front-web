import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
}
