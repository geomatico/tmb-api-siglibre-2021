import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: ({drawerWidth}) => `calc(100% - ${drawerWidth}px)`,
      marginLeft: ({drawerWidth}) => drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const ResponsiveHeader = ({title, onMenuClick, children, drawerWidth}) => {
  const classes = useStyles({drawerWidth});

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {onMenuClick &&
            <IconButton edge="start" color="inherit" className={classes.menuButton} aria-label="menu" onClick={onMenuClick}>
              <MenuIcon/>
            </IconButton>
          }
          <Typography variant="h6" className={classes.title} noWrap>
            {title}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

ResponsiveHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func,
  drawerWidth: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

ResponsiveHeader.defaultProps = {
  drawerWidth: 0
};

export default ResponsiveHeader;
