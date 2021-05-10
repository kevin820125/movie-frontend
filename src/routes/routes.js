import React , {useState} from "react";
import { Switch, Route } from "react-router-dom";
import MovieList from '../movie/movieList'
import MovieDetail from '../movie/movieDetail'
import LoginForm from '../auth/login'
import SignUpForm from '../auth/signup'
import Profile from '../profile/profile'
import SearchResult from '../movie/searchResult'






const Routes = ({login , signup}) =>{
    return(
        <Switch>
            <Route exact path='/'>
                <MovieList/>
            </Route>
            <Route exact path='/login' >
                <LoginForm login = {login}/>
            </Route>
            <Route exact path='/movie/:id'>
                <MovieDetail/>
            </Route>
            <Route exact path='/profile'>
                <Profile/>
            </Route>
            <Route exact path='/signup' >
                <SignUpForm signup = {signup}/>
            </Route>
            <Route exact path = '/movie/search/:movie'>
                <SearchResult/>
            </Route>
        </Switch>
    )
}



export default Routes;