import React from "react";
import PropTypes from 'prop-types';
// plugin that creates slider
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PostCard from 'components/PostCardMini/PostCardMini';

import styles from "./SectionPopularStyles";

function SectionPopular(props) {
  const { classes, posts } = props;
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <GridContainer className={classes.padding24}>
          <GridItem xs={12}>
            {posts.map((ps, idx) => (
              <PostCard
                index={`0${idx + 1}`}
                post={ps.post}
                author={{ ...ps.author, link: `/@${ps.author.username}` }}
                topic={{ ...ps.topic, link: `/topic/${ps.topic.slug}` }}
                key={ps.post.title}
              />
            ))}
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

SectionPopular.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default withStyles(styles)(SectionPopular);
