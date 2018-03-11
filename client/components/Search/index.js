import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import queryString from 'query-string';

import { Router } from '../../routes';

import Filter from './Filter';
import Videos from './Videos';
import Pagination from './Pagination';
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
    models: [],
    page: 1,
    sort: 'total_view_count',
  };

  componentWillMount() {
    // 之後會有更多 filter
    const { page, filter } = this.props.url.query;
    const { sort } = queryString.parse(filter);

    this.setState(prevState => ({
      ...prevState,
      sort: sort || prevState.sort,
      page: parseInt(page, 10) || prevState.page,
    }));
  }

  componentDidMount() {
    const { keyword, page } = this.props.url.query;

    if (!page) {
      Router.pushRoute(
        'search',
        { keyword: decodeURI(keyword), page: 1 },
        { shallow: true }
      );
    }
  }

  onSortChange = value => {
    this.setState(prevState => ({
      ...prevState,
      sort: value,
      page: 1,
    }));
  };

  onModelsChange = value => {
    this.setState(prevState => ({
      ...prevState,
      models: value,
    }));
  };

  render() {
    const keyword = decodeURI(this.props.url.query.keyword);
    const { page, sort, models } = this.state;

    return (
      <SearchSection>
        <FilterSection>
          <VideosQuery keyword={keyword} sort={sort}>
            {({ searchVideos: { results } }) => (
              <Filter
                data={results}
                filter={{
                  sort,
                }}
                onSortChange={this.onSortChange}
                onModelsChange={this.onModelsChange}
              />
            )}
          </VideosQuery>
        </FilterSection>
        <VideosSection>
          <VideosQuery
            keyword={keyword}
            sort={sort}
            models={models}
            page={page}
          >
            {({ searchVideos: { total, results } }) => [
              <p key="total">
                有 <b>{total}</b> 項結果
              </p>,
              <Videos data={results} key="videos" />,
              <Pagination
                currentPage={page}
                total={total}
                onChange={p => {
                  Router.pushRoute(
                    'search',
                    { keyword, page: p },
                    { shallow: true }
                  );

                  this.setState(prevState => ({
                    ...prevState,
                    page: p,
                  }));
                }}
                key="pagination"
              />,
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
