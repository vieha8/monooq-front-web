import * as React from 'react';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import 'styles/globals.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>モノオク｜荷物の困ったを解決する、あたらしい物置きのかたち</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
