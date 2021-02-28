const paths = {
  root: '/',
  gallery: 'gellay',
  mypage: 'mypage',
  login: 'login',
  private: 'private',
} as const;

export default paths;

export type AppPath = typeof paths[keyof typeof paths];
