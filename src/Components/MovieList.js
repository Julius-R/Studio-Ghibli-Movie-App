import React, { Component } from 'react';
import Movie from './Movie';
import axios from 'axios';

export default class MovieList extends Component {
	state = {
		data: [],
		filteredMovies: [],
		filterTerms: []
	};
	filterMovies(filterVal) {
		let term = filterVal.target.value;

		console.log(term);
		if (term !== 'null') {
			let results = this.state.data.filter(movie => {
				return movie.producer === term;
			});
			return this.setState({
				filteredMovies: results
			});
		} else {
			this.setState({
				filteredMovies: this.state.data
			});
		}
	}
	componentDidMount() {
		const getFilms = async () => {
			let data = await axios.get('https://ghibliapi.herokuapp.com/films');
			return data.data;
		};
		getFilms()
			.then(data => {
				console.log(data);
				this.setState({
					data: [...data]
				});
			})
			.then(() => {
				let terms = this.state.data.map(movie => {
					return movie.producer;
				});
				let filters = new Set(terms);
				this.setState({
					filteredMovies: this.state.data,
					filterTerms: Array.from(filters)
				});
			});
	}
	render() {
		return (
			<section className="movieList">
				<section className="filter">
					<select onChange={this.filterMovies.bind(this)}>
						<option value="null">Filter By Produdcer</option>
						{this.state.filterTerms.map(term => {
							return (
								<option key={term} value={term}>
									{term}
								</option>
							);
						})}
					</select>
				</section>
				<p>Movies List</p>
				<section className="movies">
					{this.state.filteredMovies.map(movie => {
						return <Movie key={movie.id} movie={movie} />;
					})}
				</section>
			</section>
		);
	}
}
