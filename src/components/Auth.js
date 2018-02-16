export default function authRequired(WrappedComponent) {
  class loginRequiredComponent extends WrappedComponent {
    componentWillMount() {
      if (!localStorage.getItem('sessionId')) {
        // ログインしていないユーザが見た時のアクションを書く
        this.props.history.push('/login');
        //TODO ログイン前に最後にアクセスしたURL保持してログイン後飛ばしたい
      }
    }

    render() {
      if (!localStorage.getItem('sessionId')) {
        // ログインしていないユーザが閲覧したらレンダリングしない
        return null;
      }
      return super.render();
    }
  }
  return loginRequiredComponent;
}
