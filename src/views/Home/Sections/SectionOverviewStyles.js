import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

export default theme => ({
  padding24: {
    padding: 24,
  },
  ...basicsStyle,
  sections: {
    ...basicsStyle.sections,
    // paddingTop: 120,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
  trend: {
    flex: 5,
    border: 'solid 1px #000',
    height: 280,
    // marginLeft: -80,
    marginRight: 20,
  },
  hotWriter: {
    flex: 3,
    border: 'solid 1px #000',
  },
  editorChoice: {
    flex: 4,
    border: 'solid 1px #000',
    marginLeft: 20,
    // marginRight: -80,
  },
});
