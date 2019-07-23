import React, { useEffect, useState } from 'react';

import SectionPosts from './Sections/SectionPosts';
import SectionPopular from './Sections/SectionPopular';
import { getPopular } from '../../api';
import Header from '../Header/Header';

function Home() {
  const [state, setState] = useState({
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
    <div className="root">
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="container mx-auto pb-24">
        <div className="p-6 lg:p-0">
          <div className="relative w-full mt-3 lg:mt-16">
            <div className="w-full lg:w-8/12 lg:pr-4">
              <SectionPosts />
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
