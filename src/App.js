import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes/routes'
import MovieApi from './api/api'
import jwt from "jsonwebtoken";
import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from './routes/navBar'
import UserContext from './auth/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
export const TOKEN_STORAGE_ID = "jobly-token";
function App() {
  const [currentUser , setCurrentUser] = useState(null)
  const [token , setToken] = useLocalStorage(TOKEN_STORAGE_ID)
  const [ifload , setIfLoad] = useState(false)

  useEffect(()=>{
    async function getCurrentUser(){
      if(token){
        try{
          let {username} = jwt.decode(token)
          MovieApi.token = token;
          let currentUser =await MovieApi.getUser(username)
          console.log(currentUser)
          setCurrentUser(currentUser)  
        }catch(e){
          console.log(e)
          setCurrentUser(null)
        }
      }
      setIfLoad(true)
    }
    setIfLoad(false);
    getCurrentUser();
  } , [token])


  async function signUp(data){
    try{

      let token = await MovieApi.signUp(data)
      setToken(token)
      return {success : true}
    }catch(e){
      console.log(e)
      return {success : false}
    }
  }

  async function logIn(data){
    try{

      let token = await MovieApi.logIn(data)
      setToken(token)
      return {success : true}
    }catch(e){
      console.log(e)
      return {success : false}
    }
  }


  function logOut(){
    setToken(null);
    setCurrentUser(null);
  }






  if(!ifload) return <div>loading...</div>;
  return (
    <BrowserRouter>
    <UserContext.Provider value ={{currentUser , setCurrentUser}}>
    <div className="App">
      <NavBar logout = {logOut}/>
      <Routes login = {logIn} signup = {signUp}/>
    </div>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
