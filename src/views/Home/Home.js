import React, { Fragment } from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

// sections for this page
import SectionPosts from "./Sections/SectionPosts";
import SectionPopular from "./Sections/SectionPopular";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';

const postSamples = [
  {
    post: {
      title: 'Thời thanh xuân sẽ qua - Chap 2',
      caption: 'Chúng ta còn trẻ, ta chẳng có gì ngoài một bầu nhiệt huyết thanh xuân',
      cover: '/img/thoi-thanh-xuan-se-qua-c2-cover.jpg',
      publishedDate: 'Jun 04',
      readingTime: '15 min read',
      link: '/posts/thoi-thanh-xuan-se-qua-chap-2',
    },
    author: {
      name: 'Nichibu',
      username: 'nichibu',
    },
    topic: {
      name: 'Stories',
      slug: 'stories',
    },
  },
  {
    post: {
      title: 'Thời thanh xuân sẽ qua - Chap 1',
      caption: 'Tuổi trẻ giống như một cơn mưa rào, dù có bị ướt thì bạn vẫn muốn được tắm mưa một lần nữa...',
      cover: '/img/thoi-thanh-xuan-se-qua-c1-cover2.jpg',
      publishedDate: 'May 28',
      readingTime: '15 min read',
      link: '/posts/thoi-thanh-xuan-se-qua-chap-1',
    },
    author: {
      name: 'Nichibu',
      username: 'nichibu',
    },
    topic: {
      name: 'Stories',
      slug: 'stories',
    },
  },
];

const postPopularSamples = [
  {
    post: {
      title: 'Thời thanh xuân sẽ qua - Chap 1',
      publishedDate: 'May 28',
      readingTime: '15 min read',
      link: '/posts/thoi-thanh-xuan-se-qua-chap-1',
    },
    author: {
      name: 'Nichibu',
      username: 'nichibu',
    },
    topic: {
      name: 'Stories',
      slug: 'stories',
    },
  },
  {
    post: {
      title: 'Thời thanh xuân sẽ qua - Chap 2',
      publishedDate: 'Jun 04',
      readingTime: '15 min read',
      link: '/posts/thoi-thanh-xuan-se-qua-chap-2',
    },
    author: {
      name: 'Nichibu',
      username: 'nichibu',
    },
    topic: {
      name: 'Stories',
      slug: 'stories',
    },
  },
];

function Home(props) {
  const { classes } = props;
  return (
    <Fragment>
      <div className={classNames(classes.root, classes.main)}>
        <div className={classes.container}>
          <GridContainer className="mt-24">
            <GridItem xs={12} sm={12} md={8}>
              <SectionPosts
                posts={postSamples}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <SectionPopular
                posts={postPopularSamples}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </Fragment>
  );
}

export default withStyles(componentsStyle)(Home);
