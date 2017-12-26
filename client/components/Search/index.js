import React, { Component } from 'react';

class Search extends Component {
  render() {
    return <span>{JSON.stringify(this.props, null, 2)}</span>;
  }
}

export default Search;
