import React from 'react'
import './movieCard.css'
import { Form,Container, Button , Col} from "react-bootstrap";

const MovieCard = ({id , name ,releaseDate, photo , overview}) =>{
    return (

<Container>
    <h1 className='title'>{name}</h1>
    <p className='release'>{releaseDate}</p>
    <p className='overview'>{overview}</p>
   <img className = 'image'src ={`https://image.tmdb.org/t/p/w1280${photo}`}></img>
</Container>
    )
}

export default MovieCard;