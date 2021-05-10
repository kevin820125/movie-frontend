import { Link } from "react-router-dom";
import MovieApi from '../api/api'
import React , {useState , useEffect} from 'react';
import './movieListarea.css'
let non = 'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png'

const MovieListArea = ({id , name ,releaseDate}) =>{
    let url = 'http://image.tmdb.org/t/p/w154'
    const [poster , setPoster] = useState([])
    useEffect(()=>{
      async function gg () {
        const response = await MovieApi.poster(id);
        return setPoster(response);
      };
      gg();
    } , [id])
    return (
        <div className ='card'>
            <Link to={`/movie/${id}`}>
            {poster.file_path ? <img className = 'photo' src ={`${url}${poster.file_path}`}></img>
            : <img className = 'photo' src ={`${non}`}></img>}
            <h5 style={{color:'white'}}className='movieTitle'>{name}</h5>
            <p className = 'releaseDate'>{releaseDate}</p>
            </Link>
        </div>
    )
}



export default MovieListArea;