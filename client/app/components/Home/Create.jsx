import React from 'react';
import {Grid, Row, Col, ButtonToolbar, Button} from 'react-bootstrap';

import style from './Create.scss'

export default class Create extends React.Component {
  constructor(props, _railsContext) {
    super(props);

    this.state = { 
      name: '',
      price: 0,
      selectedGenres: [],
      rating: 0,
      link: '',
      image: '',
      genres: props.genres,
      formErrors: {name: '', genres: '', price: '', rating: ''},
      nameValid: true,
      genresValid: true,
      priceValid: true,
      ratingValid: true,
      formValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.callbackHome()
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    });
  }

  handleGenreChange(event) {
    const options = event.target.options;
    let genres = []
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        genres.push(options[i].value);
      }
    }

    this.setState({
      selectedGenres: genres
    })
  }

  handleValidation() {
    let nameValid = this.state.nameValid;
    let genresValid = this.state.genresValid;
    let priceValid = this.state.priceValid;
    let ratingValid = this.state.ratingValid;

    // Check name field
    nameValid = (this.state.name === '' || this.state.name === null) ? false : true;
    // Check genres field
    genresValid = (this.state.selectedGenres.length === 0) ? true : true; // Disable at the moment because of the error on Heroku
    // Check price field
    priceValid = (this.state.price < 0) ? false : true;
    // Check rating field
    ratingValid = (this.state.rating < 0 || this.state.rating > 5) ? false : true

    this.setState({ nameValid: nameValid,
                    genresValid: genresValid,
                    priceValid: priceValid,
                    ratingValid: ratingValid,
                    formValid: nameValid && genresValid && priceValid && ratingValid});

    if (this.state.formValid) {
      return (true)
    } else {
      return (false)
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.handleValidation()) {
      const data = {
        name: this.state.name,
        genres: this.state.selectedGenres,
        price: this.state.price,
        rating: this.state.rating,
        link: this.state.link,
        image: this.state.image
      }
  
      $.ajax({
        url: '/api/1/apps',
        type: 'POST',
        data: { app: data },
        context: this,
        success: function(data) { 
          this.props.callbackResponse('created', data)
        },
        error: function(data) { 
          this.props.callbackResponse('created', data)
        }
      });
    }
  }

  render() {
    return (
      <div>
        <ButtonToolbar className={style.backButton}>
          <Button name='backButton' onClick={this.handleBack} bsStyle='primary'>
            Back
          </Button>
        </ButtonToolbar>
        <form>
          <div>
            <label>
              Name:
              <input 
                name='name'
                type='text' 
                value={this.state.name} 
                onChange={this.handleChange} />
                {
                  this.state.nameValid ? '' : <p>Name must not be blank</p>
                }
            </label>
          </div>
          <div>
            <label>
              Genres:
              <select multiple={true} onChange={this.handleGenreChange}>{this.state.genres.map((g) => { return <option>{g}</option> }) }</select>
              {
                this.state.genresValid ? '' : <p>At least one genres needed</p>
              }
            </label>
          </div>
          <div>
            <label>
              Price:
              <input 
                name='price'
                type='float'
                value={this.state.price}
                onChange={this.handleChange} />
              {
                this.state.priceValid ? '' : <p>Price must be a number superior to 0</p>
              }
            </label>
          </div>
          <div>
            <label>
              Rating:
              <input 
                name='rating'
                type='float'
                value={this.state.rating}
                onChange={this.handleChange} />
              {
                this.state.ratingValid ? '' : <p>Rating must be a number between 0 and 5</p>
              }                
            </label>
          </div>
          <div>
            <label>
              Link:
              <input 
                name='link'
                type='text'
                value={this.state.link}
                onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              Image:
              <input 
                name='image'
                type='text'
                value={this.state.image}
                onChange={this.handleChange} />
            </label>
          </div>
          <ButtonToolbar className={style.submitButton}>
            <Button 
              type='submit'
              onClick={this.handleSubmit}
              bsStyle='success' >
              Submit
            </Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}
