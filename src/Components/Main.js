import React from 'react';
import MovieList from './MovieList';

export default function Main() {
	return (
		<>
			<header className="container header">
				Studio Ghibli Movie App
			</header>
			<MovieList />
		</>
	);
}
