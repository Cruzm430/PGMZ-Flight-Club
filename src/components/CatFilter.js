import React, { Component } from 'react';
import { actions } from '../store';
import { connect } from 'react-redux';
import { DUMMY_KEY } from '../store/constants';

class CatFilter extends Component {
  constructor() {
    super();
    this.state = {
      categoryKey: DUMMY_KEY
    }
  }
  componentDidUpdate() {
    if (!(this.state.categoryKey)) this.setState({categoryKey: DUMMY_KEY});
  }
  render() {
    const { searchByCat, categories } = this.props;
    return (
      <select onChange={(ev) => {
        this.setState({categoryKey: ev.target.value});
        searchByCat(ev.target.value);
      }}>
        <option key={DUMMY_KEY} value={DUMMY_KEY}>All Shoes</option>
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select>
    )
  }
}

export default connect(({categories}) => {
  return {
    categories
  }
}, (dispatch) => {
  return {
    searchByCat: (categoryKey) => {
      dispatch(actions.searchByCat(categoryKey))
    }
  }
})(CatFilter);