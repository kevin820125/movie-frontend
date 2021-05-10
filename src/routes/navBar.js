import React , {useContext} from 'react'
import { NavLink,Link } from 'react-router-dom'
import UserContext from '../auth/userContext';
import SearchBar from './searchBar'
import './navBar.css'
const NavBar = ({logout}) =>{
    const {currentUser} = useContext(UserContext)


    function logOutNav(){
        return(
            <nav role="navigation" className="primary-navigation">
            <ul>
                <li><NavLink to='/login'>login</NavLink></li>
                <li><NavLink to='/signup'>Sign Up</NavLink></li>
            </ul>
            </nav>
            )
    }

    function logInNav(){
        return (
        <nav role="navigation" className="primary-navigation">
        <ul>
            <li><NavLink to='/' onClick = {logout}>logOut | {currentUser.username}</NavLink></li>
            <li><NavLink to ='/profile/'>Profile</NavLink></li>
        </ul>
        </nav>
        )
    }


    return (
        <div>
        <nav>
            <Link className="navbar-brand" to='/'>
                <img className='logo'src = 'https://image.freepik.com/free-vector/click-movie-logo-vector_18099-258.jpg'/>
            </Link>
            { currentUser=== null ? logOutNav() : logInNav()}
        </nav>
        <SearchBar/>
        </div>
    )
}

export default NavBar;