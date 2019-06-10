import c1 from './thoi-thanh-xuan-se-qua-1';
import c2 from './thoi-thanh-xuan-se-qua-2';

const users = [
  {
    name: 'Nichibu Meme',
    username: 'nichibuxmeme',
    link: '/@nichibuxmeme',
    avatar: '/img/avatar/nichibuxmeme/avatar.jpg',
  },
];

const posts = [
  {
    slug: 'thoi-thanh-xuan-se-qua-2',
    title: 'Thời thanh xuân sẽ qua',
    caption: '#Chương 2: Chúng ta còn trẻ, ta chẳng có gì ngoài một bầu nhiệt huyết thanh xuân',
    cover: '/img/posts/thoi-thanh-xuan-se-qua-2/cover.jpg',
    publishedDate: 'Jun 04',
    readingTime: '15 min read',
    link: '/posts/thoi-thanh-xuan-se-qua-2',
    content: c2,
    author: users.find(user => user.username === 'nichibuxmeme'),
    topic: {
      name: 'Stories',
      slug: 'stories',
      link: '/topic/stories',
    },
  },
  {
    slug: 'thoi-thanh-xuan-se-qua-1',
    title: 'Thời thanh xuân sẽ qua',
    caption: '#Chương 1: Tuổi trẻ giống như một cơn mưa rào, dù có bị ướt thì bạn vẫn muốn được tắm mưa một lần nữa...',
    cover: '/img/posts/thoi-thanh-xuan-se-qua-1/cover.jpg',
    publishedDate: 'May 28',
    readingTime: '5 min read',
    link: '/posts/thoi-thanh-xuan-se-qua-1',
    content: c1,
    author: users.find(user => user.username === 'nichibuxmeme'),
    topic: {
      name: 'Stories',
      slug: 'stories',
      link: '/topic/stories',
    },
  },
];

const populars = [
  'thoi-thanh-xuan-se-qua-2',
  'thoi-thanh-xuan-se-qua-1',
];

export const findManyPosts = ({ page, perPage }) => posts.slice(page * perPage, perPage);
export const countPosts = () => posts.length;
export const findManyPostsBySlug = slugList => slugList
  .map(slug => posts.find(item => item.slug === slug))
  .filter(item => !!item);

export const findManyPopulars = () => populars.slice(0, 5);
