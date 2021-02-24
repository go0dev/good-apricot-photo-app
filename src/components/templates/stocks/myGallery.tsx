import React, { FC, RefObject, ChangeEvent } from 'react';
import Masonry from 'components/molecules/masonry';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ImageCard from 'components/molecules/imageCard';
import { usePhotoActions, usePhotos } from 'hooks/photo';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1),
    maxHeight: '100%',
  },
}));

type Props = {
  inputRef: RefObject<HTMLInputElement>;
};

const MyGalleryContents: FC<Props> = ({ inputRef }) => {
  const classes = useStyles();
  const { photos } = usePhotos();
  const { addPhotos } = usePhotoActions();

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const photoFiles = Array.from(files);
      await addPhotos(photoFiles);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Masonry>
          {photos.map(({ imageUrl, id }, index) => (
            <ImageCard key={id} src={imageUrl} order={index} />
          ))}
        </Masonry>
      </div>

      <input
        ref={inputRef}
        type="file"
        id="upload-button"
        accept="image/*"
        onChange={handleInputChange}
        hidden
        multiple
      />
    </>
  );
};

export default MyGalleryContents;
