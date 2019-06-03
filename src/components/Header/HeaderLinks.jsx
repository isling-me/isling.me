/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
// import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// core components
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
// import profileImage from "assets/img/faces/avatar.jpg";
import Search from "@material-ui/icons/Search";

function HeaderLinks({ ...props }) {
  const { classes, isChangedColor } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <div className={classes.search}>
          <CustomInput
            white={isChangedColor}
            inputRootCustomClasses={classes.inputRootCustomClasses}
            formControlProps={{
              className: classes.formControl
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search",
              }
            }}
          />
          <Button justIcon round color={isChangedColor ? 'white' : 'primary'}>
            <Search className={classes.searchIcon}/>
          </Button>
        </div>
      </ListItem>

      {/*<ListItem className={classes.listItem}>*/}
      {/*<Button*/}
      {/*color="transparent"*/}
      {/*justIcon*/}
      {/*>*/}
      {/*<i className={classes.socialIcons + " far fa-bell"}/>*/}
      {/*</Button>*/}
      {/*</ListItem>*/}

      {/*<ListItem className={classes.listItem}>*/}
      {/*<CustomDropdown*/}
      {/*center*/}
      {/*caret={false}*/}
      {/*hoverColor="primary"*/}
      {/*noLiPadding*/}
      {/*buttonText={*/}
      {/*<img*/}
      {/*src={profileImage}*/}
      {/*className={classes.img}*/}
      {/*alt="profile"*/}
      {/*/>*/}
      {/*}*/}
      {/*buttonProps={{*/}
      {/*className:*/}
      {/*classes.navLink + " " + classes.imageDropdownButton,*/}
      {/*color: "transparent"*/}
      {/*}}*/}
      {/*dropdownList={[*/}
      {/*<Link to="/me" className={classes.dropdownLink}>*/}
      {/*Profile*/}
      {/*</Link>,*/}
      {/*<Link to="/new-story" className={classes.dropdownLink}>*/}
      {/*New story*/}
      {/*</Link>,*/}
      {/*<Link to="/signout" className={classes.dropdownLink}>*/}
      {/*Sign out*/}
      {/*</Link>,*/}
      {/*]}*/}
      {/*/>*/}
      {/*</ListItem>*/}

      {/*<ListItem className={classes.listItem}>*/}
        {/*<Button*/}
          {/*href="/sign-in"*/}
          {/*className={classes.registerNavLink}*/}
          {/*onClick={e => e.preventDefault()}*/}
          {/*color="transparent"*/}
        {/*>*/}
          {/*Sign in*/}
        {/*</Button>*/}
      {/*</ListItem>*/}

      {/*<ListItem className={classes.listItem}>*/}
        {/*<Button*/}
          {/*href="/sign-up"*/}
          {/*className={classes.registerNavLink}*/}
          {/*onClick={e => e.preventDefault()}*/}
          {/*color="danger"*/}
          {/*round*/}
        {/*>*/}
          {/*Sign up*/}
        {/*</Button>*/}
      {/*</ListItem>*/}
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
