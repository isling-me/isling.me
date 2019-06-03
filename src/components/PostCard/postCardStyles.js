import imagesStyles from "assets/jss/material-kit-react/imagesStyles";

const postCardStyles = (theme) => ({
  ...imagesStyles,
  space50: {
    height: "50px",
    display: "block"
  },
  root: {
    maxWidth: 680,
    flex: 1,
    marginBottom: 48,
    paddingRight: 24,
  },
  header: {
    marginRight: 24,
  },
  title: {
    marginTop: "0",
    textDecoration: "none",
    fontSize: 24,
    fontWeight: 500,
  },
  caption: {
    marginTop: 2,
    color: "#777",
    fontSize: 16,
    maxHeight: 46,
    overflow: 'hidden',
  },
  body: {
    marginTop: 12,
  },
  typo: {
    marginBottom: "40px",
    position: "relative",
    width: "100%"
  },
  marginLeft: {
    marginLeft: "auto !important"
  },
  author: {
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "16px",
    width: "260px",
    color: "#3C4858",
  },
  publishedDate: {
    marginTop: 6,
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "14px",
    width: "260px",
    color: "#777",
  },
  link: {
    color: "#3C4858",
    '&:hover,&:focus': {
      color: "#3C4858",
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  cover: {
    width: '100%',
    height: '100%',
    backgroundPosition: '50% 50%',
    backgroundOrigin: 'border-box!important',
    backgroundSize: 'cover!important',
  }
});

export default postCardStyles;
