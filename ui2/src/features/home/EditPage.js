import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

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

export class EditPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

    constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);
    const { editPagePending } = props.home;
    const { editPage } = this.props.actions;
    const queryString = require('query-string');
    var qs = queryString.parse(this.props.location.search);
    if (!editPagePending) editPage({ id: qs.id });
  }

setValue(d) {

}
  render() {
      
  
       const { selectedTab, setSelectedTab,editPagePending, editPageResult, editPageError } = this.props.home;
        const { editPage } = this.props.actions;
    const queryString = require('query-string');
    var qs = queryString.parse(this.props.location.search);
    return (
      <div className="home-edit-page">
       <ReactMde 
        value={editPageResult}
        onChange={this.setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        loadSuggestions={loadSuggestions}
      />
       
       <button className="btn-search" disabled={editPagePending} onClick={()=>editPage({ 
      lang : "Français",
      code:"FR_fr",
      name : "Ma première page",
      author : "Mike Love",
      tags : "love,flower,sun" ,     
      addr : qs.id
      })}>
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
