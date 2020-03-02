import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Select from 'react-select';
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import Ook from "../../lib/class.ook.js";
import PageModel from "./model.page.js"

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const ook = new Ook();
ook.setup();

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

export class AddPage extends PageModel {

  constructor(props) {
    super(props);
    let ook = new Ook();
    ook.setup();
    this.state = 
      {      
        lang: 'Français',
      code: 'EN_US',
      title: '',
      author: "Mike Love",
      tags: '',
      page_content: '', 
      language_list: ook.getLanguageList() || [],
      selectedLanguage: { code: "EN_US", label: "English" }
      }
  }

  
  onTagsChange = tags => {
    this.setState(
      { tags: tags.currentTarget.value },
      () => console.log(`tags:`, this.state.tags)
    );
  }


  render() {
    const { addPageResult ,language_list, addPagePending, addPageError } = this.props.home;
    const { addPage } = this.props.actions;
    return (
      <div className="home-add-page">
         <Select name="selectedLanguage" onChange={this.handleLangChange} options={language_list} value={this.state.selectedLanguage ||null} />
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
        <button className="btn-search" disabled={addPagePending} onClick={() => addPage(this.state)}>
          {addPagePending ? 'Saving...' : 'Save Page'}
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
)(AddPage);
