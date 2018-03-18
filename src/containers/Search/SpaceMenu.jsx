import React from 'react';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { uiActions } from 'redux/modules/ui';

class SpaceMenu extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(uiActions.setUiState({
      anchorSpaceMenuDom: null,
    }));
  }

  handleClick = (event) => {
    this.props.dispatch(uiActions.setUiState({
      anchorSpaceMenuDom: event.currentTarget,
    }));
  }

  handleClose = () => {
    this.props.dispatch(uiActions.setUiState({
      anchorSpaceMenuDom: null,
    }));
  }

  render() {
    const { ui } = this.props;

    return (
      <div>
        <IconButton
          aria-owns={ui.anchorSpaceMenuDom ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={ui.anchorSpaceMenuDom}
          open={Boolean(ui.anchorSpaceMenuDom)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Facebookでシェアする</MenuItem>
          <MenuItem onClick={this.handleClose}>Twitterでシェアする</MenuItem>
          <MenuItem onClick={this.handleClose}>不適切な内容を報告</MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(SpaceMenu);
