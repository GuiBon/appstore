import React, { PropTypes } from 'react';

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
        Hello
      </div>
    );
  }
}
