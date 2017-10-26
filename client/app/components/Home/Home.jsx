import React, { PropTypes } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Create from './Create.jsx'
import Search from './Search.jsx'

import './Home.scss';

export default class Home extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { 
      title: this.props.title,
      menuVisible: true,
      createVisible: false,
      searchVisible: false,
      successRequestResponse: '',
      errorRequestResponse: ''
    };

    this.handleHideShow = this.handleHideShow.bind(this);
    this.onBackButtonHitted = this.onBackButtonHitted.bind(this);
  }

  onRequestResponse(action, data) {
    console.log('onRequestResponse')
    console.log(data)
    if (data.status == 200) {
      NotificationManager.success(`App ${action} with success`, 'Success', 3000);
    } else {
      NotificationManager.error(`Error, App has not been ${action}`, 'Error', 3000);
    }
    this.setState({
      menuVisible: true,
      createVisible: false,
      searchVisible: false
    })
  }

  onBackButtonHitted() {
    this.setState({
      menuVisible: true,
      createVisible: false,
      searchVisible: false
    })
  }

  handleHideShow(event) {
    const target = event.target
    const name = target.name

    if (name == 'createButton') {
      this.setState({
        menuVisible: false,
        createVisible: true,
        searchVisible: false
      })
    } else {
      this.setState({
        menuVisible: false,
        createVisible: false,
        searchVisible: true
      })
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={6} xsOffset={3}>
              <h3>
                {this.state.title}
              </h3>
            </Col>
          </Row>
        </Grid>

        {
          this.state.menuVisible ?
            <div>
              <button name='createButton' onClick={this.handleHideShow}>
                Create an App
              </button>
              <button name='searchButton' onClick={this.handleHideShow}>
                Search Apps
              </button>
            </div>
          :
            null
        }
        {
          this.state.createVisible ? <Create callbackResponse={(action, data) => this.onRequestResponse(action, data)} callbackHome={this.onBackButtonHitted} /> : null
        }
        {
          this.state.searchVisible ? <Search callbackResponse={(action, data) => this.onRequestResponse(action, data)} callbackHome={this.onBackButtonHitted} /> : null
        }
      </div>
    );
  }
}
