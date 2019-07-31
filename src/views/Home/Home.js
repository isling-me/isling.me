import React from 'react';
import { Link } from 'react-router-dom';
import SectionPosts from './Sections/SectionPosts';
import SectionPopular from './Sections/SectionPopular';
import Header from '../Header/Header';
import { hotTopicsQuery } from '../../graphql/topic';
import { makeTopicUri } from '../../helpers/topic';
import { useQuery } from '@apollo/react-hooks';

function Home() {
  const { data } = useQuery(hotTopicsQuery);

  return (
    <div className="root">
      <div className="hidden lg:block">
        <Header
          leftChild={
            <div className="flex items-center text-lg border-l border-gray-300 pl-4">
              {data &&
                data.topics &&
                data.topics.items.map(topic => (
                  <Link
                    to={makeTopicUri(topic.slug)}
                    className="inline-block pr-3 text-gray-700 hover:text-gray-900 text-xs font-semibold"
                    key={topic.slug}
                  >
                    {topic.name.toUpperCase()}
                  </Link>
                ))}
            </div>
          }
        />
      </div>
      <div className="container mx-auto pb-24">
        <div className="p-6 lg:p-0">
          <div className="relative w-full mt-3 lg:mt-24">
            <div className="w-full lg:w-8/12 lg:pr-4">
              <SectionPosts />
            </div>
            <div className="lg:w-4/12 pl-4 hidden lg:block absolute top-0 right-0">
              <SectionPopular />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
