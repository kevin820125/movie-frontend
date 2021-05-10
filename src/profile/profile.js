import UserContext from '../auth/userContext';
import React, { useContext,useState,useEffect } from 'react';
import MovieApi from '../api/api'
import WatchList from '../movie/watchlist'
import Carousel from '../movie/Carousel'
import './profile.css'

const Profile = () =>{
    const {currentUser} = useContext(UserContext)
    const [movies , setMovies]= useState([])
    useEffect(() => {
        async function getMovieList(){
            const movieList = await MovieApi.getWatchList(currentUser.username)
            .then(res => 
                res.map(m =>MovieApi.movieDetail(m.movieid)))
            .then(res => Promise.all([...res]))
            .then(res => setMovies(res))
        }
        getMovieList();
        const img = <img src = {currentUser.photourl}/>
        console.log(img)
    }, [])

    async function handledelete(user , id){
        const left = movies.filter(m => m.id !== id)
        setMovies(left)
        return await MovieApi.deleteWatchListMovie(user , id)
    }

    return(
        
        <div style ={{textAlign:'center'}}>

            <h1 style={{color:'brown'}}>Profile</h1>

            <img className='profileImg' src = {currentUser.photourl} onError={(e)=>{e.target.onerror = null; e.target.src="data:image/png;base64,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"}}/> 
            <h2 style={{color:'brown'}}>username :</h2> 
            <p>{currentUser.username}</p>
            <h2 style={{color:'brown'}}>email :</h2> 
            <p>{currentUser.email}</p>
            <h3 style={{color:'brown' , marginTop:'70px'}}>Favorite</h3>
            <Carousel show={3}>
            {movies.length > 0 ? movies.map((w,idx) => (
                <div className = 'fav' key = {idx}>
                <WatchList
                    id = {w.id}
                    name = {w.original_title}
                    photo = {w.backdrop_path}
                    />
                <button className='delete-btn' onClick = {() => {handledelete(currentUser.username , w.id)}}>delete</button>
                </div>
            )) : <h4 style={{textAlign:'center' , color:'#50C7C7' , marginLeft:'-30px' , marginTop:'20px'}}> No favorite yet!</h4>}
            </Carousel>
        </div>
        
    )

}


export default Profile;