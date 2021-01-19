import 'core-js/stable';
import 'regenerator-runtime/runtime';
import wrapper from 'redux/store';
import dynamic from 'next/dynamic';
import 'semantic-ui-css/semantic.min.css';
import 'styles/globals.css';
import 'styles/main.css';

const Root = dynamic(() => import('components/Root'));
const BaseLayout = dynamic(() => import('components/Layout'));

function App({ Component, ...props }) {
  return (
    <Root>
      <BaseLayout>
        <Component {...props} />
      </BaseLayout>
    </Root>
  );
}

export default wrapper.withRedux(App);
