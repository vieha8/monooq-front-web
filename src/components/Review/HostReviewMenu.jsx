import React from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';

export default class HostReviewMenu extends React.Component {
  render() {
    const { anchorDom, onClickMenu, onCloseMenu } = this.props;

    return (
      <div>
        <IconButton
          aria-owns={anchorDom ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={onClickMenu}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorDom}
          open={Boolean(anchorDom)}
          onClose={onCloseMenu}
        >
          <MenuItem onClick={onCloseMenu}>不適切な人物を報告</MenuItem>
        </Menu>
      </div>
    );
  }
}
