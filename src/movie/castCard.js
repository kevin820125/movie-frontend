import React from 'react'

let non = 'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png'

const castCard = ({name , photo}) =>{
    return (

<div className='slider-container-title'>
    {photo ? <img src ={`https://image.tmdb.org/t/p/w185${photo}`}></img>
    : <img style={{width:185 , height:278}}src ={`${non}`}></img>}
    <h4 style={{color:'brown'}}>{name}</h4>
</div>
    )
}

export default castCard;