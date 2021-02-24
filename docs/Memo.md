## 検討ライブラリ
### 全体テーマ
- material-ui

### 写真ギャラリー
- react-image-gallery
- react-images
- react-photo-gallery
- react-image-masonry
- masonry-layout
https://dev.to/ziadalzarka/create-react-image-gallery-with-masonry-js-2jba

### ライトボックス/モーダル
- material-ui/core/Modal
- react-spring

### スワイプイベント
- react-swipe-card
- react-tinder-card
- react-hammer
- react-transition-group
- react-id-swiper
- swiper

### ファイル圧縮
- compressjs
https://qiita.com/ykhirao/items/33815dfe198ea332d142

## プロジェクト構成
基本的にAtomic Designを踏襲する。
ただし、基本的に画像データ＋αのコンテンツは外部APIを通して取得するため、templatesとpagesはほぼ一致する。
このことから、templatesは考えない。
- atoms: ロゴ、ラベル、ボタンなど。単体でstate管理はしない。
- molecules: ロゴボタン、Fadeボタン、写真ギャラリーなど。単体でstate管理はしない。
- organisms: ヘッダー・フッター、タブ内のコンテンツなど。state管理OK。外部通信OK。
- pages: 全体要素。state管理OK。外部通信OK。
