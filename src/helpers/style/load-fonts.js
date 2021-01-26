const FontFaceObserver = require('fontfaceobserver');

const Fonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap';
  link.rel = 'stylesheet';
  link.crossOrigin = 'anonymous';

  document.head.appendChild(link);

  const notoSansJP = new FontFaceObserver('Noto Sans JP');

  notoSansJP.load().then(() => {
    document.documentElement.classList.add('notoSansJP');
  });
};

export default Fonts;
