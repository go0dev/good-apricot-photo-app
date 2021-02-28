import React, { FC, ChangeEvent, useRef, Suspense } from 'react';
import Masonry from 'components/molecules/masonry';
import ImageCard from 'components/molecules/imageCard';
import HomeFab from 'components/organisms/fabs/homeFab';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMyPhotos } from './useMyPhotos';

const Home: FC = () => {
  const { state, actions } = useMyPhotos();
  const { photos, loading, error } = state;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const photoFiles = Array.from(files);
      await actions.addPhotos(photoFiles);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Suspense fallback={<CircularProgress />}>
          <Box margin={1} maxHeight="100%">
            <Masonry>
              {photos.map(({ imageUrl, id }, index) => (
                <ImageCard key={id} src={imageUrl} order={index} />
              ))}
            </Masonry>
          </Box>
        </Suspense>
      )}
      <input
        type="file"
        ref={inputRef}
        id="upload-button"
        accept="image/*"
        onChange={handleInputChange}
        hidden
        multiple
      />
      <HomeFab show handleClick={handleClick} />
    </>
  );
};

export default Home;
