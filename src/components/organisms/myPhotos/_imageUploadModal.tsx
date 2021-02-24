import { FC, useState, RefObject, ChangeEvent } from 'react';
import TransitionsModal from 'components/molecules/modal';
import ImageCard from 'components/molecules/imageCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  contents: {
    padding: '0 3vw',
    display: 'flex',
  },
});

type Props = {
  inputRef: RefObject<HTMLInputElement>;
  handleCanSwipe: (canSwipe: boolean) => void;
};

const ImageUploadModal: FC<Props> = ({ inputRef, handleCanSwipe }) => {
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(
    null,
  );
  const classes = useStyles();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    const image = new Image();
    image.onload = () => {
      setSelectedImage(image);
    };
    image.src = URL.createObjectURL(files[0]);
    handleCanSwipe(false);
  };

  const handleClose = () => {
    setSelectedImage(null);
    handleCanSwipe(true);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        id="upload-button"
        accept="image/*"
        onChange={handleInputChange}
        hidden
      />
      <TransitionsModal open={!!selectedImage} handleClose={handleClose}>
        <div className={classes.contents}>
          {selectedImage && <ImageCard src={selectedImage.src} />}
        </div>
      </TransitionsModal>
    </>
  );
};

export default ImageUploadModal;
