import { FC, lazy, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import paths from './paths';

const Home = lazy(() => import('components/pages/home'));

const AppRoutes: FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash]);

  return (
    <Routes>
      <Route path={paths.root} element={<Home />} />
      <Route path={paths.gallery} element={<div>gallery</div>} />
      <Route path={paths.mypage} element={<div>MyPage</div>} />
      <Route path="*" element={<Navigate to={paths.root} replace />} />
    </Routes>
  );
};
export default AppRoutes;
