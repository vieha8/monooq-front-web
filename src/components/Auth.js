import { isLogin } from '../libs/auth';

export default function authRequired(WrappedComponent) {
  class loginRequiredComponent extends WrappedComponent {
    componentWillMount() {
      if (!isLogin()) {
        // ログインしていないユーザが見た時のアクションを書く
        this.props.history.push('/login');
        //TODO ログイン前に最後にアクセスしたURL保持してログイン後飛ばしたい
      }
    }

    render() {
      if (!isLogin()) {
        // ログインしていないユーザが閲覧したらレンダリングしない
        return null;
      }
      return super.render();
    }
  }
  return loginRequiredComponent;
}
