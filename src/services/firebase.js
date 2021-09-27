import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();


  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .get()

  const profiles = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  })).filter((profile) => profile.userId !== userId && !following.includes(profile.userId));

  return profiles
};

export async function updateLoggedInUserFollowing(loggedInUserDocId, userId, isFollowingProfile) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
    })
}

export async function updateFollowedUserFollowers(userDocId, loggedInUserId, isFollowingProfile) {
  return firebase
    .firestore()
    .collection('users')
    .doc(userDocId)
    .update({
      followers: isFollowingProfile ? FieldValue.arrayRemove(loggedInUserId) : FieldValue.arrayUnion(loggedInUserId)
    })
}

export async function getPhotosOfFollowedUsers(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(userFollowedPhotos.map(async (photo) => {
    let userLikedPhoto = false;
    if (photo.likes.includes(userId)) {
      userLikedPhoto = true;
    }
    const user = await getUserByUserId(photo.userId);
    const { username } = user[0];
    return { username, ...photo, userLikedPhoto }
  })
  );

  return photosWithUserDetails;

}

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.docId
  }))
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get()

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return response.username;
}