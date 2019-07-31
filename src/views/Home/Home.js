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
            <div className="flex items-center">
              {data &&
                data.topics &&
                data.topics.items.map(topic => (
                  <Link
                    to={makeTopicUri(topic.slug)}
                    className="inline-block pr-6 text-gray-600 hover:text-gray-800 text-md"
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
          <div className="relative w-full mt-3 lg:mt-16">
            <div className="w-full lg:w-8/12 lg:pr-4">
              <SectionPosts />
            </div>
            <div className="lg:w-4/12 hidden lg:block absolute top-0 right-0">
              <SectionPopular />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
