import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import initMediumInsert from './lib/medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin';
import initSortable from './lib/jquery-sortable';
import initUiWidget from './lib/jquery.ui.widget';
import initIframe from './lib/jquery.iframe-transport';
import initFileUpload from './lib/jquery.fileupload';
import Handlebars from 'handlebars/runtime';

let MediumEditorOrigin;

if (typeof document !== 'undefined') {
  MediumEditorOrigin = require('medium-editor');
}

class MediumEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    };
    this.numberUploadingImage = 0;
    this.isInserting = false;
    this.timeoutId = null;
  }
  static defaultProps = {
    tag: 'div',
    text: '',
    onChange: () => {}
  };

  componentDidMount = () => {
    const { plugins = {} } = this.props;

    const dom = ReactDOM.findDOMNode(this);

    this.medium = new MediumEditorOrigin(dom, this.props.options);
    const medium = this.medium;

    if (plugins.mediumInsert) {
      const mediumInsertOptions = {
        ...plugins.mediumInsert.options,
        editor: medium
      };

      if (mediumInsertOptions.addons && mediumInsertOptions.addons.images) {
        const {
          uploadAdd,
          uploadCompleted,
          uploadFailed
        } = plugins.mediumInsert.options.addons.images;

        mediumInsertOptions.addons.images.uploadAdd = (...args) => {
          this.addImage();
          if (uploadAdd) {
            uploadAdd(...args);
          }
        };
        mediumInsertOptions.addons.images.uploadCompleted = (...args) => {
          this.uploadImageDone();
          if (uploadCompleted) {
            uploadCompleted(...args);
          }
        };
        mediumInsertOptions.addons.images.uploadFailed = (...args) => {
          this.uploadImageDone();
          if (uploadFailed) {
            uploadFailed(...args);
          }
        };
      }

      $(function() {
        initUiWidget($);
        initIframe($);
        initFileUpload($);
        initSortable($);
        initMediumInsert($, Handlebars, MediumEditorOrigin);
        $(dom).mediumInsert(mediumInsertOptions);
      });
    }

    this.medium.subscribe('editableInput', () => {
      if (plugins.mediumInsert) {
        this.removeInsertButtons();
      }
      this.updated = true;
      this.shouldUpdateContent();
    });
    this.medium.setContent(this.state.text);
  };

  componentDidUpdate = () => {
    this.medium.restoreSelection();
  };

  componentWillUnmount = () => {
    this.medium.destroy();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text && !this.updated) {
      this.setState({ text: nextProps.text }, () => {
        this.medium.setContent(this.state.text);
        this.medium.restoreSelection();
      });
    }

    if (this.updated) {
      this.updated = false;
    }
  }

  render() {
    const tag = this.props.tag;
    const childProps = {
      ...this.props
    };

    if (this.medium) {
      this.medium.saveSelection();
    }

    return React.createElement(tag, childProps);
  }

  removeInsertButtons() {
    $('.medium-insert-buttons').remove();
  }

  shouldUpdateContent() {
    if (this.numberUploadingImage > 0) {
      return;
    }

    this.updateContent();
  }

  updateContent() {
    const dom = ReactDOM.findDOMNode(this);
    this.props.onChange(dom.innerHTML);
  }

  addImage() {
    this.numberUploadingImage += 1;
    this.updateContent();
  }

  uploadImageDone() {
    this.numberUploadingImage -= 1;
    this.shouldUpdateContent();
  }
}

MediumEditor.propTypes = {
  tag: PropTypes.string,
  text: PropTypes.string,
  options: PropTypes.any,
  onChange: PropTypes.func,
  plugins: PropTypes.any
};

export default MediumEditor;
