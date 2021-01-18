import 'core-js/stable';
import 'regenerator-runtime/runtime';
import wrapper from 'redux/store';
import BaseLayout from 'components/Layout';
import 'semantic-ui-css/semantic.min.css';
import 'styles/globals.css';
import 'styles/main.css';

function App({ Component, ...props }) {
  return (
    <BaseLayout>
      <Component {...props} />
    </BaseLayout>
  );
}

export default wrapper.withRedux(App);
