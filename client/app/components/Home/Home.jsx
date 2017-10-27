import React, { PropTypes } from 'react';
import {Grid, Row, Col, ButtonToolbar, Button} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Create from './Create.jsx'
import Search from './Search.jsx'

import style from './Home.scss';

export default class Home extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired, // this is passed from the Rails view
    genres: PropTypes.array.isRequired
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
      genres: this.props.genres,
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
        <div className={style.maintitle}>
          <h1>Custom App Store</h1>
        </div>
        {
          this.state.menuVisible ?
            <div>
              <h3>
                {this.state.title}
              </h3>
              <Grid>
                <Row className={style.buttons}>
                  <ButtonToolbar>
                    <Col xs={8}>
                      <Button name='createButton' onClick={this.handleHideShow} bsSize='large'>
                        Create an App
                      </Button>
                    </Col>
                    <Col xs={4}>
                      <Button name='searchButton' onClick={this.handleHideShow} bsSize='large'>
                        Search Apps
                      </Button>
                    </Col>
                  </ButtonToolbar>
                </Row>
              </Grid>
            </div>
          :
            null
        }
        {
          this.state.createVisible ? <Create callbackResponse={(action, data) => this.onRequestResponse(action, data)} callbackHome={this.onBackButtonHitted} genres={this.state.genres} /> : null
        }
        {
          this.state.searchVisible ? <Search callbackResponse={(action, data) => this.onRequestResponse(action, data)} callbackHome={this.onBackButtonHitted} /> : null
        }
      </div>
    );
  }
}
