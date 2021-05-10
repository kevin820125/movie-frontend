import React , {useState} from 'react'
import {Link , useHistory} from 'react-router-dom'
import MovieApi from '../api/api'
import './searchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const SearchBar = () =>{
    const element = <FontAwesomeIcon icon={faSearch} />
    const history = useHistory();
    const [item , setItem] = useState('')
    const [error , setError] = useState('')
    const [movies , setMovies] = useState([])
    async function handleSubmit (e){
        e.preventDefault();
        const movie = await MovieApi.searchMovies(item || 'null')
        if(movie.results.length === 0){
            setError(`Oh oh!! I can't find this movie in my database!`)
        }else if(movie.results.length === 1){
            const id = movie.results[0].id
            history.push(`/movie/${id}`)
            setError('')
            setItem('')
        }else{
            setItem('')
            setError('')
            history.push(`/movie/search/${item}`)
        }
    }

    return(
        <div>
            <i className = {element}></i>
        <div className = 'search-box'>
            <form onSubmit = {handleSubmit}>
            <input className='search-text' name='search'placeholder="Search..." value = {item} onChange = {e => setItem(e.target.value)} type="text"/>
            <button className = 'search-btn'><FontAwesomeIcon icon={faSearch} /></button>
            </form>
        </div>
        {error ? <h5>{error}</h5> : null}
        </div>
    )


}



export default SearchBar;