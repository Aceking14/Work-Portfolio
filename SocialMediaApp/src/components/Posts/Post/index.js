import { getCategory, getStatus } from '../../../includes/variables';
import './styles.scss'
import { BiLike, BiDislike } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { likePost, dislikePost, removePost } from '../../../redux/postSlice';
import { Link } from 'react-router-dom';

import * as database from '../../../database';

export default function Post ({ id, title, description, category, promote, status, picture, likes, dislikes, onPostLike, onPostDislike }) {

    const {allowLikes, allowDislikes } = useSelector((state) => state.settings);
    const dispatch = useDispatch();

    const handleLikeClick = async (event) => {
        event.preventDefault();
        dispatch(likePost(id));

        const data = {likes: likes + 1};
        const updated = await database.update(id,data)

        if (!updated) {
            // TODO: Improve Error Message.
            // TODO: Create a Redux action to remove one like.
           alert('Failed to update likes.');

        }
    }

    const handleDislikeClick = async (event) => {
        event.preventDefault();
        dispatch(dislikePost(id));

        const data = {dislikes: dislikes + 1};
        const updated = await database.update(id, data)

        if (!updated) {
            // TODO: Improve Error Message.
            // TODO: Create a Redux action to remove one like.
           alert('Failed to update dislikes.');
        }
    }

    const handleRemoveClick = async (event) => {
        event.preventDefault();

        // Remove from Redux store.
        dispatch(removePost(id));

        // Remove from Database.
        const removed = await database.remove(id);
        if (!removed) {
            alert('Failed to remove post.');
            //TODO: Improve this Error Message.
        }
    }


    const promoteStyle = promote ? 'promote-yes' : 'promote-no';

    let rateClassName = 'rate';
    if (!allowLikes || !allowDislikes) {
        rateClassName += ' rate-single-button';
    }

    return (
        <Link to={'/posts/' + id} className='post-component'>

            <h2>{title}</h2>
            <div className='description'>
                <img src={picture} alt={title} />
                <span>{description}</span>
            </div>

            <div className='info'>
                <div>
                    Category: <strong> {getCategory(category)} </strong>
                </div>
                <div>
                    Status: <strong>{getStatus(status)} </strong>
                </div>
                <div className={promoteStyle}>
                    Promote: <strong>{promote ? 'Yes' : 'No'} </strong>
                </div>
            </div>

            {(allowLikes || allowDislikes) && (
                <div className={rateClassName}>
                    { allowLikes && (<button title='i like this' className='like' onClick={handleLikeClick}><BiLike />{likes}</button>)}
                    { allowDislikes && (<button title='i dislike this' className='dislike' onClick={handleDislikeClick}><BiDislike/>{dislikes}</button>)}
                </div>
            )}
            <button onClick={handleRemoveClick}>Remove</button>
        </Link>
        
    )
}