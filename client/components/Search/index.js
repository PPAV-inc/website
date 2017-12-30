import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Videos from './Videos';
import VideosQuery from './VideosQuery';

const SearchSection = styled.section`
  margin-top: 100px;
`;

const VideosSection = styled.section`
  padding: 0 50px;
`;

class Search extends Component {
  render() {
    return (
      <SearchSection>
        <VideosSection>
          <VideosQuery keyword={decodeURI(this.props.url.query.keyword)}>
            {({ videos }) => <Videos videos={videos} />}
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
