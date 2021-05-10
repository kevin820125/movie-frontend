import './movieCommentCard.css'

const MovieCommentCard = ({username , comment}) =>{


    return (
        <div className='comment'>
            <div style={{color:'brown'}}>{username} : {comment}</div>
        </div>
    )
}


export default MovieCommentCard;