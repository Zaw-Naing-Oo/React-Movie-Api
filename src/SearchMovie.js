import React from 'react'
import { useState } from 'react';
import MovieCard from './MovieCard';

const SearchMovie = () => {

    const [query, setQuery] = useState('');
    const [movies, setMovie] = useState([]); 

    const searchMovie =  async (e) => {
        e.preventDefault();

        // You can search movies with title wherever you want.But you need to change origin example of search movie api.One things you need to do is that is you need to add query( query name is wherever title you wanted) after api key.Testing url is in below

        // const testUrl = 'https://api.themoviedb.org/3/search/movie?api_key=abbb3df0215795b43f4558ab0bcf19cf&query=batman';

        // const query = 'Moon Knight';

        // query is dynamic value that come from input
        const url = `https://api.themoviedb.org/3/search/movie?api_key=abbb3df0215795b43f4558ab0bcf19cf&language=en-US&query=${query}&page=2&include_adult=false`;

        try{
            const res = await fetch(url);
            const data = await res.json();
            setMovie(data.results);
            console.log(data);
        }catch(err) {
            console.error(err)
        }
       
    }
    
    // you can create custom function like this
    // const search = (e) => {
    //     setQuery(e.target.value);
    // }

  return (
    <div>
        <form className='form' onSubmit={searchMovie}>
            <label forhtml="query" className='label'>Movie Name</label>
            <input
                type='text'
                id='query'
                placeholder='i.e . Batman'
                onChange={ (e) => setQuery(e.target.value)}
                value={query}
                />
            <button className='button' type='submit'>Search</button>
        </form>
        <div className='card-list'>
           { movies.filter(movie => movie.poster_path).map(movie => (
               <MovieCard movie={movie}  key={movie.id} />
           )) }
        </div>
    </div>
  )
}

export default SearchMovie