import wrapper from 'redux/store';
import dynamic from 'next/dynamic';
import { ConnectedRouter } from 'connected-next-router';
import 'styles/reset.css';
import 'semantic-ui-css/semantic.min.css';
import 'styles/globals.css';
import 'styles/main.css';

const Root = dynamic(() => import('components/Root'));
const BaseLayout = dynamic(() => import('components/Layout'));

function App({ Component, ...props }) {
  return (
    <ConnectedRouter>
      <Root>
        <BaseLayout>
          <Component {...props} />
        </BaseLayout>
      </Root>
    </ConnectedRouter>
  );
}

export default wrapper.withRedux(App);
