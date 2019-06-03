import { container, primaryColor } from "assets/jss/material-kit-react.jsx";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "0.9375rem 1.875rem 0.9375rem 0",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  blockRight: {
    color: "inherit",
    padding: "0.4rem 0 0.9375rem 1.875rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    margin: "0",
    float: "right!important",
  },
  footer: {
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    position: "relative",
    color: 'rgba(0, 0, 0, 0.54)',
  },
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF"
    }
  },
  container,
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  icon: {
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px"
  },
  paddingLeftRight24: {
    padding: '0 24px',
  },
};
export default footerStyle;
