import React from 'react';

export default function Movie({ movie }) {
	return (
		<article className="movie">
			<header className="title">
				<h1>{movie.title}</h1>
			</header>
			<section className="content">
				<p>Director: {movie.director}</p>
				<p>Producer: {movie.producer}</p>
				<p>Released: {movie.release_date}</p>
				<p>RT Score: {movie.rt_score}</p>
				<p>{movie.description}</p>
			</section>
		</article>
	);
}

// let url = "https://api.themoviedb.org/3/search/movie?"
// let apiKey = "edf9f7ad6328e159776512b1f47eb5e5"
// let query = "spirited away"
// axios.get(url, {params: {
//     query: query
// }})
