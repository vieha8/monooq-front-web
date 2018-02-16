import { checkLogin } from '../libs/auth';

export default function authRequired(WrappedComponent) {
  class loginRequiredComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      this.state = {
        isLogin: false,
      };
    }

    componentWillMount = async () => {
      const isLogin = await checkLogin();
      this.setState({ isLogin: isLogin });
      if (!isLogin) {
        // ログインしていないユーザが見た時のアクションを書く
        this.props.history.push('/login');
        //TODO ログイン前に最後にアクセスしたURL保持してログイン後飛ばしたい
      }
    };

    render() {
      if (!this.state.isLogin) {
        // ログインしていないユーザが閲覧したらレンダリングしない
        return null;
      }
      return super.render();
    }
  }
  return loginRequiredComponent;
}
