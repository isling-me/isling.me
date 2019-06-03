import imagesStyles from 'assets/jss/material-kit-react/imagesStyles';

const postCardMiniStyles = (theme) => ({
  ...imagesStyles,
  root: {
    maxWidth: 496,
    flex: 1,
    marginBottom: 24,
  },
  title: {
    marginTop: '0',
    textDecoration: 'none',
    fontSize: 18,
    fontWeight: 500,
  },
  body: {
    marginTop: 0,
  },
  marginLeft: {
    marginLeft: 'auto !important'
  },
  author: {
    fontWeight: '400',
    fontSize: 15,
    width: '260px',
    color: '#3C4858',
  },
  publishedDate: {
    marginTop: -4,
    fontWeight: '400',
    fontSize: 14,
    width: '260px',
    color: '#777',
  },
  link: {
    color: '#3C4858',
    '&:hover,&:focus': {
      color: '#3C4858',
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  index: {
    color: '#ccc',
  },
});

export default postCardMiniStyles;
