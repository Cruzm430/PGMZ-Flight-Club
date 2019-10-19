import React, { Component } from 'react';
import { actions } from '../store';
import { connect } from 'react-redux';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchText: ''
    }
  }
  render() {
    const { searchByName } = this.props;
    const { searchText } = this.state;
    return (
      <form onSubmit={(ev) => ev.preventDefault()}>
        <input value={ searchText } onChange={ (ev) => this.setState({searchText: ev.target.value })} />
        <button onClick={() => searchByName(searchText)}>Search</button>
      </form>
    )
  }
}

export default connect(null, (dispatch) => {
  return {
    searchByName: (searchText) => dispatch(actions.searchByName(searchText))
  }
})(Search);