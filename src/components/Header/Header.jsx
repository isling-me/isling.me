import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import headerStyle from 'assets/jss/material-kit-react/components/headerStyle.jsx';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      fixOnScroll: false,
      prevBackgroundColor: props.color,
      isChangedColor: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.headerColorChange = this.headerColorChange.bind(this);
  }

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener('scroll', this.headerColorChange);
    }
  }

  headerColorChange() {
    const { classes, color, changeColorOnScroll } = this.props;
    const windowsScrollTop = window.pageYOffset;
    const { fromHeight, toHeight } = changeColorOnScroll;

    if (changeColorOnScroll.colorDependHeight) {
      const percent = (windowsScrollTop - fromHeight) / (toHeight - fromHeight);
      const opacity = Math.round(percent * 10) * 10;
      let realColor;
      if (opacity > 100) {
        realColor = changeColorOnScroll.color;
        this.setState({ isChangedColor: true });
      } else if (opacity > 10) {
        realColor = `${changeColorOnScroll.color}${opacity}`;
        this.setState({ isChangedColor: true });
      } else {
        realColor = color;
        this.setState({ isChangedColor: false });
      }

      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[this.state.prevBackgroundColor]);
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[realColor]);
      this.setState({ prevBackgroundColor: realColor });
    } else if (windowsScrollTop > changeColorOnScroll.height) {
      this.setState({ fixedOnScroll: true });
      this.setState({ isChangedColor: true });
      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      this.setState({ isChangedColor: false });
      this.setState({ fixedOnScroll: false });
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  }

  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener('scroll', this.headerColorChange);
    }
  }

  render() {
    const {
      classes,
      color,
      rightLinks,
      leftLinks,
      brand,
      fixed,
      fixedOnScroll,
      absolute
    } = this.props;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed || (fixedOnScroll && this.state.fixedOnScroll)
    });
    const brandComponent = (
      <NavLink className={classes.title} to="/">
        {brand}
      </NavLink>
    );
    return (
      <AppBar className={appBarClasses}>
        <Toolbar className={classes.container}>
          {leftLinks !== undefined ? brandComponent : null}
          <div className={classes.flex}>
            {leftLinks !== undefined ? (
              <Hidden smDown implementation="css">
                {leftLinks}
              </Hidden>
            ) : (
              brandComponent
            )}
          </div>
          <Hidden smDown implementation="css">
            {typeof rightLinks === 'function'
              ? rightLinks({
                  ...this.props,
                  isChangedColor: this.state.isChangedColor
                })
              : rightLinks}
          </Hidden>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={'right'}
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleDrawerToggle}
          >
            <div className={classes.appResponsive}>
              {leftLinks}
              {rightLinks}
            </div>
          </Drawer>
        </Hidden>
      </AppBar>
    );
  }
}

Header.defaultProp = {
  color: 'white'
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'transparent',
    'transparentDark',
    'white',
    'rose',
    'dark'
  ]),
  rightLinks: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // this.props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // this.props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number,
    fromHeight: PropTypes.number,
    toHeight: PropTypes.number,
    colorDependHeight: PropTypes.bool,
    color: PropTypes.oneOf([
      'primary',
      'info',
      'success',
      'warning',
      'danger',
      'transparent',
      'white',
      'rose',
      'dark'
    ]).isRequired
  })
};

export default withStyles(headerStyle)(Header);
