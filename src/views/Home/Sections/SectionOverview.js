import React from "react";
// plugin that creates slider
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import styles from './SectionOverviewStyles';

class SectionOverview extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sections}>
        <div className={classes.container}>
          <div className={classes.trend}>1</div>
          <div className={classes.hotWriter}>2</div>
          <div className={classes.editorChoice}>3</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SectionOverview);
