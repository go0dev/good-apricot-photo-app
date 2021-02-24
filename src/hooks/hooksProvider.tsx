import { FC } from 'react';
import { AuthHooksContext } from './auth';
import useAuth from './auth/firebase/useAuth';
import { PhotoHooksContext } from './photo';
import usePhotoActions from './photo/firebase/usePhotoActions';
import usePhotos from './photo/firebase/usePhotos';

const HooksProvider: FC = ({ children }) => (
  <AuthHooksContext.Provider value={{ useAuth }}>
    <PhotoHooksContext.Provider value={{ usePhotos, usePhotoActions }}>
      {children}
    </PhotoHooksContext.Provider>
  </AuthHooksContext.Provider>
);

export default HooksProvider;
