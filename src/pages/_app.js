import wrapper from 'redux/store';
import dynamic from 'next/dynamic';
import { ConnectedRouter } from 'connected-next-router';
import Meta from 'components/LV1/Meta';
import 'semantic-ui-css/semantic.min.css';
import 'styles/reset.css';
import 'styles/globals.css';
import 'styles/main.css';

const Root = dynamic(() => import('components/Root'), {ssr: false});
const BaseLayout = dynamic(() => import('components/Layout'),  { ssr: false });
const Error = dynamic(() => import('components/LV3/ErrorModal'), { ssr: false});

function App({ Component, ...props }) {
  return (
    <ConnectedRouter>
      <Root>
        <Meta />
        <Error />
        <BaseLayout>
          <Component {...props} />
        </BaseLayout>
      </Root>
    </ConnectedRouter>
  );
}

export default wrapper.withRedux(App);
