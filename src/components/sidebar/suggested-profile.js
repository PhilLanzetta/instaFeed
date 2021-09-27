import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {updateLoggedInUserFollowing, updateFollowedUserFollowers} from '../../services/firebase'

export default function Profile({ details, loggedInUserDocId, loggedInUserId }) {
 const { username, userId, docId } = details;
 const [followed, setFollowed] = useState(false);

 const handleFollowClick = async () => {
  setFollowed(true);

  await updateLoggedInUserFollowing(loggedInUserDocId, userId, false);

  await updateFollowedUserFollowers(docId,loggedInUserId, false);
  
 }

 return !followed ? (
  <div className="flex flex-row items-center align-items justify-between">
   <div className="flex items-center justify-between">
    <img
     className="rounded-full w-8 flex mr-3"
     src={`/images/avatars/${username}.jpg`}
     alt={username}
    />
    <Link to={`/p/${username}`}>
     <p className="font-bold text-sm">{username}</p>
    </Link>
   </div>
   <button
    type="button"
    className="text-xs font-bold text-blue-medium"
    onClick={handleFollowClick}
   >
    Follow
    </button>
  </div>
 ) : null;
}

Profile.propTypes = {
 details: PropTypes.object,
 loggedInUserDocId: PropTypes.string,
 loggedInUserId: PropTypes.string
}