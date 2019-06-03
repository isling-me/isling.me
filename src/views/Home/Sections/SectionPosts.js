import React from "react";
import PropTypes from 'prop-types';
// plugin that creates slider
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import PostCard from 'components/PostCard/PostCard';

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

function SectionPosts(props) {
  const { classes, posts } = props;
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        {posts.map(ps => (
          <PostCard
            post={ps.post}
            author={{ ...ps.author, link: `/@${ps.author.username}` }}
            topic={{ ...ps.topic, link: `/topic/${ps.topic.slug}` }}
            key={ps.post.title}
          />
        ))}
      </div>
    </div>
  );
}

SectionPosts.propTypes = {
  post: PropTypes.array.isRequired,
};

export default withStyles(basicsStyle)(SectionPosts);
