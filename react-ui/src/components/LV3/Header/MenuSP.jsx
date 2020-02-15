import React, { Component } from 'react';
import { connect } from 'react-redux';
import BurgerMenu from 'react-burger-menu';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';
import ServiceMenu from 'components/LV3/ServiceMenu';

class MenuSP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: 'slide',
      isOpen: false,
    };
  }

  logout = () => {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }

    const { dispatch } = this.props;
    dispatch(authActions.logout());
  };

  handleStateChange = state => {
    this.setState({ isOpen: state.isOpen });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { dispatch, isLogin, user, schedule } = this.props;
    const { currentMenu, isOpen } = this.state;

    let isSchedule = false;
    if (schedule && (schedule.user.length > 0 || schedule.host.length > 0)) {
      isSchedule = true;
    }

    // TODO メニュー操作時のcloseロジック汎用化したい

    const Menu = BurgerMenu[currentMenu];
    return (
      <Menu
        id={currentMenu}
        width={300}
        right
        isOpen={isOpen}
        onStateChange={state => this.handleStateChange(state)}
        className={isOpen ? 'open' : 'close'}
      >
        <ServiceMenu
          signupUrl={{ to: Path.signUp(), onClick: () => this.close() }}
          loginUrl={{ to: Path.login(), onClick: () => this.close() }}
          top={{ to: Path.top(), onClick: () => this.close() }}
          about={{ to: Path.about(), onClick: () => this.close() }}
          schedule={{ to: Path.schedule(), onClick: () => this.close() }}
          spaces={{ to: Path.spaces(), onClick: () => this.close() }}
          addSpace={{
            to: Path.spaceCreate1(),
            onClick: () => {
              dispatch(uiActions.setUiState({ space: {} }));
              this.close();
            },
          }}
          sales={{ to: Path.sales(), onClick: () => this.close() }}
          paymentHistory={{ to: Path.paid(), onClick: () => this.close() }}
          howtouse={{ to: Path.howtouse(), onClick: () => this.close() }}
          help={{ href: 'https://help.monooq.com/', onClick: () => this.close() }}
          inquiry={{ to: Path.inquiry(), onClick: () => this.close() }}
          userId={user.id}
          userName={user.name}
          userImage={user.imageUrl}
          isLogin={isLogin}
          isSchedule={isSchedule}
          isHost={user.isHost || false}
          logoutEvent={{
            onClick: e => {
              e.preventDefault();
              this.close();
              this.logout();
            },
          }}
          close={this.close}
        />
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLogin: state.auth.isLogin,
  schedule: state.request.schedule,
});

export default connect(mapStateToProps)(MenuSP);
