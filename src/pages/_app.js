import wrapper from 'redux/store';
import dynamic from 'next/dynamic';
import { ConnectedRouter } from 'connected-next-router';
import 'semantic-ui-css/semantic.min.css';
import 'styles/reset.css';
import 'styles/globals.css';
import 'styles/main.css';

const Root = dynamic(() => import('components/Root'));

function App({ Component, ...props }) {
  return (
    <ConnectedRouter>
      <Root>
        <Component {...props} />
      </Root>
    </ConnectedRouter>
  );
}

export default wrapper.withRedux(App);
