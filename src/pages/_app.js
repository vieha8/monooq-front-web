import wrapper from 'redux/store';
import dynamic from 'next/dynamic';
import { ConnectedRouter } from 'connected-next-router';
import Meta from 'components/LV1/Meta';
import 'semantic-ui-css/semantic.min.css';
import 'styles/reset.css';
import 'styles/globals.css';
import 'styles/main.css';
import { NextSeo } from 'next-seo';

const Root = dynamic(() => import('components/Root'), { loading: <div />});
const BaseLayout = dynamic(() => import('components/Layout'),  { loading: <div />});
const Error = dynamic(() => import('components/LV3/ErrorModal'), { loading: <div />});

function App({ Component, ...props }) {
  return (
    <ConnectedRouter>
      <Root>
        {/* <Meta /> */}
        <Error />
        <NextSeo
          openGraph={{
            type: 'website',
            locale: 'ja_JP',
            site_name: 'SiteName',
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <BaseLayout>
          <Component {...props} />
        </BaseLayout>
      </Root>
    </ConnectedRouter>
  );
}

export default wrapper.withRedux(App);
