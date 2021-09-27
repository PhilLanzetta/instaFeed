import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase'

export default function Header({ photosCount, profile, followerCount, setFollowerCount }) {
 const { user: loggedInUser } = useUser();
 const [isFollowingProfile, setIsFollowingProfile] = useState(false);
 const activeBtnFollow = loggedInUser && loggedInUser.username && loggedInUser.username !== profile.username;

 const handleToggleFollow = async () => {
  setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);

  await updateLoggedInUserFollowing(loggedInUser.docId, profile.userId, isFollowingProfile);

  await updateFollowedUserFollowers(profile.docId, loggedInUser.userId, isFollowingProfile);

  setFollowerCount({
   followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
  })
 }

 useEffect(() => {
  const isLoggedInUserFollowingProfile = async () => {
   const isFollowing = await isUserFollowingProfile(loggedInUser.username, profile.userId);
   setIsFollowingProfile(isFollowing);
  }

  if (loggedInUser.username && profile.userId) {
   isLoggedInUserFollowingProfile()
  }
 }, [loggedInUser, profile])

 return <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
  <div className="container flex justify-center">
   {profile.username && <img
    className="rounded-full h-40 w-40 flex"
    alt={`${profile.username}`}
    src={`/images/avatars/${profile.username}.jpg`}
   />}
  </div>
  <div className="flex items-center justify-center flex-col col-span-2">
   <div className="container flex items-center">
    <p className="text-2xl mr-4">
     {profile.username}
    </p>
    {activeBtnFollow && (
     <button
      className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
      type="button"
      onClick={handleToggleFollow}
      onKeyDown={(e) => {
       if (e.key === 'Enter') {
        handleToggleFollow();
       }
      }}
     >{isFollowingProfile ? 'Unfollow' : 'Follow'}</button>
    )}
   </div>
   <div className="container flex mt-4">
    {!profile.followers || !profile.following ? (
     <Skeleton count={1} width={677} height={24} />
    ) : (
    <>
    <p className="mr-10">
     <span className="font-bold">{photosCount}</span>{' '}{photosCount === 1 ? 'photo' : 'photos'}
    </p>
    <p className="mr-10">
     <span className="font-bold">{followerCount}</span>{' '}{followerCount === 1 ? 'follower' : 'followers'}
    </p>
    <p className="mr-10">
     <span className="font-bold">{profile.following.length}</span> following
    </p>
    </>
    )
}
   </div>
   <div className="container mt-4">
    <p className="font-medium">
     {!profile.fullName ? <Skeleton count={1} height={24} /> : profile.fullName}
    </p>
   </div>
  </div>
 </div>
}

Header.propTypes = {
 photosCount: PropTypes.number.isRequired,
 followerCount: PropTypes.number.isRequired,
 setFollowerCount: PropTypes.func.isRequired,
 profile: PropTypes.shape({
  docId: PropTypes.string,
  userId: PropTypes.string,
  username: PropTypes.string,
  fullName: PropTypes.string,
  following: PropTypes.array,
  followers: PropTypes.array
 }).isRequired,
}

