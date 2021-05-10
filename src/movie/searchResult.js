import React , {useContext , useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import MovieApi from '../api/api'
import Carousel from './Carousel'
import SearchMovieArea from '../movie/searchMovieArea'
import { Form,Container, Row , Col} from "react-bootstrap";


const SearchResult = () =>{
    const {movie}= useParams();
    const [movies , setMovies] = useState([])


    useEffect(() => {
        async function getMovieList(){
        const movieList = await MovieApi.searchMovies(movie)
        setMovies(movieList.results)
        console.log(movies)
        }
        getMovieList();
    }, [])


    return (
        <div>
        <div>MovieList</div>
         {movies ? 
        <Container>
            <Row>
            {movies.map(m => (
                <Col xs={6} md={4}>
                <SearchMovieArea
                    key = {m.id}
                    id = {m.id}
                    name =  {m.title}
                    photo = {m.poster_path}
                    releaseDate = {m.release_date}             
                />
                </Col>
            ))}
        </Row>
        </Container>:null
        }
        </div>
        
    )

}



export default SearchResult;
