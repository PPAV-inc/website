import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Filter from './Filter';
import Videos from './Videos';
import VideosQuery from './VideosQuery';

const SearchSection = styled.section`
  margin-top: 80px;
`;

const VideosSection = styled.section`
  padding: 80px 50px;
`;

const FilterSection = styled.section`
  position: fixed;
  width: 100%;
  padding: 10px 50px;
  border: 0;
  background-color: #fafafa;
  z-index: 99;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

class Search extends Component {
  state = {
    sort: 'total_view_count',
  };

  onSortChange = value => {
    this.setState(prevState => ({
      ...prevState,
      sort: value,
    }));
  };

  render() {
    const keyword = decodeURI(this.props.url.query.keyword);
    const { sort } = this.state;

    return (
      <SearchSection>
        <FilterSection>
          <VideosQuery keyword={keyword} sort={sort}>
            {({ searchVideos: { results } }) => (
              <Filter videos={results} onSortChange={this.onSortChange} />
            )}
          </VideosQuery>
        </FilterSection>
        <VideosSection>
          <VideosQuery keyword={keyword} sort={sort}>
            {({ searchVideos: { total, results } }) => [
              <p>
                有 <b>{total}</b> 項結果
              </p>,
              <Videos videos={results} />,
            ]}
          </VideosQuery>
        </VideosSection>
      </SearchSection>
    );
  }
}

Search.propTypes = {
  url: PropTypes.object.isRequired,
};

export default Search;
