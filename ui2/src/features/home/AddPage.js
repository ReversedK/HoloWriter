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



export class AddPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    let ook = new Ook();
    ook.setup();
    this.setState(
      {      
          lang: '',
          code: '',
          title: null,
          author: "Mike Love",
          tags: null,
          page_content: null,  
          language_list: ook.getLanguageList()
      });
  }

  handleChange = selectedLanguage => {
    this.setState(
      { selectedLanguage },
      () => console.log(`Option selected:`, this.state.selectedLanguage)
    );
  };

  handleValueChange = (page_content: string) => {
    this.setState({ page_content });
  };

  onTitleChange = title => {
    this.setState(
      { title: title.currentTarget.value },
      () => console.log(`title:`, this.state.title)
    );
  }
  onTagsChange = tags => {
    this.setState(
      { tags: tags.currentTarget.value },
      () => console.log(`tags:`, this.state.tags)
    );
  }

  setSelectedTab = (selectedTab) => {
    if (selectedTab == "write") selectedTab = "write"; else selectedTab = "preview";
    this.setState({ selectedTab });
  };

  render() {
    const { setSelectedTab, language_list, addPagePending, addPageError } = this.props.home;
    const { addPage } = this.props.actions;
    const page_content = this.state !== null && this.state.hasOwnProperty('page_content') && this.state.page_content.length ? this.state.page_content : '';
    const selectedTab = this.state !== null && this.state.hasOwnProperty('selectedTab') && this.state.selectedTab.length ? this.state.selectedTab : '';
   

    return (
      <div className="home-add-page">
        <Select onChange={this.handleChange} options={language_list} />
        <input type="text" id="title" placeholder="Title" onChange={(f) => this.onTitleChange(f)} />
        <ReactMde
          value={page_content}
          onChange={this.handleValueChange}
          selectedTab={selectedTab}
          onTabChange={this.setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          loadSuggestions={loadSuggestions}
        />
        <input type="text" id="tags" onChange={(f) => this.onTagsChange(f)} />

        <button className="btn-search" disabled={addPagePending} onClick={() => addPage(this.state)}>
          {addPagePending ? 'Saving...' : 'Save Page'}
        </button> ;
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
