import { getCategory, getStatus } from '../../../includes/variables';
import './styles.scss'

import { useDispatch } from 'react-redux';
import { removePost } from '../../../redux/postSlice';
import { Link } from 'react-router-dom';

import * as database from '../../../database';

export default function Post ({ id, title, address, jobType, paid, picture}) {

    const dispatch = useDispatch();

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


    const promoteStyle = paid ? 'promote-yes' : 'promote-no';


    return (
        <Link to={'/posts/' + id} className='post-component'>

            <h2>{title}</h2>
            <div className='description'>
                <img src={picture} alt={title} />
                <span>{address}</span>
            </div>

            <div className='info'>
                <div>
                    Service Type: <strong> {getCategory(jobType)} </strong>
                </div>
                <div className={promoteStyle}>
                    Service Paid: <strong>{paid ? 'Yes' : 'No'} </strong>
                </div>
            </div>
            <button onClick={handleRemoveClick}>Remove</button>
        </Link>
        
    )
}