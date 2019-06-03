import {
  container,
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  transition,
  boxShadow,
  drawerWidth
} from "assets/jss/material-kit-react.jsx";

const headerStyle = {
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset"
  },
  absolute: {
    position: "absolute",
    zIndex: "1100"
  },
  fixed: {
    position: "fixed",
    zIndex: "1100"
  },
  container: {
    ...container,
    minHeight: "50px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    padding: "8px 16px",
    paddingLeft: 0,
    "&:hover,&:focus": {
      color: "inherit",
      background: "transparent"
    },
    fontWeight: 'bold',
  },
  appResponsive: {
    margin: "20px 10px"
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(53, 88, 118, 0.46)"
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)"
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)"
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)"
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)"
  },
  rose: {
    backgroundColor: roseColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)"
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    paddingTop: "25px",
    color: "#FFFFFF"
  },
  transparentDark: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    color: "#3C4858"
  },
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#212121 !important",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)"
  },
  white: {
    border: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition
  },
  primary10: {
    backgroundColor: "rgba(53, 88, 118, 0.5)",
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.014), 0 7px 12px -5px rgba(53, 88, 118, 0.046)"
  },
  primary20: {
    backgroundColor: "rgba(53, 88, 118, 0.55)",
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.028), 0 7px 12px -5px rgba(53, 88, 118, 0.092)"
  },
  primary30: {
    backgroundColor: "rgba(53, 88, 118, 0.6)",
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.042), 0 7px 12px -5px rgba(53, 88, 118, 0.148)"
  },
  primary40: {
    backgroundColor: "rgba(53, 88, 118, 0.65)",
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.076), 0 7px 12px -5px rgba(53, 88, 118, 0.14)"
  },
  primary50: {
    backgroundColor: "rgba(53, 88, 118, 0.7)",
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.09), 0 7px 12px -5px rgba(53, 88, 118, 0.2)"
  },
  primary60: {
    backgroundColor: "rgba(53, 88, 118, 0.75)",
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.1), 0 7px 12px -5px rgba(53, 88, 118, 0.3)"
  },
  primary70: {
    backgroundColor: "rgba(53, 88, 118, 0.8)",
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.11), 0 7px 12px -5px rgba(53, 88, 118, 0.35)"
  },
  primary80: {
    backgroundColor: "rgba(53, 88, 118, 0.85)",
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 12px -5px rgba(53, 88, 118, 0.40)"
  },
  primary90: {
    backgroundColor: "rgba(53, 88, 118, 0.9)",
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(53, 88, 118, 0.46)"
  },
  primary100: {
    backgroundColor: "rgba(53, 88, 118, 95)",
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(53, 88, 118, 0.46)"
  },
};

export default headerStyle;
