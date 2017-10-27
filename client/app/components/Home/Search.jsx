import React from 'react';
import {Grid, Row, Col, ButtonToolbar, Button} from 'react-bootstrap';
import {InstantSearch, Hits, SearchBox, Highlight, RefinementList, Pagination, CurrentRefinements, ClearAll} from 'react-instantsearch/dom'

import style from './Search.scss'

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
        <Row className={style.hit}>
          <Col xs={2} md={2} className='hit-image'>
            <img src={hit.image} />
          </Col>
          <Col xs={8} md={8} className='hit-content'>
            <Row className='hit-name'>
              <Highlight attributeName='name' hit={hit} />
            </Row>
            <Row className='hit-info'>
              {hit.price} € - {hit.rating} ☆
            </Row>
          </Col>
          <Col xs={2} md={2} className='icon-delete'>
            <ButtonToolbar>
              <Button bsStyle='danger' name='deleteButton' onClick={() => { 
                if (confirm('Delete this app ?')) {
                  this.deleteApp(hit.objectID);
                }}}>
                Delete
              </Button>
            </ButtonToolbar>
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
        <ButtonToolbar className={style.backButton}>
          <Button name='backButton' onClick={this.handleBack} bsStyle='primary'>
            Back
          </Button>
        </ButtonToolbar>
        <InstantSearch
          appId='LZ6T2ZYQUS'
          apiKey='46edf7593a0474c6207ba8d01c5f7ddd'
          indexName='App'
        >
        <SearchBox />
        <p>{' '}</p>
        <CurrentRefinements />
        <p>{' '}</p>
        <ClearAll/>
        <p>{' '}</p>
        <RefinementList showMore={true} className={style.refinement} attributeName='genres' />
        <p>{' '}</p>
        <Hits hitComponent={this.appDisplay}/>
        <Pagination />
        </InstantSearch>
      </div>
    );
  }
}
