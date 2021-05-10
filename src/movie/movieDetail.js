import React , {useContext , useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import MovieApi from '../api/api'
import MovieCard from './moviecard'
import CastCard from './castCard'
import Carousel from './Carousel'
import MovieCommentCard from '../comment/movieCommentCard'
import UserContext from '../auth/userContext';
import MovieListArea from './movielistarea'
import ReactPlayer from "react-player";
import { Form,Container, Button , Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-regular-svg-icons'
import'./movieDetail.css'

const MovieDetail = () =>{
    const youtubeLink = 'https://www.youtube.com/watch?v='
    const {currentUser} = useContext(UserContext)
    let {id} = useParams();
    const [movie , setMovie] = useState(null)
    const [cast , setCast] = useState(null)
    const [commentArea , setCommentArea] = useState([])
    const [error , setError] = useState('')
    const [similar , setSimilar] = useState(null)
    const [vedio , setVedio] = useState(null)
    const [save , setSave] = useState(null)
    const [y , setY] = useState(true)
    let initial = {
        comment : ''
    }
    const [comment , setCommet] = useState(initial)
    useEffect(()=>{
        async function movie(){
            const Movie = await MovieApi.movieDetail(id)
            const Cast = await MovieApi.movieCast(id)
            const comment = await MovieApi.getComment(id)
            const getSimilar = await MovieApi.getSimilar(id)
            const v = await MovieApi.getVedio(id)
            if(currentUser){
                const list = await MovieApi.getWatchList(currentUser.username)
                setSave(list.map(l => l.movieid))
              }
            setVedio(v)
            setMovie(Movie)
            setCast(Cast)
            setCommentArea(comment)
            setSimilar(getSimilar)
        }
        movie()
    } , [comment , id , y ])
    
    async function addtoFav(movieId){
        await MovieApi.saveWatchList(currentUser.username , movieId)
        setY(!y)
      }
    
      async function deleteFav(movieId){
        await MovieApi.deleteWatchListMovie(currentUser.username , movieId)
        setY(!y)
      }

    
    if(!movie){
        return <div>Loading...</div>
    }


    const handleChange = (e) => {
        const {name , value} = e.target;
        setCommet(c =>(
            {
                ...c,
                [name] : value
            }
        ))
    }


    async function handleSubmit(e){
        e.preventDefault();
        if(comment.comment.length < 10 || comment.comment.length > 250){
            setError('comment length have to over 10 words and under 250 words')
        }
        const c = await MovieApi.leaveComment(currentUser.username , id , comment)
        setCommentArea(_ => {
            return [...commentArea , comment]
        })
        setCommet(initial)
    }




    return(
        <Container fluid>
            <MovieCard
                name = {movie.title}
                photo = {movie.backdrop_path}
                overview = {movie.overview}
                id ={id}
            />

            <h2 className='trailer'>Trailer</h2>
            {Array.isArray(save) && currentUser? 
                  save.includes(+id)? 
                <button className='fa' onClick = {()=>{deleteFav(id)}}><FontAwesomeIcon  size = '3x'  icon={faHeart} /></button> 
                : <button className='fa' onClick = {()=>{addtoFav(id)}}><FontAwesomeIcon  size = '3x' icon={fasHeart} /></button> 
                : null}
            <ReactPlayer className = 'film'controls = {true} url={`${youtubeLink}${vedio.key}`}/>


            {(commentArea && commentArea.length > 0)? 
                <div className='commentArea'>
                        {commentArea.map((c,idx) => (
                            <MovieCommentCard
                                key = {idx}
                                comment = {c.comment}
                                username = {c.username}
                            />
                        ))}
                </div>
            : <div className='commentArea'>No comment so far!</div>
            }

            {currentUser ? 
            <form className = 'commentform' onSubmit = {handleSubmit}>
                <label htmlFor='comment' style={{color:'brown'}}>{currentUser.username} :</label>
                <textarea
                    className='textarea'
                    onChange = {handleChange}
                    id = 'comment'
                    name = 'comment'
                    value = {comment.comment}
                    />
                <button className='comment-btn'>Submit</button>
            </form> : null }
            {error? <div style ={{color:'gold'}}className = 'error'>{error}</div> : null}



            <div>
                <hr style={{backgroundColor:'white' , width:600 , marginTop:70}}></hr>
                <h2 className='similar'>Similar Movie!</h2>
                {similar && similar.length > 0 ?
                    <Carousel show={4}>
                    {similar.map((m,idx) =>(
                    <div className='item' key = {idx}>
                        <MovieListArea 
                            key = {m.id}
                            id = {m.id}
                            name = {m.title}
                            />
                        </div>
                    ))}
                    </Carousel>
                : <h4 style ={{textAlign:'center' , color:'#B324D4'}}> Oh oh ! there is no similar Movie </h4>
                }
            </div>
            <div>
            <h2 className='similar'>Casts</h2>
            {cast ?             
                <Carousel show={4}>
                {cast.map((c,idx) =>(
                    <CastCard
                        key = {idx}
                        id = {c.cast_id}
                        name = {c.name}
                        photo = {c.profile_path}
                    />
                ))}
                </Carousel>
             : 
                <div> Loading....</div>}
            </div>
        </Container>
    )
}


export default MovieDetail;

