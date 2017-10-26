import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {InstantSearch, Hits, SearchBox, Highlight, RefinementList, Pagination, CurrentRefinements, ClearAll} from 'react-instantsearch/dom'

function AppDisplay({hit}) {
  return (
    <Grid>
      <Row className='hit'>
        <Col xs={6} md={6} className='hit-image'>
          <img src={hit.image} />
        </Col>
        <Col xs={6} md={6} className='hit-content'>
          <Row className='hit-name'>
            <Highlight attributeName='name' hit={hit} />
          </Row>
          <Row className='hit-info'>
            {hit.price} € - {hit.rating} ☆
          </Row>
        </Col>
      </Row>
    </Grid>
  );
}

export default class Search extends React.Component {

  constructor(props, _railsContext) {
    super(props);

    this.state = { 
    };

    this.handleBack = this.handleBack.bind(this)
  }

  handleBack(event) {
    this.props.callbackHome()
  }

  render() {
    return (
      <div>
        <div>
          <button name='backButton' onClick={this.handleBack}>
            Back
          </button>
        </div>
        <InstantSearch
          appId='LZ6T2ZYQUS'
          apiKey='29904776455766d4b76da48cf74f5161'
          indexName='App'
        >
        <CurrentRefinements/>
        <ClearAll/>
        <SearchBox />
        <RefinementList attributeName='genres' />
        <Hits hitComponent={AppDisplay}/>
        <Pagination />
        </InstantSearch>
      </div>
    );
  }
}
