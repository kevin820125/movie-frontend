import './searchMovieArea.css'
import { Link } from "react-router-dom";
import React from 'react';
import { Form,Container, Button , Col} from "react-bootstrap";
let non = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJOIfoHL2lMdGCKKkitnzA3Zcl69F86CHRg&usqp=CAU'

const SearchMovieArea = ({id , name ,photo , releaseDate}) =>{
    let url = 'http://image.tmdb.org/t/p/w154'
    return (
        <div style={{marginLeft:'30px'}} className ='searchItem'>
            {console.log(id)}
            <Link to={`/movie/${id}`}>
            {photo ? <img src ={`${url}${photo}`}></img>
            : <img src ={`${non}`}></img>}
            </Link>
            <h5 style={{color:'white' , margin:'20px 0'}}>{name}</h5>
            <p>{releaseDate}</p>
        </div>
    )
}



export default SearchMovieArea;