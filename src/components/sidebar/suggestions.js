import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';


export default function Suggestions({ loggedInUserId, following, loggedInUserDocId }) {
 const [profiles, setProfiles] = useState(null);

 useEffect(() => {
  async function getUsersNotFollowed() {
   const response = await getSuggestedProfiles(loggedInUserId, following);
   setProfiles(response);
  }
  if (loggedInUserId) {
   getUsersNotFollowed()
  }
 }, [loggedInUserId, following])

 return !profiles ? (
  <Skeleton count={1} height={150} className="mt-5" />
 ) : (
   <>
    {profiles.length > 0 &&
     <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
       <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
     {profiles.map(profile => <SuggestedProfile loggedInUserDocId={loggedInUserDocId} loggedInUserId={loggedInUserId} key={profile.docId} details={{ ...profile }} />)}
     </div>
     </div>
    }
   </>
  )
}

Suggestions.propTypes = {
 loggedInUserId: PropTypes.string,
 following: PropTypes.array,
 loggedInUserDocId: PropTypes.string
}