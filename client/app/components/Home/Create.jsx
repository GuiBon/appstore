import React from 'react';

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
      genres: props.genres
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
    // Check name fields
    if (this.state.name != '' && this.state.name != null &&
        this.state.price >= 0 && this.state.price.isFloat() &&
        this.state.rating >= 0 && this.state.rating <= 5 && this.state.rating.isFloat())
    {
      true
    } else {
      false
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.handleValidation) {
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
        <button name='backButton' onClick={this.handleBack}>
          Back
        </button>
        <form>
          <div>
            <label>
              Name:
              <input 
                name='name'
                type='text' 
                value={this.state.name} 
                onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              Genres:
              <select multiple={true} onChange={this.handleGenreChange}>{this.state.genres.map((g) => { return <option>{g}</option> }) }</select>
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
          <div>
            <input 
              type='submit'
              value='Submit'
              onClick={this.handleSubmit} />
          </div>
        </form>
      </div>
    );
  }
}
