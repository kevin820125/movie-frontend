import React from 'react'
import { Link } from "react-router-dom";
import './watchlist.css'

const WatchList = ({ id , name , photo}) =>{

    return (
        <div>
        <Link to={`/movie/${id}`}>
        <div className='name'>{name}</div>
        <img src = {`http://image.tmdb.org/t/p/w154${photo}`}></img>
        </Link>
        </div>
    )
}


export default WatchList;