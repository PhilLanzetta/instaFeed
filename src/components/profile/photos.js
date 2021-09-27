import { useState } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import PictureModal from './modal'

export default function Photos({ photos, profile }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageToShow, setImageToShow] = useState({})

  const handlePhotoClick = (photo) => {
    setImageToShow(photo)
    setIsModalOpen(true)
  }

  return (
    <div className='h-16 border-t border-gray-primary mt-12 pt-4'>
      <div className='grid grid-cols-3 gap-8 mt-4 mb-12'>
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : (
          <>
            {isModalOpen && (
              <PictureModal
                photos={photos}
                imageToShow={imageToShow}
                setImageToShow={setImageToShow}
                setIsModalOpen={setIsModalOpen}
                profile={profile}
              />
            )}
            {photos.length > 0
              ? photos.map((photo) => (
                  <div key={photo.photoId} className='relative group'>
                    <button
                      type='button'
                      aria-label='open photo info'
                      onClick={() => handlePhotoClick(photo)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handlePhotoClick(photo)
                        }
                      }}
                    >
                      <img src={photo.imageSrc} alt={photo.caption} />
                      <div className='absolute bottom-0 left-0 z-10 w-full justify-evenly items-center h-full bg-black-faded hidden group-hover:flex'>
                        <p className='flex items-center text-white font-bold'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-8 mr-4'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                              clipRule='evenodd'
                            />
                          </svg>
                          {photo.likes.length}
                        </p>
                        <p className='flex items-center text-white font-bold'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-8 mr-4'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z'
                              clipRule='evenodd'
                            />
                          </svg>
                          {photo.comments.length}
                        </p>
                      </div>
                    </button>
                  </div>
                ))
              : null}
          </>
        )}
      </div>
      {!photos ||
        (photos.length === 0 && (
          <p className='text-center text-2xl'>No Posts Yet</p>
        ))}
    </div>
  )
}

Photos.propTypes = {
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
