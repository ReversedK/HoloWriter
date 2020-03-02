import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Ook from "../../lib/class.ook.js";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

  
export default class PageModel extends Component {
    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
      };
    
    handleLangChange = selectedLanguage => {        
        this.setState(
          { code : selectedLanguage.value,
            lang : selectedLanguage.label,
            selectedLanguage : selectedLanguage
        }
        );
      };
    
      handleValueChange = (page_content: string) => {
        this.setState({ page_content });
      };
    
      onTagsChange = tags => {
        this.setState(
          { tags: tags.currentTarget.value },
          () => console.log(`tags:`, this.state.tags)
        );
      }
    
      setSelectedTab = (selectedTab) => {       
        this.setState({ selectedTab });
      };
    
        onChange(e) {
             this.setState({[e.target.name]: e.target.value})
        }
    
}