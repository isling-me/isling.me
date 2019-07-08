import React, { useEffect, useState } from 'react';
import { Query } from 'react-apollo';
import { format } from 'date-fns';

import SectionPosts from './Sections/SectionPosts';
import SectionPopular from './Sections/SectionPopular';
import SideBar from '../../components/SideBar/SideBar';
import { getPopular, postsQuery } from '../../api';

const formatPublishedDate = date => {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (dateObj.getFullYear() === new Date().getFullYear()) {
    return format(dateObj, 'MMM dd');
  }

  return format(dateObj, 'MMM dd, yyyy');
};

function Home() {
  const [state, setState] = useState({
    post: {
      loading: true,
      error: null,
      items: []
    },
    populars: []
  });

  useEffect(() => {
    getPopular().then(res => {
      setState(prev => ({
        ...prev,
        populars: res.data.items
      }));
    });

    return () => {};
  }, []);

  return (
    <div className="home">
      <div className="hidden lg:block">
        <SideBar />
      </div>
      <div className="container mx-auto">
        <div className="p-6 lg:p-0">
          <div className="relative w-full mt-3 lg:mt-24">
            <div className="w-full lg:w-8/12">
              <Query query={postsQuery}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return <div>Loading</div>;
                  }

                  if (error) {
                    return <div>Error</div>;
                  }

                  const posts = data.posts.items.map(p => ({
                    ...p,
                    link: `/posts/${p.slug}/${p.id}`,
                    author: {
                      name: p.author.profile.name,
                      link: p.author.username
                        ? `/@${p.author.username}`
                        : `/users/${p.author.id}`
                    },
                    topic: {
                      name: p.topic.name,
                      link: `/topics/${p.topic.slug}`
                    },
                    readingTime: '15 min',
                    publishedDate: formatPublishedDate(
                      new Date(p.publishedDate)
                    )
                  }));
                  return <SectionPosts posts={posts} />;
                }}
              </Query>
            </div>
            <div className="lg:w-4/12 hidden lg:block absolute top-0 right-0">
              <SectionPopular posts={state.populars} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
