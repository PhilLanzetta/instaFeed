import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PictureModal = ({
  imageToShow,
  setIsModalOpen,
  setImageToShow,
  photos,
  profile,
}) => {
  const [showPrevArr, setShowPrevArr] = useState(true)
  const [showNextArr, setShowNextArr] = useState(true)

  const showPrev = () => {
    const currentIndex = photos.indexOf(imageToShow)
    if (currentIndex === 1) {
      const nextImage = photos[currentIndex - 1]
      setImageToShow(nextImage)
      setShowPrevArr(false)
    } else {
      const nextImage = photos[currentIndex - 1]
      setImageToShow(nextImage)
      setShowNextArr(true)
    }
  }

  const showNext = () => {
    const currentIndex = photos.indexOf(imageToShow)
    if (currentIndex >= photos.length - 2) {
      const nextImage = photos[currentIndex + 1]
      setImageToShow(nextImage)
      setShowNextArr(false)
    } else {
      const nextImage = photos[currentIndex + 1]
      setImageToShow(nextImage)
      setShowPrevArr(true)
    }
  }

  return (
    <div className='fixed inset-0 bg-black-faded z-20 flex'>
      {showNextArr && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-10 w-10 absolute inset-y-1/2 right-10'
          fill='none'
          viewBox='0 0 24 24'
          stroke='white'
          onClick={showNext}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      )}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-8 w-8 absolute top-4 right-4'
        fill='none'
        viewBox='0 0 24 24'
        stroke='white'
        onClick={() => {
          setIsModalOpen(false)
        }}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
      {showPrevArr && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-10 w-10 absolute inset-y-1/2 left-10'
          fill='none'
          viewBox='0 0 24 24'
          stroke='white'
          onClick={showPrev}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
      )}
      <div className='relative m-auto bg-gray-background flex md:flex-row flex-col h-3/4 md:h-96'>
        <img
          src={imageToShow.imageSrc}
          alt={imageToShow.caption}
          className='max-h-96 flex'
        />
        <div className='flex flex-col max-w-xs max-h-96 overflow-y-scroll'>
          <div className='flex items-center border-b border-gray-primary p-4'>
            <img
              className='rounded-full h-10 w-10 flex mr-4'
              alt={`${profile.username}`}
              src={`/images/avatars/${profile.username}.jpg`}
            />
            <p className='font-bold'>{profile.username}</p>
          </div>
          <div className='overflow-y-scroll'>
            {imageToShow.comments.map((comment, index) => {
              console.log(comment)
              return (
                <div key={index} className='p-4 flex'>
                  <img
                    className='rounded-full h-10 w-10 flex mr-4'
                    alt={`${comment.displayName}`}
                    src={`/images/avatars/${comment.displayName}.jpg`}
                  />

                  <p>
                    <span className='font-bold'>{comment.displayName}</span>{' '}
                    {comment.comment}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PictureModal

PictureModal.propTypes = {
  imageToShow: PropTypes.object.isRequired,
  setImageToShow: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
  }).isRequired,
}
