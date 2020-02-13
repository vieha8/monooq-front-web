import React, { Component } from 'react';
import { connect } from 'react-redux';
import BurgerMenu from 'react-burger-menu';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';
import ServiceMenu from 'components/LV3/ServiceMenu';

class ServiceMenuPage extends Component {
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

  handleStateChange(state) {
    this.setState({ isOpen: state.isOpen });
  }

  render() {
    const { dispatch, isLogin, user, schedule } = this.props;
    const { currentMenu, isOpen } = this.state;

    let isSchedule = false;
    if (schedule && (schedule.user.length > 0 || schedule.host.length > 0)) {
      isSchedule = true;
    }

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
          signupUrl={{ to: Path.signUp() }}
          loginUrl={{ to: Path.login() }}
          top={{ to: Path.top() }}
          about={{ to: Path.about() }}
          schedule={{ to: Path.schedule() }}
          spaces={{ to: Path.spaces() }}
          addSpace={{
            to: Path.spaceCreate1(),
            onClick: () => dispatch(uiActions.setUiState({ space: {} })),
          }}
          sales={{ to: Path.sales() }}
          paymentHistory={{ to: Path.paid() }}
          howtouse={{ to: Path.howtouse() }}
          help={{ href: 'https://help.monooq.com/' }}
          inquiry={{ to: Path.inquiry() }}
          userId={user.id}
          userName={user.name}
          userImage={user.imageUrl}
          isLogin={isLogin}
          isSchedule={isSchedule}
          isHost={user.isHost || false}
          logoutEvent={{
            onClick: e => {
              e.preventDefault();
              this.logout();
            },
          }}
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

export default connect(mapStateToProps)(ServiceMenuPage);
