import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Select from 'react-select';
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import Ook from "../../lib/class.ook.js";
import PageModel from "./model.page.js"

function loadSuggestions(text) {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: "Andre",
          value: "@andre"
        },
        {
          preview: "Angela",
          value: "@angela"
        },
        {
          preview: "David",
          value: "@david"
        },
        {
          preview: "Louise",
          value: "@louise"
        }
      ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const ook = new Ook();
ook.setup();

export class EditPage extends PageModel {

  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);
    const { editPagePending } = props.home;
    const { editPage } = this.props.actions;
    const queryString = require('query-string');
    var qs = queryString.parse(this.props.location.search);
    editPage({ id: qs.id }).then(()=>{
       const { editPageResult } = this.props.home;
    if (editPageResult) this.setState({ page_content: editPageResult.content, title: editPageResult.name });
    });
    this.state =
    {
      lang: 'Français',
      code: 'EN_US',
      title: '',
      author: "Mike Love",
      tags: '',
      page_content: '',
      addr: qs.id,
      language_list: ook.getLanguageList() || [],
      selectedLanguage: { code: "EN_US", label: "English" }
    }
  }

 /* componentWillReceiveProps() {
    const { editPageResult } = this.props.home;
    if (editPageResult) this.setState({ page_content: editPageResult.content, title: editPageResult.name });
  }
*/

  render() {
    const { selectedTab, language_list, setSelectedTab, editPagePending, editPageResult, editPageError } = this.props.home;
    const { editPage } = this.props.actions;
    return (
      <div className="home-edit-page">
        <Select onChange={this.handleLangChange} options={language_list} value={this.state.selectedLanguage} />
        <input type="text" id="title" name="title" placeholder="Title" value={this.state.title} onChange={(value) => this.onChange(value)} />
        <ReactMde
          value={this.state.page_content}
          onChange={this.handleValueChange}
          selectedTab={this.state.selectedTab}
          onTabChange={this.setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          loadSuggestions={loadSuggestions}
        />
        <input type="text" id="tags" onChange={(f) => this.onTagsChange(f)} />
        <button className="btn-search" disabled={editPagePending} onClick={() => editPage(this.state)}>
          {editPagePending ? 'Saving...' : 'Save Page'}
        </button>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPage);