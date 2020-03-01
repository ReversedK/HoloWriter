import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Search extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
        const { searchByTagsPending, searchResult, searchByTagsError } = this.props.home;
        const { searchByTags } = this.props.actions;

    return (
      <div className="home-search">
        Page Content: home/Search
        <input type="text" id="tags" />
      <button className="btn-search" disabled={searchByTagsPending} onClick={searchByTags}>
          {searchByTagsPending ? 'Fetching...' : 'Fetch reactjs topics'}
        </button>
        {searchByTagsError && (
          <div className="fetch-list-error">Failed to load: {searchByTagsError.toString()}</div>
        )}
        {searchResult.length > 0 ? (
          <ul className="examples-reddit-list">
            {searchResult.map(item => (
              <li key={item.name}>
                <a href={"/view?id="+item.addr}> {item.content}</a>
                <a href={"/edit?id="+item.addr}>edit</a>
                 ({item.tags}) /  ({item.lang})
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items-tip">No items yet.</div>
        )}   
        
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
)(Search);
