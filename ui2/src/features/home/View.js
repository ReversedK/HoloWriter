import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class View extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);
    const { viewPagePending, pageResult, viewPageError } = props.home;
    const { viewPage } = this.props.actions;
    const queryString = require('query-string');
    var qs = queryString.parse(this.props.location.search);
    if (!viewPagePending) viewPage({ id: qs.id });
  }
  render() {
    const { viewPagePending, pageResult, viewPageError } = this.props.home;
    const { viewPage } = this.props.actions;

    return (
      <div className="home-view">
        <blockquote key="bk">
          {pageResult}
        </blockquote>
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
)(View);
