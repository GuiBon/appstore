import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {InstantSearch, Hits, SearchBox, Highlight, RefinementList, Pagination, CurrentRefinements, ClearAll} from 'react-instantsearch/dom'

export default class Search extends React.Component {

  constructor(props, _railsContext) {
    super(props);

    this.state = { 
    };

    this.appDisplay = this.appDisplay.bind(this)
    this.deleteApp = this.deleteApp.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  appDisplay({hit}) {
    return (
      <Grid>
        <Row className='hit'>
          <Col xs={4} md={4} className='hit-image'>
            <img src={hit.image} />
          </Col>
          <Col xs={4} md={4} className='hit-content'>
            <Row className='hit-name'>
              <Highlight attributeName='name' hit={hit} />
            </Row>
            <Row className='hit-info'>
              {hit.price} € - {hit.rating} stars
            </Row>
          </Col>
          <Col xs={2} md={2} className='icon-edit'>
            <button name='editButton' >
              Edit
            </button>
          </Col>
          <Col xs={2} md={2} className='icon-delete'>
            <button name='deleteButton' onClick={() => { 
              if (confirm('Delete this app ?')) {
                this.deleteApp(hit.objectID);
              }}}>
              Delete
            </button>
          </Col>
        </Row>
      </Grid>
    )
  }

  deleteApp(objectID, event) {
    $.ajax({
      url: `/api/1/apps/${objectID}`,
      type: 'DELETE',
      context: this,
      success: function(data) { 
        this.props.callbackResponse('deleted', data)
      },
      error: function(data) { 
        this.props.callbackResponse('deleted', data)
      }
    });
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
          apiKey='46edf7593a0474c6207ba8d01c5f7ddd'
          indexName='App'
        >
        <CurrentRefinements/>
        <ClearAll/>
        <SearchBox />
        <RefinementList attributeName='genres' />
        <Hits hitComponent={this.appDisplay}/>
        <Pagination />
        </InstantSearch>
      </div>
    );
  }
}
