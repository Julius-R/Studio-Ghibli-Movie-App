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
			this.setState({
				filteredMovies: this.state.data.filter(movie => {
					if (movie.producer === term) {
						return movie;
					}
				})
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
			<>
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
				<section className="movies">
					<p>Movie List</p>
					{this.state.filteredMovies.map(movie => {
						return <Movie key={movie.id} movie={movie} />;
					})}
				</section>
			</>
		);
	}
}
