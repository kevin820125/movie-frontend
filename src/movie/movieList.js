
import React , {useState , useEffect , useContext} from 'react';
import UserContext from '../auth/userContext';
import MovieApi from '../api/api'
import MovieListArea from './movielistarea'
import Carousel from './Carousel'
import './movieList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-regular-svg-icons'
const MovieList = ()=>{
    const {currentUser} = useContext(UserContext)
    const [popular , setPopular] = useState([])
    const [topRate , setTopRate] = useState([])
    const [upComing , setUpComing] = useState([])
    const [save , setSave] = useState(null)
    const [y , setY] = useState(true)
  useEffect(()=>{
    async function gg () {
      const p = await MovieApi.getMovies();
      const t = await MovieApi.getToprate();
      const u = await MovieApi.getUpcoming();
      if(currentUser){
        const list = await MovieApi.getWatchList(currentUser.username)
        setSave(list.map(l => l.movieid))
      }
      setPopular(p)
      setTopRate(t)
      setUpComing(u)
    };
    gg();
  } , [y])

  async function addtoFav(movieId){
    await MovieApi.saveWatchList(currentUser.username , movieId)
    console.log('save')
    setY(!y)
  }

  async function deleteFav(movieId){
    await MovieApi.deleteWatchListMovie(currentUser.username , movieId)
    console.log('delete')
    setY(!y)
  }
  
  return (
      <div>
            <h1 className = 'title' >Popular Movie</h1>
            <Carousel show={5} infiniteLoop={true}>
            {popular.map((m,idx) =>(
              <div className='item' key = {idx}>
                {Array.isArray(save) && currentUser? 
                  save.includes(m.id)? 
                <button className='fa' onClick = {()=>{deleteFav(m.id)}}><FontAwesomeIcon  size = '2x'  icon={faHeart} /></button> 
                : <button className='fa' onClick = {()=>{addtoFav(m.id)}}><FontAwesomeIcon  size = '2x' icon={fasHeart} /></button> 
                : null}
                <MovieListArea 
                      key = {m.id}
                      id = {m.id}
                      name = {m.title}
                      releaseDate = {m.release_date}
                      votecount = {m.vote_count}
                      add = {addtoFav}
                      delete = {deleteFav}
                      />
                </div>
            ))}
            </Carousel>


          <h1 className = 'title' >Top Rate Movie</h1>

          <Carousel show={5}>
          {topRate.map((m,idx) =>(
            <div className='item' key = {idx}>
                              {Array.isArray(save) && currentUser? 
                  save.includes(m.id)? 
                <button className='fa' onClick = {()=>{deleteFav(m.id)}}><FontAwesomeIcon size = '2x' icon={faHeart} /></button> 
                : <button className='fa' onClick = {()=>{addtoFav(m.id)}}><FontAwesomeIcon  size = '2x' icon={fasHeart} /></button> 
                : null}
              <MovieListArea 
                    key = {m.id}
                    id = {m.id}
                    name = {m.title}
                    releaseDate = {m.release_date}
                    votecount = {m.vote_count}
                    photo = {m.backdrop_path}
                    add = {addtoFav}
                    delete = {deleteFav}
                    />
                    </div>
          ))}
          </Carousel>


          <h1 className = 'title' >UpComing Movie</h1>

          <Carousel show={5}>
          {upComing.map((m,idx) =>(
            <div className='item' key = {idx}>
                              {Array.isArray(save) && currentUser? 
                  save.includes(m.id)? 
                <button className='fa' onClick = {()=>{deleteFav(m.id)}}><FontAwesomeIcon  size = '2x'  icon={faHeart} /></button> 
                : <button className='fa' onClick = {()=>{addtoFav(m.id)}}><FontAwesomeIcon size = '2x'  icon={fasHeart} /></button> 
                : null}
              <MovieListArea 
                    key = {m.id}
                    id = {m.id}
                    name = {m.title}
                    releaseDate = {m.release_date}
                    votecount = {m.vote_count}
                    photo = {m.backdrop_path}
                    add = {addtoFav}
                    delete = {deleteFav}
                    />
                    </div>
          ))}
          </Carousel>

      </div>
  )
  }

  export default MovieList;