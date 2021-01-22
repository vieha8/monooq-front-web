const FontFaceObserver = require('fontfaceobserver');

const Fonts = () => {
  const notoSansJP = new FontFaceObserver('Noto Sans Japanese');

  notoSansJP.load().then(() => {
    console.log('Font loaded')
    document.documentElement.classList.add('notoSansJP');
  });
};

export default Fonts;
