import React, { useEffect, useState } from 'react';
import SectionPosts from './Sections/SectionPosts';
import SectionPopular from './Sections/SectionPopular';
import SideBar from '../../components/SideBar/SideBar';
import { getPosts, getPopular } from '../../api';

function Home() {
  const [state, setState] = useState({
    posts: [],
    populars: [],
  });

  useEffect(() => {
    getPosts(0, 10)
      .then((res) => {
        setState(prev => ({
          ...prev,
          posts: [...prev.posts, ...res.data.items],
        }));
      });

    getPopular()
      .then((res) => {
        setState(prev => ({
          ...prev,
          populars: res.data.items,
        }));
      });

    return () => {
    };
  }, []);

  return (
    <div className="home">
      <div className="hidden lg:block">
        <SideBar/>
      </div>
      <div className="container mx-auto">
        <div className="p-6 lg:p-0">
          <div className="relative w-full mt-3 lg:mt-24">
            <div className="w-full lg:w-8/12">
              <SectionPosts
                posts={state.posts}
              />
            </div>
            <div className="lg:w-4/12 hidden lg:block absolute top-0 right-0">
              <SectionPopular
                posts={state.populars}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
