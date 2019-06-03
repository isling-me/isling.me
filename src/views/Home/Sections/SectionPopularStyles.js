import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

export default theme => ({
  padding24: {
    padding: 24,
  },
  ...basicsStyle,
  sections: {
    ...basicsStyle.sections,
    paddingBottom: 0,
  }
});
