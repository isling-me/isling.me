import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Typography } from '@material-ui/core';
// @material-ui/icons

// core components
import postCardMiniStyles from './postCardMiniStyles';

function PostCardMini(props) {
  const {
    classes,
    index,
    post: {
      title,
      publishedDate,
      readingTime,
      link,
    },
    author,
    topic,
  } = props;
  return (
    <div className={classes.root}>
      <Grid container component={Link} to={link}>
        <Grid item xs={3}>
          <Typography className={classes.index} variant="h4">
            {index}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <div className={classes.title}>{title}</div>
          <div className={classes.body}>
            <div className={classes.author}>
              <Link
                to={`${author.link}`}
                className={classes.link}>
                {author.name}
              </Link> in <Link
              to={`${topic.link}`}
              className={classes.link}
            >
              {topic.name}
            </Link>
            </div>
            <div className={classes.publishedDate}>{publishedDate} ・ {readingTime}</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

PostCardMini.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  post: PropTypes.objectOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    caption: PropTypes.string,
    publishedDate: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
  author: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
  topic: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
};

export default withStyles(postCardMiniStyles)(PostCardMini);
